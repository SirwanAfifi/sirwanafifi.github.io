# MobX with React and TypeScript

MobX is one of the popular state management libraries. One of the great things about MobX is that we can store state in a simple data structure and allow the library to take care of keeping everything up to date.

- Published: 2020-01-05
- Language: en
- Tags: React, State Management, MobX
- Canonical: https://sirwan.info/blog/en/MobX-with-React-and-TypeScript

---

MobX is one of the popular state management libraries. One of the great things about MobX is that we can store state in a simple data structure and allow the library to take care of keeping everything up to date. The MobX API is pretty simple; in fact, it has these four simple building blocks at its core:

- Observable
- Actions
- Computed
- Reactions

## Observable

The idea is that when the data changes, the observable object notifies the observers. To define a property as observable, all we need to do is to use `@observable` decorator:

```js
class TodoStore {
  @observable todos: Todo[];
}
```

Now When a new value is assigned to `todos` array, the notifications will fire, and all the associated observers will be notified.

## Actions

Action is a way to change an observable (update the state). To define an action, we decorate methods inside the store with `@action`:

```js
@action toggleTodo = (id: string) => {
    this.todos = this.todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });
};
```

## Computed

Computed can be used to derive values from the existing state or other computed values:

```js
@computed get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter(todo => todo.completed).length,
      notCompleted: this.todos.filter(todo => !todo.completed).length
    };
}
```

## Reactions

Reactions track observables from inside the store itself. In the example below if the action to set `todos` is called, then it runs the second argument.

```
class TodoStore {
  constructor() {
    reaction(
      () => this.todos,
      _ => console.log(this.todos.length)
    );
  }
```

# Creating a Simple Todo App with MobX and React

Now that we have talked about the main concepts, let's create a simple todo app using React, MobX and TypeScript:

<img class="img-res" src="/img/mobx-project.png" alt="MobX project" />

So go to the terminal, create a directory then CD into it then type in this command to scaffold a new React project:

```js
npx create-react-app . --typescript
```

For this project, I am using Bootstrap so let's add it as a dependency to the newly created project:

```js
yarn add bootstrap --save
```

Now go to `index.tsx` and import `bootstrap.css`:

```js
import "bootstrap/dist/css/bootstrap.css";
```

Now we'll install the needed dependencies:

```js
yarn add mobx mobx-react-lite uuid @types/uuid --save
```

The next thing we have to do is to set `experimentalDecorators` flag to true in `tsconfig.json` in order for the MobX decorators to compile properly:

```json
{
  "compilerOptions": {
    // other stuff...

    "experimentalDecorators": true
  }
}
```

After all the above stuff is done, we have MobX ready to go. Now let's create a store inside the project `src/stores/TodoStore.ts`. Add the following code to it:

```js
import { observable, action, computed, reaction } from "mobx";
import { createContext } from "react";
import uuidv4 from "uuid/v4";

export interface Todo {
  id?: string;
  title: string;
  completed: boolean;
}

class TodoStore {
  constructor() {
    reaction(
      () => this.todos,
      (_) => console.log(this.todos.length)
    );
  }

  @observable todos: Todo[] = [
    { id: uuidv4(), title: "Item #1", completed: false },
    { id: uuidv4(), title: "Item #2", completed: false },
    { id: uuidv4(), title: "Item #3", completed: false },
    { id: uuidv4(), title: "Item #4", completed: false },
    { id: uuidv4(), title: "Item #5", completed: true },
    { id: uuidv4(), title: "Item #6", completed: false },
  ];

  @action addTodo = (todo: Todo) => {
    this.todos.push({ ...todo, id: uuidv4() });
  };

  @action toggleTodo = (id: string) => {
    this.todos = this.todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }
      return todo;
    });
  };

  @action removeTodo = (id: string) => {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  };

  @computed get info() {
    return {
      total: this.todos.length,
      completed: this.todos.filter((todo) => todo.completed).length,
      notCompleted: this.todos.filter((todo) => !todo.completed).length,
    };
  }
}

export default createContext(new TodoStore());
```

Now create a new folder called components in the `src` directory and add `TodoAdd.tsx` and `TodoList.tsx`.

### TodoAdd

```js
import React, { useContext, useState } from "react";
import TodoStore from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const todoStore = useContext(TodoStore);
  const { addTodo, info } = todoStore;

  return (
    <>
      <div className="alert alert-primary">
        <div className="d-inline col-4">
          Total items: &nbsp;
          <span className="badge badge-info">{info.total}</span>
        </div>
        <div className="d-inline col-4">
          Finished items: &nbsp;
          <span className="badge badge-info">{info.completed}</span>
        </div>
        <div className="d-inline col-4">
          Unfinished items: &nbsp;
          <span className="badge badge-info">{info.notCompleted}</span>
        </div>
      </div>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          value={title}
          placeholder="Todo title..."
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button
          className="btn btn-primary"
          onClick={(_) => {
            addTodo({
              title: title,
              completed: false,
            });
            setTitle("");
          }}
        >
          Add Todo
        </button>
      </div>
    </>
  );
};

export default observer(AddTodo);
```

### TodoList

```js
import React, { useContext } from "react";
import TodoStore from "../stores/TodoStore";
import { observer } from "mobx-react-lite";

const TodoList = () => {
  const todoStore = useContext(TodoStore);
  const { todos, toggleTodo, removeTodo } = todoStore;
  return (
    <>
      <div className="row">
        <table className="table table-hover">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Completed?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.completed ? "✅" : ""}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info"
                    onClick={_ => toggleTodo(todo.id!)}
                  >
                    Toggle
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={_ => removeTodo(todo.id!)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default observer(TodoList);

```

Both components use `observer` which is an [HOC](https://sirwan.info/archive/2019/09/22/Higher-Order-Components/) to make the components observers of our store. So any changes to any of the observable will cause the React components to re-render.

That’s it 🚀 You’re now up and going with MobX in your React application.

[Here](https://github.com/SirwanAfifi/mobxwithts)'s the source for the project.
