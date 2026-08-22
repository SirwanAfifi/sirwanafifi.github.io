# WebSocket and React

WebSocket is a communication protocol. It's bidirectional in nature which means that either client or server can send data at any time. With WebSocket, we can build applications such as multiplayer games, ...

- Published: 2020-03-08
- Language: en
- Tags: React, Realtime, SignalR, ASP.NET Core, Node.js
- Canonical: https://sirwan.info/blog/en/WebSocket-and-React

---

WebSocket is a communication protocol. It's bidirectional in nature which means that either client or server can send data at any time. With WebSocket, we can build applications such as multiplayer games, chat apps, collaboration software that work on the open web. In this blog, I going to show you how to create a WebSocket server both in .NET Core and Node.js. I'll start with the Node.js version as it's a bit easier (boilerplate code for it is just 13 lines of code).

## WebSocket Server (Node.js)

To create a WebSocket server in Node.js we need to install a third-party package called `socket.io` which is pretty popular. So follow these steps to create the server:

```
mkdir -p websocket/node && cd "$_"
yarn init -y
yarn add express socket.io
touch index.js
```

Now open `index.js` and add the following code:

```js
const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });
});

http.listen(8080, () => {
  console.log("listening on *:8080");
});
```

As you can see we have initialized a new instance of `socket.io` using `http`. Then we added an event listener for the `connection` event. This keeps listening to any incoming WebSocket connection so whenever a new WebSocket connection is established from the client, the callback is invoked. Inside the callback again we keep listening to the incoming request from the newly created connection, If the client emits an event called `message` we broadcast the data to other subscribers. That's it, the backend part is done. Now let's create a frontend for it.

## WebSocket Client

I don't want to explain the process of creating a React app as it's pretty easy to scaffold a React application using `create-react-app`. So let's assume that we have an existing application and want to add chat functionality to it. First, make sure you have installed `socket.io-client` package. I should also mention that I'm going to use Bootstrap for stylying the components. What we are going to build is this widget:

<img class="img-res" src="/img/chat.png" alt="Chat" />

To create such component I'll break it down into two separate components, one for each single message and the other for the chat widget. So let's go ahead and create them:

### Message component

```js
import React from "react";
import user from "../Assets/user.png";
export default ({ userName, message }) => {
  return (
    <>
      <div className="media">
        <img
          className="rounded-circle align-self-start mr-3"
          src={user}
          alt="Avatar"
        />
        <div className="media-body">
          <h5 className="mt-0">{userName}</h5>
          <p>{message}</p>
        </div>
      </div>
      <div className="dropdown-divider"></div>
    </>
  );
};
```

### Chat component

```js
import React, { useState, useEffect } from "react";
import "./Chat.css";
import Message from "./Message";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:8080");

export default () => {
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const uName = prompt("Name?");
    if (uName) {
      setUserName(uName);
    }
  }, []);

  socket.on("message", (message) => {
    setMessages([...messages, message]);
  });

  return (
    <div className="wrapper">
      <div className="card border-primary">
        <h5 className="card-header bg-primary text-white">
          <i className="fas fa-comment"></i> Chat
        </h5>
        <div className="card-body overflow-auto">
          {messages.map((msg, index) => (
            <Message
              key={index}
              userName={msg.userName}
              message={msg.message}
            />
          ))}
        </div>
        <div className="card-footer border-primary p-0">
          <div className="input-group">
            <input
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="text"
              className="form-control input-sm"
              placeholder="Type your message here..."
            />
            <button
              className="btn btn-primary btn-sm"
              onClick={(_) => {
                const msg = {
                  id: Math.random() * 10,
                  message,
                  userName: userName,
                };
                setMessages([...messages, msg]);
                setMessage("");

                socket.emit("message", msg);
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
```

As you can see we first imported `socket.io`. Then there are three parts to make it work. The first part is to connect to our WebSocket server:

```js
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:8080");
```

The second part is to listen to incoming messages from the backend. As soon as there is a new message we save it into our local state:

