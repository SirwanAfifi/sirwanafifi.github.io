# Using IHostingEnvironment in a test project

Assume that you have a service which accepts IHostingEnvironment as its dependency...

- Published: 2019-08-09
- Language: en
- Tags: ASP.NET Core, xUnit, .NET Core
- Canonical: https://sirwan.info/blog/en/Using-IHostingEnvironment-in-a-test-project

---

Assume that you have a service which accepts `IHostingEnvironment` as its dependency:

```csharp
public class MyService
{
    private readonly IHostingEnvironment hostingEnv;

    public MyService(IHostingEnvironment hostingEnv)
    {
        this.hostingEnv = hostingEnv;
    }

    public Task<IEnumerable<Post>> GetPosts()
    {
        var fileInfo = hostingEnv.ContentRootFileProvider.GetFileInfo("posts.json");
        var file = File.ReadAllText(file.PhysicalPath);
        var deserializeObject = JsonConvert.DeserializeObject<IEnumerable<Post>>(file);
        return Task.FromResult(deserializeObject);
    }
}
```

Now we wan to be able to load that JSON file inside a test project in order to test the service. First of all, we need to make sure we have these packages installed on the test project:

```xml
<ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.Hosting" Version="2.2.0" />
    <PackageReference Include="Microsoft.AspNetCore.Hosting.Abstractions" Version="2.2.0" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection" Version="2.2.0" />
    <PackageReference Include="Microsoft.Extensions.DependencyInjection.Abstractions" Version="2.2.0" />
    <PackageReference Include="Microsoft.Extensions.FileProviders.Physical" Version="2.2.0" />
    <PackageReference Include="Microsoft.NET.Test.Sdk" Version="16.0.1" />
    <PackageReference Include="xunit" Version="2.4.0" />
    <PackageReference Include="xunit.runner.visualstudio" Version="2.4.0" />
</ItemGroup>
```

We also need to modify the csproj file to copy the JSON file to the build output:

```xml
<ItemGroup>
    <None Update="data.json">
        <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
    </None>
</ItemGroup>
```

Then we need a base class to configure the built-in DI container and register `IHostingEnvironment`:

```csharp
namespace GreatSpot.Tests
{
    public class BaseTest
    {
        public static IServiceProvider Services { get; private set; }
        public BaseTest()
        {
            var serviceCollection = new ServiceCollection();
            serviceCollection.AddSingleton<IHostingEnvironment>(new HostingEnvironment
            {
                ContentRootFileProvider = new PhysicalFileProvider(Environment.CurrentDirectory)
            });
            Services = serviceCollection.BuildServiceProvider();
        }
    }
}
```

Now we can use the registred service in our test methods:

```csharp
public class PostTests : BaseTest
{
    [Fact]
    public async Task Get_All_Posts()
    {
        var hostingEnvironment = Services.GetService<IHostingEnvironment>();

        var myService = new MyService(hostingEnvironment);
        var data = await myService.GetPosts();
        Assert.Equal(10, data.Count);
    }
}
```
