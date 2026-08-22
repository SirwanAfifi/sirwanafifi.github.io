# A Dev-Only Permission Inspector Built on React Fiber

A small dev-only inspector that links each permission check back to the DOM element it gated, using React 19's internals behind one adapter.

- Published: 2026-06-26
- Language: en
- Tags: React, React Fiber, DevTools, Permissions
- Canonical: https://sirwan.info/blog/en/permission-inspector-react-fiber

---

import DemoInstrument from "../../../components/permission-inspector/DemoInstrument.tsx";
import DemoCaptureOwner from "../../../components/permission-inspector/DemoCaptureOwner.tsx";
import DemoOverlay from "../../../components/permission-inspector/DemoOverlay.tsx";
import DemoGuards from "../../../components/permission-inspector/DemoGuards.tsx";
import DemoTimeline from "../../../components/permission-inspector/DemoTimeline.tsx";
import DiagramOverview from "../../../components/permission-inspector/diagrams/DiagramOverview.astro";
import DiagramFunnel from "../../../components/permission-inspector/diagrams/DiagramFunnel.astro";
import DiagramSplit from "../../../components/permission-inspector/diagrams/DiagramSplit.astro";
import DiagramFiberDom from "../../../components/permission-inspector/diagrams/DiagramFiberDom.astro";
import DiagramBatch from "../../../components/permission-inspector/diagrams/DiagramBatch.astro";

Permission bugs are annoying because the thing that fails is usually invisible. A button never shows up. A menu item silently doesn't render. A route redirects before you can blink. Somewhere a check returned `false`, but by the time you're staring at the UI there's nothing connecting the missing element to the permission that erased it.

So this weekend I built a small dev-only tool to answer one question: which permission check produced, or erased, this bit of UI?

What I ended up with is a **Permission Inspector**. It watches every authorization decision and draws a DevTools-style box around the gated parts of the page. Hover an element, see which permissions it checked and whether each one passed. The trick that makes it work is React Fiber. This post is a quick tour of how, on React 19.

It's just an experiment, not a library. But it taught me a few things about React internals that I thought were worth writing down. The demos scattered through this post are the real thing running inline — they read React 19's actual internals in your browser, gated to a little billing dashboard so you can poke at it as we go.

<DiagramOverview />

---

## The setup

Imagine an ordinary permission store:

```ts
type Permission = "Feature.ExportReport" | "Feature.EditUser" | "Dashboard.Admin"

class PermissionStore {
  constructor(private granted: Permission[]) {}

  authorize(required: Permission[]): boolean {
    return required.every((permission) => this.granted.includes(permission))
  }
}
```

And app code like this:

```tsx
function ExportButton() {
  const canExport = permissions.authorize(["Feature.ExportReport"])
  if (!canExport) return null
  return <button>Export</button>
}
```

Easy to write, painful to inspect. The check runs during render, but the permission string never makes it onto the DOM. When the button is gone, the reason is gone with it.

My first thought was to instrument every gated component. That's the wrong move, and it's the main thing I learned: don't instrument the components, instrument the one function they all call. Every hook, `<Authorize>` wrapper, and route guard eventually goes through a single `authorize()`. Wrap that once and you've observed the whole app.

```ts
function instrumentPermissionStore(store: PermissionStore) {
  const original = store.authorize.bind(store)

  store.authorize = (required) => {
    const allowed = original(required)

    if (import.meta.env.DEV && permissionLens.enabled) {
      permissionLens.record({
        permissions: required,
        allowed,
        owner: captureOwnerFiber(), // the interesting bit
      })
    }

    return allowed
  }
}
```

One seam, hundreds of call sites covered for free. The interesting part is `captureOwnerFiber()`, and how it knows which component is asking.

<DiagramFunnel />

Here's that seam, live, wrapped around a little billing dashboard. The export button, the per-row edit buttons, and the admin nav item are all gated. Toggle a permission and the dashboard reshapes; click a gated action and watch it land in the records list — one wrapped function observing the whole screen:

<DemoInstrument client:visible />

---

## The Fiber trick

While a component renders, React keeps a pointer to the fiber it's currently working on. If you read that pointer at the exact moment `authorize()` runs, you know which component made the check, without that component knowing anything about you.

On React 19 the owner isn't a property you can just read. It hides behind the active dispatcher and you reach it through a method, and only in development. Roughly what React's own dev build does internally:

```ts
function getOwner() {
  const dispatcher = ReactSharedInternals.A
  return dispatcher === null ? null : dispatcher.getOwner()
}
```

