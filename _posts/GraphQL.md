---
layout: post
title: GraphQL
tags: GraphQL API
---

Recently I have been working on a node stack project as a full stack JavaScript developer, it's a really great experience because I'm working with talented developers. We use TypeScript on both backend and frontend which is really great because I'm coming from a .NET background and couldn’t be happier; Well we have type for our JS code :) On the backend we use GraphQL for our API, so in this post, I am going to explain my observation about this technology.

### What's GraphQL?

<img class="center-image" src="/public/img/graphqL.jpg" alt="GraphQL" width="700">

GraphQL is a query language for any kind of API and is able to fulfill any queries across multiple databases. The main benefit of using it is that you can ask for exactly what you want and you will get the result and nothing else. In this case, clients describe what they want their data and shape of it. The good point is that requests are validated against so-called `Schema`, we create this schema on our server, it basically describes the functionality available to our clients, inside this schema, we define our type definitions:

```js
type User {
    id: ID!
    firstName: String
    lastName: String
    age: Int
}

type Query {
    users: [User]
}
```

In the schema, we need a top-level type called `Query`. It describes which queries can be sent by the client. So, in this case, we're saying we need to return a list of users, the result is an array of type User.

### Resolvers

Now we need something called `Resolver` to figure out what we get back when we call `users` query. Resolvers are basically some functions that respond to queries and mutations, they are the functions that give us result of a query.

```js
const root = {
  users: () => {
    return [
      { id: 1, firstName: "Sirwan", lastName: "Afifi", age: 29 },
      { id: 2, firstName: "User 2", lastName: "lastName2", age: 20 },
      { id: 3, firstName: "User 3", lastName: "lastName3", age: 20 },
      { id: 4, firstName: "User 4", lastName: "lastName4", age: 20 },
      { id: 5, firstName: "User 5", lastName: "lastName5", age: 20 },
      { id: 6, firstName: "User 6", lastName: "lastName6", age: 20 },
      { id: 7, firstName: "User 7", lastName: "lastName7", age: 20 },
      { id: 8, firstName: "User 8", lastName: "lastName8", age: 20 }
    ];
  }
};
```

Now we can query the `users` to get the result:

<img class="center-image" src="/public/img/graphiQL.png" alt="GraphiQL" width="700">

GraphQL is more like TypeScript for our API, by using it we have awesome static type analyze. In traditional REST we had many requests but with GraphQL we only have one single endpoint.

### Mutation types

The query type is responsible for defining what will return when we call the query. With mutation type, we can mutate (change, create) data.

```js
input UserInput {
    id: ID!
    firstName: String
    lastName: String
    age: Int
}

type Mutation {
    createUser(input: UserInput): User
}
```

The great point about a mutation is that we mutate something and we also ask for something in the result, that's why we can specify a return type for a mutation, in this case, it's `User`:

<img class="center-image" src="/public/img/graphQL-mutation.png" alt="GraphiQL" width="700">
