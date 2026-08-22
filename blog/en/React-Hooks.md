# React Hooks

Hooks are a new feature that is coming up in React v16.7.0-alpha, it's a really great feature, I am so excited about this new feature. The goal is to use all functionalities you can ...

- Published: 2018-10-27
- Language: en
- Tags: ReactJS, TypeScript, JavaScript
- Canonical: https://sirwan.info/blog/en/React-Hooks

---

Hooks are a new feature that is coming up in React v16.7.0-alpha, it's a really great feature, I am so excited about this new feature. The goal is to use all functionalities you can do in class components in functional style components, We heavily use functional components in our project so in order to use things like State we have two options: re-writing our component using class components or simply use a package called `react-powerplug`:

```typescript
import * as React from "react";
import { State } from "react-powerplug";

const Example = () => {
  return (
    <State
      initial={{
        count: 0,
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

It is great, but we don't need to have this anymore because one of the features provided by Hooks in the new version of React is ability to have state inside a functional component. Here's the same example using React Hooks:

```typescript
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

As you can see, by calling `useState` and passing a default value, it gives you two properties; one for `get` and the other for `set`. The interesting point about `useState` is that we can have multiple states inside the component:

```typescript
const [person, setPerson] = useState({
  firstName: "Sirwan",
  lastName: "Afifi",
  age: 29,
});
```

Working with state is just one of `Hooks` functionalities, I will try to blog about the other features too.

You can grab the working sample project from [GitHub](https://github.com/SirwanAfifi/react-hooks.git).

Happy coding :)
