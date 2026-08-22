# Flux

A design pattern developed at Facebook to keep data flowing in one direction (unidirectional data flow)

- Published: 2019-10-27
- Language: en
- Tags: React, Programming Notes
- Canonical: https://sirwan.info/blog/en/Flux

---

# What's Flux?

- A design pattern developed at Facebook to keep data flowing in one direction (unidirectional data flow)
- An alternative to MVC
- Provides a way to provide data that React will use to create the UI

# Definitions:

- Store: In flux, application state data in managed outside of React components in stores.
- Store holds and change data
- Stores are the only thing that can update a view in Flux
- An action provides the instructions and data required to make a change.
- Actions are dispatched using a central control component called dispatcher.
- The dispatcher is designed to queue up actions and dispatch them to the appropriate store.
- Every change requires an action.
- Action creators are functions that can be used to abstract away the nitty-gritty details required to build an action.
- Actions are object that at minimum contain a type field
- Dispatcher takes an action, packages it with some information and send it on to the appropriate store.

<img class="img-res" src="/img/flux.png">

> Structure and Data Flow
> https://facebook.github.io/flux/docs/in-depth-overview/

# Flux implementations

- Flux (https://facebook.github.io/flux/)
- Reflux (https://github.com/reflux/refluxjs)
- Flummox (http://acdlite.github.io/flummox)
- Fluxible (https://fluxible.io/)
- Redux (https://redux.js.org/)
- MobX (https://mobx.js.org/README.html)
