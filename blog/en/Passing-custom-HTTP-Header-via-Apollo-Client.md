# Passing custom HTTP Header via Apollo Client

Today I wanted to send along an array as a parameter with all queries from client to server. But I wanted to find a quick way to accomplish the task as changing all queries took a tremendous amount of time. One thing that came to my mind was making use of ...

- Published: 2019-11-06
- Language: en
- Tags: React, Apollo Client, C#, Programming Notes
- Canonical: https://sirwan.info/blog/en/Passing-custom-HTTP-Header-via-Apollo-Client

---

Today I wanted to send along an array as a parameter with all queries from client to server. But I wanted to find a quick way to accomplish the task as changing all queries took a tremendous amount of time. One thing that came to my mind was making use of Apollo Client by adding a custom header every time a request is sent to the server. `Apollo Link` is a state management library for our client-side dashboard. It comes with something called `Link` which is more like the concept of middleware but in a much more flexible and elegant way. The cool thing about this feature is that they are chainable so that we can snap together and define the functionality to handle GraphQL requests by the client. So when we issue a GraphQL request, every single link is applied one after another. So it's the best place to add the custom header:

```js
const addOrigin = setContext(async (_, { headers }) => {
  const IDs = await localStorage.getItem("IDs");
  return {
    headers: {
      ...headers,
      customHeaderName: IDs,
    },
  };
});

const links = [, /* other links */ addOrigin, httpLink];

export const client = new ApolloClient({
  cache,
  link: ApolloLink.from(links),
});
```

On the backend we are using `graphql-dotnet` so all I had to do was to define a class and populate the header:

```csharp
services.AddGraphQL()
    .AddUserContextBuilder(context => new GraphQLUserContext { User = context.User, Headers = context.Request.Headers})
    .AddGraphTypes(ServiceLifetime.Scoped);

public class GraphQLUserContext
{
    public IHeaderDictionary Headers { get; set; }
}
```

The code captures the headers and then make it available in resolve methods:

```csharp
public class MyGraphType : ObjectGraphType
{
    public MyGraphType(MyService myService)
    {
        Field<ListGraphType<MyType>>(
            "items",
            resolve: context =>
            {
                var headers = (context.UserContext as dynamic).Headers as IHeaderDictionary;
                var ids = headers?["customHeaderName"];
                if (string.IsNullOrEmpty(ids)) return myService.GetAllAsync();
                var ids = (ids.Value).ToString().Split(", ").Select(long.Parse);
                return myService.GetAllAsync(ids);
            });
    }
}

```