So the access path is `internals.A.getOwner()`. `ReactSharedInternals` keeps a few of these single-letter slots, `H` for the current hooks dispatcher and `A` for the async dispatcher, and it's the `A` one that carries `getOwner`. The internals object itself is named (I'm not making this up) `__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE`. The name is basically a warning: depend on this and you can't upgrade.

This is private API, the kind you'd get fired for shipping in real product logic. For a dev-only inspector though, it's exactly the right tool.

If `authorize()` runs mid-render, `getOwner()` gives you the rendering component's fiber. If it runs from an event handler, effect, or route guard, you get `null`. That split is the whole mental model: render-time checks can be anchored to UI, everything else goes to a timeline.

<DiagramSplit />

This one runs the real thing. The widget below calls `captureOwnerFiber()` twice — once during its own render, once from a click handler — and shows you the actual return value each time. Same function, different moment, completely different answer:

<DemoCaptureOwner client:visible />

The one thing I'd insist on is putting every access to React's internals behind a single function, so those scary names live in exactly one file:

```ts
import * as React from "react"

export interface Fiber {
  tag: number
  type: unknown
  stateNode: unknown
  child: Fiber | null
  sibling: Fiber | null
  return: Fiber | null
  alternate: Fiber | null
}

// The owner is reachable only through the active dispatcher (`A`), via
// getOwner(), and only in development builds.
interface ReactInternals {
  A?: { getOwner?: () => Fiber | null } | null
}

const react = React as unknown as {
  __CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE?: ReactInternals
}

/** The fiber rendering right now, or null when called outside render. */
export function captureOwnerFiber(): Fiber | null {
  const internals = react.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE
  return internals?.A?.getOwner?.() ?? null
}
```

Everything is optional-chained, so if React renames things later the tool just returns `null` instead of throwing. A dev tool that goes quiet is annoying; a dev tool that crashes the app it's inspecting is much worse.

One nice side effect of how React 19 does this: the owner is strictly development-only. `getOwner` isn't even present in a production build, so the tool literally can't do anything there.

---

## From Fiber to DOM

A fiber isn't a DOM node, it's React's internal unit of work. To draw a box I need to resolve the captured fiber to the first real DOM element it rendered.

It's tempting to key this on a hardcoded host-component tag (`HostComponent === 5`). That number is correct today, but magic numbers like that are exactly the thing that drifts between versions. So I trust the node instead: a host component's `stateNode` *is* its DOM element, a function component's is `null`. So `stateNode instanceof HTMLElement` finds a host element without trusting any tag number.

```ts
// The one tag still worth keeping: skipping portals, which render elsewhere
// in the DOM and aren't this component's own box.
const HOST_PORTAL = 4

function findFirstHostElement(fiber: Fiber | null, depth = 0): HTMLElement | null {
  if (fiber === null || depth > 60) return null
  if (fiber.tag === HOST_PORTAL) return null

  if (fiber.stateNode instanceof HTMLElement) {
    return fiber.stateNode
  }

  for (let child = fiber.child; child !== null; child = child.sibling) {
    const found = findFirstHostElement(child, depth + 1)
    if (found !== null) return found
  }
  return null
}
```

Once you have an element, the box is just geometry, portaled into `document.body`:

```tsx
const rect = element.getBoundingClientRect()

createPortal(
  <div
    style={{
      position: "fixed",
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      border: allowed ? "2px solid #34d399" : "2px dashed #f87171",
      pointerEvents: "none",
      zIndex: 2147483000,
    }}
  />,
  document.body,
)
```

That's the whole illusion. Permission checks become boxes you can point at: solid green for granted, dashed red for denied.

<DiagramFiberDom />

And here's the payoff, on that same dashboard. Hover the export button, a row's edit button, or the admin nav item: each captured its owner fiber during render, resolved it to a DOM node, and draws the box. Flip a permission and the same region turns from a solid green box to a dashed red one:

<DemoOverlay client:visible />

---

## The bits that took it from a demo to something usable

The version above looks fine in the demos above. Actually living with it on a real app is where I hit the rough edges.

**Trust the live DOM, not the captured fiber.** A fiber captured during render can later point at an element that's been unmounted, or worse, recycled. Virtualized grids (ag-grid, TanStack Virtual) pool and re-bind cell DOM as you scroll, so a fiber you captured for one row can end up pointing at a node the grid has handed to a different row. Cheap guard first:

```ts
if (!element.isConnected) return null
```

Then the real one. React stashes the owning fiber on every DOM node it creates, under a `__reactFiber$…` key. Read it back and confirm the live node still traces up to the owner you captured. If it doesn't, refuse to draw:

```ts
function isOwnedBy(element: HTMLElement, owner: Fiber): boolean {
  let fiber: Fiber | null = null
  for (const key in element) {
    if (key.startsWith("__reactFiber$")) {
      fiber = (element as any)[key] ?? null
      break
    }
  }
  if (fiber === null) return true // non-React node: trust the descent that found it

  const alternate = owner.alternate // React double-buffers fibers
  for (let depth = 0; fiber !== null && depth < 120; depth++) {
    if (fiber === owner || fiber === alternate) return true
    fiber = fiber.return
  }
  return false
}
```

Refusing to draw is the feature here. A missing box is fine, a wrong box on a recycled cell is worse than nothing.

**Batch the layout reads into one frame.** Permission checks can fire dozens of times per interaction, and calling `getBoundingClientRect()` inside each one is a layout-thrash trap. So recording stays a cheap map write, and all the measuring collapses into a single `requestAnimationFrame`:

```ts
let scheduled = false

function scheduleResolve() {
  if (scheduled) return
  scheduled = true
  requestAnimationFrame(() => {
    scheduled = false
    resolveAllBadges()   // all the getBoundingClientRect() calls live here
    notifySubscribers()
  })
}
```

**Don't let the overlay lie.** A raw rectangle test will happily highlight an element hidden behind a modal. Before showing a hover highlight, ask the browser what's actually painted at the cursor:

```ts
function isReallyUnderPointer(element: HTMLElement, x: number, y: number): boolean {
  const top = document.elementFromPoint(x, y)
  return top === element || element.contains(top)
}
```

The overlay is `pointer-events: none`, so `elementFromPoint` looks straight through it to the real element underneath. Small detail, but it's the difference between something that feels like a hack and something that feels like DevTools.

Slide the "modal" over the button below to see it. With the guard on, the overlay refuses to draw the moment the button is covered; turn the guard off and it happily highlights something you can't even see:

<DemoGuards client:visible />

**Send the homeless checks somewhere.** Some checks have no home in the DOM:

```ts
if (!permissions.authorize(["Dashboard.Admin"])) {
  navigate("/")
}
```

That runs in routing logic. No current fiber, no element to anchor to, and it's often the exact check you're hunting. So when `owner` is `null`, I drop it into a timeline keyed on the route instead of throwing it away. A useful permission debugger explains both halves: what gated the visible UI, and what fired off-screen.

<DiagramBatch />

You can watch both halves sort themselves out on the dashboard. Its gates fire render-time checks that have an owner and get anchored as boxes; the "navigate to /admin" route guard captures `null` and drops into the timeline instead of disappearing:

<DemoTimeline client:visible />

---

## Keeping it dev-only

Hiding the UI isn't enough, the instrumentation and listeners shouldn't exist in production either. In Vite I gate both the mount and the instrumentation behind `import.meta.env.DEV`:

```tsx
function App() {
  return (
    <>
      <Routes />
      {import.meta.env.DEV && <PermissionInspector />}
    </>
  )
}
```

```ts
if (import.meta.env.DEV) {
  instrumentPermissionStore(permissions)
}
```

Because the owner-tracking internals aren't in a production React build, the dangerous part can't run there anyway. But I still keep an early return as a second guard and never attach a debug handle to `window` outside the dev check.

---

## One supported alternative

React 19 ships `captureOwnerStack()`, which is a real, documented dev API (imported from `react`). It returns the current owner stack as a string in development and `null` in production. It won't hand you a fiber to draw a box with, but it's a fully supported way to get "who rendered this" context for the off-render timeline, no internals required.

Import it so it never breaks a production bundle:

```ts
import * as React from "react"

if (import.meta.env.DEV) {
  const ownerStack = React.captureOwnerStack() // string | null
}
```

So: reach for `captureOwnerStack()` when a string is enough, reach for the fiber only when you actually need the geometry.

---

## Wrapping up

The thing that clicked for me is that in a React app a permission check is rarely just an authorization decision, it's usually a render decision too. Once you look at it that way the rest follows: wrap the one shared `authorize()`, read the rendering owner from React's internals behind a single adapter, resolve it to a DOM element by its `stateNode` instead of a magic tag, check the element still belongs to that owner before drawing, batch the layout into one frame, and send the off-render checks to a timeline.

I'd never build product logic on Fiber. But for a dev tool, hidden behind a small adapter and gated to development, it gives you context React deliberately hides and turns a vague "why is this missing?" into something you can read off the screen: this box was rendered by `ExportButton`, it checked `Feature.ExportReport`, and it was denied.

Keep all the scary names in one file and the next time React moves things around it's a five-line patch instead of a mystery.
