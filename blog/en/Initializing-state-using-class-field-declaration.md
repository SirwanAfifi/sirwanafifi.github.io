# Initializing state using class field declaration

If you want to initialize state in a class based component we have two options: In constructor As a class property

- Published: 2019-10-29
- Language: en
- Tags: React
- Canonical: https://sirwan.info/blog/en/Initializing-state-using-class-field-declaration

---

If you want to initialize state in a class based component we have two options:

- In constructor
- As a class property

For class based components I used to initialize state in the constructor:

```js
import React, { Component } from "react";

export class SampleComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: this.getRandomInt(5), name: "Item 1" },
        { id: this.getRandomInt(5), name: "Item 2" },
      ],
    };
  }

  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  render() {
    return (
      <ul>
                        
        {this.state.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.id}
          </li>
        ))}
                    
      </ul>
    );
  }
}
```

This approach is fine, but you will have to make sure you call `super(props)`. Sometimes we might forget to call `super(props)` in the constructor; in this case, the parent's constructor won't be executed, which will cause the following error:

> ReferenceError: Must call the `super(props)` constructor in derived class before accessing 'this' or returning from derived constructor

It's where using class field declaration comes in handy. It saves us a few keystrokes, so you don't need to worry about calling `super(props)` anymore. So the previous example can be written as:

```js
import React, { Component } from "react";

export class SampleComponent extends Component {
  getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  };

  state = {
    items: [
      { id: this.getRandomInt(5), name: "Item 1" },
      { id: this.getRandomInt(5), name: "Item 2" },
    ],
  };

  render() {
    return (
      <ul>
                        
        {this.state.items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.id}
          </li>
        ))}
                    
      </ul>
    );
  }
}
```

The key point to remember here is that if you are going to call a method inside the `state` (`getRandomInt` in our case), you must declare your methods before declaring the state otherwise you will get the following error:

> TypeError: this.getRandomInt is not a function

If you are using TypeScript then it has got your back and immediately yelling at you:

<img class="img-res" src="/img/typescript_state.png">
