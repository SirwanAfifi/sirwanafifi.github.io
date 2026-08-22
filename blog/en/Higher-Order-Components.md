# Higher-Order Components

Higher-Order Components are a great way to share common functionality between components without repeating code.

- Published: 2019-09-22
- Language: en
- Tags: React
- Canonical: https://sirwan.info/blog/en/Higher-Order-Components

---

Before we get started, we need to understand what a higher-order function is. In JavaScript functions are first-class citizens because they are treated like any other variables:

- They can be created using literals:

```js
function myFunction() {
  // function body
}
```

- They can be assigned to other types:

```js
var myFunction = function () {
  // function body
};
myArray.push(function () {
  // function body
});
myObj.data = function () {
  // function body
};
```

- A function can be passed to another function as an argument:

```js
function invoke(myFunction) {
  myFunction();
}

invoke(function () {
  // function body
});
```

- A function can return another function:

```js
function myFunction() {
  return function () {
    // function body, inside this scope we can also have access to outter scope
  };
}
```

- We can add new properties to a function:

```js
var myFunction = function () {
  // function body
};
myFunction.name = "Function name";
```

## Higher-Order Component(Function)

Now talking about Higher-Order function makes more sense. A higher-order function is basically a function that can take another function as an argument, or returns a function as a result. In React it's pretty much the same concept; It takes a component as an argument and returns a component:

```js
function MyComponent(Component) {
  return class extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}
```

It's great becuase we can wrap a component with another component; this means that we can add extra functionalities to a component so it can be usfuel to share common functionality between components without repeating code. They are often used for `cross-cutting` concerns. An example of it could be private routes inside a React application:

```js
import React from "react";
import { Route, Redirect } from "react-router-dom";
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isUserAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);
```

Here, the `PrivateRoute` is itself a function that is used to enhance another component. The way it enhance is to wrap the incoming component with `Route` component.
