---
layout: post
title: React Hooks
tags: ReactJS TypeScript JavaScript
---

Hooks are a new feature that is coming up in React v16.7.0-alpha, it's a really great feature, I am so excited about this new feature. The goal is to use all functionalities you can do in class components in functional style components, We heavily use functional components in our project so in order to use things like State we have two options: re-writing our component in a class component or simply use a great package called `react-powerplug`:

```ts
import * as React from "react";
import { State } from "react-powerplug";

const Example = () => {
  return (
    <State
      initial={{
        count: 0
      }}
    >
      {({ state, setState }) => (
        <div>
          <p>You clicked {state.count} times</p>
          <button onClick={() => setState({ count: state.count + 1 })}>
            Click me
          </button>
        </div>
      )}
    </State>
  );
};

export { Example };
```

This is really great, but we don't need to have this anymore because one of the feature of Hooks in the new version of React is using state inside a functional component, so we'd some something like this to get the same result:

```ts
import { useState } from "react";
import * as React from "react";

export interface ReactHookProps {}

const ReactHook = (props: ReactHookProps) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Hello From ReactHook Component</h1>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

export { ReactHook };
```

As you can see, by calling `useState` and passing a default value, it gives you two property one for `get` and the other for `set`. The interesting point about `useState` is that we can have multiple states inside the component:

```ts
const [person, setPerson] = useState({
  firstName: "Sirwan",
  lastName: "Afifi",
  age: 29
});
```

Working with state is just one of `Hooks` functionalities, I will try to blog about the other features too.

You can grab the working sample project from [GitHub](https://github.com/SirwanAfifi/react-hooks.git).

Happy coding :)
