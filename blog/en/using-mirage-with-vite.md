# Using Mirage With Vite

Recently, I have been using Vite and liked it quite a bit. It's an extremely fast build tool, If you haven't checked it out, you should definitely do so. Although it was developed by Evan You, it can be used for React, Svelte, and more...

- Published: 2021-07-25
- Language: en
- Tags: React, Mirage, Vite
- Canonical: https://sirwan.info/blog/en/using-mirage-with-vite

---

Recently, I have been using Vite and liked it quite a bit. It's an extremely fast build tool, If you haven't checked it out, you should definitely do so. Although it was developed by Evan You, it can be used for React, Svelte, and more:

- `vanilla`
- `vanilla-ts`
- `vue`
- `vue-ts`
- `react`
- `react-ts`
- `preact`
- `preact-ts`
- `lit-element`
- `lit-element-ts`
- `svelte`
- `svelte-ts`

Another excellent tool that I'm going to talk about in this post is Mirage, which is designed to mock APIs. I wanted to use both of these tools in one of my projects. My previous experience with Mirage was with CRA. But as it was the first time I tried using it in Vite, I decided to give it a go.

With the following steps, you can scaffold a React app quickly:

- `yarn create vite`:

```js
✔ Project name: > mirage_vite
✔ Select a framework: › react
✔ Select a variant: › react-ts
```

- `cd mirage_vite`
- `yarn add @types/node`
- `yarn`
- `yarn dev`

 <img src="/img/hello_vite.png" alt="Hello Vite" />

The next step is to install Mirage:

- `yarn add miragejs -D`

Once it is installed, you will need to make the following modifications to your `main.tsx` file:

```ts
// React imports...
import { createServer } from "miragejs"; // highlight-line
import { getTodos } from "./api/todos";

// highlight-start
const environment = process.env.NODE_ENV;
if (environment !== "production") {
  createServer({
    routes() {
      this.get("/api/todos", () => ({
        todos: [
          {
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            completed: false,
          },
        ],
      }));
    },
  });
}
// highlight-end

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

With the fake API now ready, you can use it in your components:

```tsx
import React, { useEffect, useState } from "react";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((dt) => setTodos(dt.todos));
  }, []);

  return (
    <div className="App">
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```
