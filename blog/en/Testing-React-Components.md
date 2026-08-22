# Testing React Components

Testing React components is a crucial part of the development process. It helps us to make sure that our components are working as expected.

- Published: 2019-10-02
- Language: en
- Tags: React
- Canonical: https://sirwan.info/blog/en/Testing-React-Components

---

`create-react-app` comes with a built-in test runner called `Jest` which is basically a tool for executing unite tests and also reporting the result. To run the test files in projects, all we need to do is type in `npm run test` command. This command searches for all test files in the project and executes them one after another. Once the tests have been run, it enters into watch mode, which means that whenever we change the test files in goes and re-run them.

There are two approaches that we can use for testing a component:

- Shallow rendering
- Full rendering

# Shallow rendering

Shallow rendering allows us to render a component without rendering its children. It means that it isolates the component from its children. This type of rendering makes more sense when testing a component's functionality. For example, let's say we have a blog application and want to check if the `App` component contains a header:

```js
import React from "react";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow } from "enzyme";
import App from "./App";
import { Header } from "./components/Header";

Enzyme.configure({ adapter: new Adapter() });

it("renders app component", () => {
  const wrapper = shallow(<App />);
  const header = <Header />;
  expect(wrapper.contains(header)).toEqual(true);
});
```

Since the test is using shallow rendering, the child components are not used to render it means that only the `App` component's state and props are used for when rendering the content and its children are not rendered:

```js
<Fragment>
  <div className="columns">
    <div className="column">
      <Header />
    </div>
  </div>
  <div className="container">
    <div className="columns">
      <div className="column is-8">
        <List />
      </div>
      <div className="column is-4">
        <AuthorList />
      </div>
    </div>
  </div>
</Fragment>
```

# Full rendering

Full rendering means that the `App` component children are fully rendered:

```js
it("renders app component", () => {
  const wrapper = mount(<App />);
  const header = <Header />;
  expect(wrapper.contains(header)).toEqual(true);
});
```

Which produeces the following output.

```html
<App>
  <div className="columns">
    <div className="column">
      <header>
        <nav className="navbar is-primary">
          <div className="navbar-brand">
            <a className="navbar-item" href="https://myblog.com">
              <h1>My Blog</h1>
            </a>
            <div className="navbar-burger burger">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <a className="navbar-item" href="/home"> Home </a>
              <a className="navbar-item" href="/posts"> Posts </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  </div>
  <div className="container">
    <div className="columns">
      <div className="column is-8">
        <List>
          <h1 className="title">Latest posts</h1>
          <div className="box">
            <ActionButton text="Sort" callback="{[Function]}">
              <button className="button is-primary" onClick="{[Function]}">
                Sort
              </button>
            </ActionButton>
          </div>
          <div id="boxDiv" className="box">
            <Post post="{{...}}">
              <div className="panel">
                <p className="panel-heading">Post1</p>
                <section className="panel-block">
                  <p>Hello</p>
                </section>
              </div>
            </Post>
            <Post post="{{...}}">
              <div className="panel">
                <p className="panel-heading">Post2</p>
                <section className="panel-block">
                  <p>Hello</p>
                </section>
              </div>
            </Post>
            <Post post="{{...}}">
              <div className="panel">
                <p className="panel-heading">Post3</p>
                <section className="panel-block">
                  <p>Hello</p>
                </section>
              </div>
            </Post>
            <Post post="{{...}}">
              <div className="panel">
                <p className="panel-heading">Post4</p>
                <section className="panel-block">
                  <p>Hello</p>
                </section>
              </div>
            </Post>
          </div>
        </List>
      </div>
      <div className="column is-4">
        <AuthorList>
          <h1 className="title">Authors</h1>
          <ul className="list">
            <a href="/" className="list-item"> Sirwan Afifi </a>
          </ul>
        </AuthorList>
      </div>
    </div>
  </div>
</App>
```
