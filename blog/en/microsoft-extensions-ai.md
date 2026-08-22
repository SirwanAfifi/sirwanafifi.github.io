# Microsoft.Extensions.AI

With .NET 9.0, a new set of abstractions has been introduced to simplify integrating AI into applications: `Microsoft.Extensions.AI`. This package offers a consistent programming model by wrapping various AI providers (such as OpenAI, Azure OpenAI, and Ollama), allowing .NET developers to work seamlessly with different models.

- Published: 2024-11-14
- Language: en
- Tags: .NET 9.0, AI, RAG
- Canonical: https://sirwan.info/blog/en/microsoft-extensions-ai

---

With .NET 9.0, a new set of abstractions has been introduced to simplify integrating AI into applications: `Microsoft.Extensions.AI`. This package offers a consistent programming model by wrapping various AI providers (such as OpenAI, Azure OpenAI, and Ollama), allowing .NET developers to work seamlessly with different models.

<img src="https://devblogs.microsoft.com/dotnet/announcing-dotnet-9/aiextensions.svg" alt="AI Building Blocks for .NET" />

I experimented with it a bit, and it's quite promising. Here’s a simple example how it can be used:

```csharp
app.MapPost("/chat", async (
    ChatRequest request,
    IChatClient client,
    ILogger<Program> _) =>
{
    try
    {
        var history = request.History ?? new List<ChatMessage>();
        if (!history.Any())
        {
            history.Add(new ChatMessage
            {
                Role = ChatRole.System,
                Contents = new List<AIContent>
                {
                    new TextContent("You are a helpful AI assistant. Provide clear, concise responses.")
                }
            });
        }
        history.Add(new ChatMessage
        {
            Role = ChatRole.User,
            Contents = new List<AIContent>
            {
                new TextContent(request.Message)
            }
        });

        var response = await client.CompleteAsync(history);
        return Results.Ok(new ChatResponse(
            Message: response.Message.Text,
            History: history
        ));
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Chat Processing Error",
            detail: ex.Message,
            statusCode: StatusCodes.Status500InternalServerError
        );
    }
});
```

The `IChatClient` interface is basically for interacting with large language models (LLMs):

```csharp
IChatClient innerChatClient = new OllamaChatClient(new Uri("http://localhost:11434"), modelId: "llama3.2:3b");
```

Additionally, there’s an abstraction for generating embeddings. Here’s a simplified version of my previous blog post [Git Commits as Documentation (RAG-Powered Commit Search)](/blog/en/git-commit-as-documentation/):

```csharp
IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator = new OllamaEmbeddingGenerator(new Uri("http://localhost:11434"), modelId: "mxbai-embed-large");

var gitCommitMessages = new List<string>
{
    "skip seeding prefetch cache in development",
    "fix: add missing null check",
    "feat: add new chat feature",
    "fix: remove unused imports",
    "feat: add new chat feature",
    // ...
};
var commitsEmbeddings = await embeddingGenerator.GenerateAndZipAsync(gitCommitMessages);

app.MapPost("/search", async (
    SearchRequest search,
    ILogger<Program> _) =>
{
    try
    {
        var inputEmbedding = await embeddingGenerator.GenerateEmbeddingAsync(search.Query);

        var closestCommits = from commit in commitsEmbeddings
                             let distance = TensorPrimitives.CosineSimilarity(commit.Embedding.Vector.Span, inputEmbedding.Vector.Span)
                             orderby distance descending
                             select commit.Value;
        return Results.Ok(closestCommits.Take(3));
    }
    catch (Exception ex)
    {
        return Results.Problem(
            title: "Embedding Generation Error",
            detail: ex.Message,
            statusCode: StatusCodes.Status500InternalServerError
        );
    }
});

record SearchRequest(string Query);
```

Since these are interfaces rather than concrete implementations, you can easily switch between AI providers without altering your application code. Whether you’re using local models with Ollama for development or Azure OpenAI for production, the API remains consistent.

This feature significantly simplifies adding AI capabilities to .NET applications, offering the flexibility to choose or swap providers as needed. For more details, refer to the official documentation: [Introducing Microsoft.Extensions.AI Preview - Unified AI Building Blocks for .NET - .NET Blog](https://devblogs.microsoft.com/dotnet/introducing-microsoft-extensions-ai-preview/), Or check out this great talk from Steve Sanderson:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/qcp6ufe_XYo?si=K-9zoim20jgfr6w2" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
