# Redis RESP

RESP (REdis Serialization Protocol) is a binary protocol that Redis uses to communicate with clients. It is a simple protocol that is easy to implement in any programming language. This means that we can communicate with Redis over a socket connection. For instance, here is a naive implementation in C# that sends a command to Redis and reads the response:

- Published: 2024-04-17
- Language: en
- Tags: Redis, RESP
- Canonical: https://sirwan.info/blog/en/redis-resp

---

[RESP](https://github.com/antirez/RESP3/blob/master/spec.md) (REdis Serialization Protocol) is a binary protocol that Redis uses to communicate with clients. It is a simple protocol that is easy to implement in any programming language. This means that we can communicate with Redis over a socket connection. For instance, here is a naive implementation in C# that sends a command to Redis and reads the response:

```csharp
public class RESPClient(string host, int port)
{
    private string Host { get; } = host;
    private int Port { get; } = port;
    public string Send(string command)
    {
        using var client = new TcpClient(Host, Port);
        var stream = client.GetStream();
        var data = Encoding.UTF8.GetBytes(command + "\r\n");
        stream.Write(data, 0, data.Length);
        var buffer = new byte[1024];
        var response = new StringBuilder();
        var bytesRead = stream.Read(buffer, 0, buffer.Length);
        response.Append(Encoding.UTF8.GetString(buffer, 0, bytesRead));
        return response.ToString();
    }
}
```

There are lots of edge cases to consider, which is why there are libraries like [StackExchange.Redis](https://github.com/StackExchange/StackExchange.Redis) that handle all the complexities for you. However, it's good to know how things work under the hood. This is especially relevant because Redis has recently announced a new policy involving two types of licenses, and people are unhappy about it and trying to find alternatives. When choosing an alternative, it's really important to pick one that is [RESP compatible](https://github.dev/StackExchange/StackExchange.Redis), meaning you can easily interact with them using the existing redis-cli. For instance, [StackExchange.Redis is RESP compatible](https://stackexchange.github.io/StackExchange.Redis/Resp3), so if you choose to switch to, for instance, redka, you can do so without changing your codebase, and it's basically a drop-in replacement. The same goes for Apache's implementation of Redis called kvrocks, which is also RESP compatible.

```bash
> docker run --name redka -p 6379:6379 -d nalgeon/redka
> docker exec -it redka sh

> docker run --name kvrocks -p 6379:6666 -d apache/kvrocks
> docker exec -it kvrocks sh
> redis-cli -p 6666
```

By the way, you might not want to use `redka` as it's 2-6 times slower than a key-value store because it uses a relational database. However, it can handle 22K writes per second and 57K reads per second. If you're curious about how it stores the data, you can copy the SQLite database and look at the table structures:

<img src="/img/redis/redka-schema.png" alt="Redka Schema" class="blog-post-image" />

You can query the views to see the data.