```js
socket.on("message", (message) => {
  setMessages([...messages, message]);
});
```

The third part is when we click on `Send` button which is simply emitting a new message to the WebSocket server:

```js
socket.emit("message", msg);
```

That's it. We just built a simple chat application in just a few minutes. Now let's create the same functionality using .NET Core.

## WebSocket Server (.NET Core)

To create a WebSocket server in .NET Core we should use SignalR as it's incredibly simple yet powerful library to create real-time web applications. So let's type in the following commands to create a project:

```
mkdir -p websocket/dotnet && cd "$_"
dotnet new web
```

Next we need something called `Hub` which is a class for listening and emitting data to subscribers. So let's create a Hub called `ChatHub`:

```csharp
public class ChatHub : Hub
{
    public async Task Message(MessageModel message)
    {
        await Clients.Others.SendAsync("message", message);
    }
}

public class MessageModel
{
    public string UserName { get; set; }
    public string Message { get; set; }
}
```

Then we will need to configure the server to respond to WebSocket requests. So let's change `Startup.cs` as the following:

```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
        {
            builder
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithOrigins("http://localhost:3000");
        }));
        services.AddSignalR();
    }
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        app.UseCors("CorsPolicy");


        app.UseRouting();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapHub<ChatHub>("/chatHub", options =>
            {
                options.Transports = HttpTransportType.WebSockets;
            });
        });
    }
}
```

It worth mentioning that SignalR includes some built-in transports to keep the underlying connection open. It means that it automatically chooses the most efficient transport type during an initial stage called negotiation. In the code, we have purposely set `WebSockets` transport by passing in a second argument to `MapHub` method. This is because the main focus of this blog post. But you can set other supported transports if you want to, If you don't explicitly set the transports, SignalR will use the most efficient type for you as mentioned. That's it. The server is now ready to communicate with the client. Unfortunately, the client part needs a couple of changes as the `socket.io-client` package doesn't support SignalR for its server as they are different in implementation. It means that we need to change the client code and the way it communicates with the server. First, we need to install an official Microsoft package:

```
yarn add @microsoft/signalr
```

Since the component structure is almost the same with one we had in `socket.io-client` so I'll just add the differences. First we need to import the SignalR package:

```js
import {
  HubConnectionBuilder,
  LogLevel,
  HttpTransportType,
} from "@microsoft/signalr";
```

Then we need to have a way to initialize and open the connection. We could do that by defining a `useEffect` hook:

```js
const [connection, setConnection] = useState();

useEffect(
  configSocket();
  // as before
}, []);

const configSocket = async () => {
  const socketConnection = new HubConnectionBuilder()
    .configureLogging(LogLevel.Debug)
    .withUrl("http://localhost:5000/chatHub", {
      skipNegotiation: true,
      transport: HttpTransportType.WebSockets,
    })
    .build();
  await socketConnection.start();
  setConnection(socketConnection);
}
```

We only want to initialize `connection` when the component mounts that's why we provided an empty array as a second argument for the effect hook. Next we need to listen to any incoming message:

```js
connection &&
  connection.on("message", (message) => {
    setMessages([...messages, message]);
  });
```

As the final step we need a way to emit the messages when a user clicks on `Send` button:

```js
<button
  className="btn btn-primary btn-sm"
  onClick={(_) => {
    // as before

    connection && connection.invoke("message", msg);
  }}
>
  Send
</button>
```

That's all we need to do to configure SignalR into our React application. Now you can run the project and see the result:

<img class="img-res" src="/img/chat-demo.gif" alt="Chat" />

<br/>

**Note**: If you want to host the SignalR server on IIS you will have to enable WebSocket on IIS because it's not enabled by default. You can follow [this process](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/websockets?view=aspnetcore-3.1#iisiis-express-support) to enable it:

<img class="img-res" src="/img/IIS_WebSocket.png" alt="Enabling WebSockets on IIS" />

<br/>

Source code (https://github.com/SirwanAfifi/realtime)
