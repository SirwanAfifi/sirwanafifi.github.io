# Server-Sent Events and React

Server Sents Events are realtime events sent from the server to the client. It's a way to subscribe to a data stream sent by a server. Basically, it is a long-running HTTP connection with a particular mime type.

- Published: 2019-12-15
- Language: en
- Tags: React, Realtime, ASP.NET Core, Node.js
- Canonical: https://sirwan.info/blog/en/%20Server-Sent-Events-and-React

---

Server Sents Events are realtime events sent from the server to the client. It's a way to subscribe to a data stream sent by a server. Basically, it is a long-running HTTP connection with a particular mime type. Contrary to WebSocket, Server-Sent Events are unidirectional which clients subscribe to a channel and get data from the server. Updates for the data are pushed to the client in realtime as they occur, so the client doesn't need to initiate any requests. When using SSE, we should consider these:

- Requests can be redirected HTTP 301(permanent) &
  307(temporary)
- Only UTF-8 decoding is supported, no binary data
- Protocol supports multiple type of events, default is message
- Clients always reconnect (no need to handle)
- Server sends HTTP 204 No Content to stop reconnection
- Limited amount of global connections per site

## Server Implementation:

Implementing it on the server is pretty easy. All we need to do is running an endless loop. Inside the loop, we should set the somespecial HTTP headers and push the data to the response every 2 seconds:

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
        ILogger<Startup> loggerDebug, Datasource datasource)
{
    app.UseCors("MyPolicy");

    app.UseRouting();
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapGet("/stream", async context =>
        {
            var response = context.Response;
            response.Headers.Add("connection", "keep-alive");
            response.Headers.Add("cach-control", "no-cache");
            response.Headers.Add("content-type", "text/event-stream");

            while (true)
            {
                await response.Body
                    .WriteAsync(Encoding.UTF8.GetBytes($"data: {JsonSerializer.Serialize(datasource.GetData())}\n\n"));

                await response.Body.FlushAsync();
                await Task.Delay(2 * 1000);
            }

        });
    });
}
```

Here's also a Node.js version of the server:

```js
app.get("/stream", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",

    // enabling CORS
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept",
  });

  setInterval(() => {
    res.write(`data: ${JSON.stringify(getData())}\n\n`);
  }, 2000);
});
```

As you can see, we are sending the data in a specific format:

```
data: My message\n\n
```

## Frontend Implementation

Implementing it on the client is fairly easy. All we need to do is making use of `EventSource` API, which is a standard interface to interact with the Server-Sent Events protocol. It basically opens a persistent connection to our HTTP server. The cool thing about the API is that it keeps the connection open until we call `EventSource.close()`:

```ts
import React from "react";

const ProductList = () => {
  const [data, setData] = React.useState([] as any);

  const formatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "gbp",
  });

  React.useEffect(() => {
    let eventSource = new EventSource("http://localhost:5000/stream");
    eventSource.onmessage = (e) => updateProdutList(JSON.parse(e.data));
  }, []);

  const updateProdutList = (product: any) => {
    setData([...product]);
  };

  return (
    <table className="table table-hover">
      <thead className="thead-dark">
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map((p: any) => (
          <tr key={p.Id}>
            <td>{p.Id}</td>
            <td>{p.Title}</td>
            <td>{formatter.format(p.Price)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ProductList };
```

Here we have passed in the SSE endpoint URL to the `EventSource` constructor. It then goes and establishes the communication channel between the React app and the server. Then we added `onmessage` event handler which is called when new data is received. `updateProdutList` is responsible for updating the state so once the data is received we update the state with the latest data. The process of subscribing to the endpoint happens once the `ProductList` component is mounted; that's why we used `useEffect` inside the component.

Now we can test the application:

<img class="img-res" src="/img/realtime.gif" alt="Realtime communication" />
