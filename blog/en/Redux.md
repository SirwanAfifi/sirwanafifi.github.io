# Redux

Redux is a predictable state container for JavaScript apps.

- Published: 2019-11-05
- Language: en
- Tags: Redux, React, Programming Notes
- Canonical: https://sirwan.info/blog/en/Redux

---

- Redux is a predictable state container for JavaScript apps.
- The whole state of your app is stored in an object tree inside a single store.
- The only way to change the state tree is to emit an action.
- To specify how the actions transform the state tree, you write pure reducers:

```js
const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const { createStore } = Redux;
const store = createStore(counter);

const render = () => {
  document.body.innerText = store.getState();
};

store.subscribe(render);
render(); // calling once to render the initial state (0), then the subscribe will update subsequently

document.addEventListener("click", () => {
  store.dispatch({ type: "INCREMENT" });
});
```

- Redux is very useful when you start getting a complicated data scenarios or complicate change of events.
- It's really going to simplify your application:

<img class="img-res" alt="Redux is really going to simplify your application" src="/img/redux.png">

- Setting up Redux is a bit confusing but once you set it up, it's going to pay off over the lifespan of the application.
- Store is immutable, we can't mutate any value on the store, we only ever create a brand new store object:

```js
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listeners);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  return {
    getState,
    subscribe,
    dispatch,
  };
}
```

- Subscribtions have to be added before dispatching actions.

```js
// Library code
function createStore(reducer) {
  let state;
  let listeners = [];

  const getState = () => state;

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  dispatch({});

  return {
    getState,
    subscribe,
    dispatch,
  };
}

const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Reducers
const counter = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const store = createStore(counter);

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

// Action creators
function incrementAction() {
  return {
    type: INCREMENT,
  };
}
function decrementAction() {
  return {
    type: DECREMENT,
  };
}

store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(incrementAction());
store.dispatch(decrementAction());
```

- We are going to wrap entire React application with one Provider component, So when the store changes it re-render the whole application.
