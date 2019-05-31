---
layout: post
title: Highlighting Current Link in Razor Pages
tags: Razor ASP.NET Core
---

Let's say you have several pages in your Razor Pages application. Now you want to make the menu items active depending on the page you are currently on:

<img class="center-image" src="/public/img/active_menu.png" alt="Active menu" width="700">

The solution is pretty simple; all you need to do is checking the request path in `_Layout` file. To access the Request object, you need to inject `IHttpContextAccessor` in the layout file. Before injecting this interface into our view we must register it in `ConfigureServices` method in Startup class:

```csharp
public void ConfigureServices(IServiceCollection services)
{
    // ...
    services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
}
```

_Note_: If you are using ASP.NET Core 2.1+ you can use `AddHttpContextAccessor` helper extension method to correctly register the `IHttpContextAccessor` with the correct lifetime (singleton):

```csharp
services.AddHttpContextAccessor();
```

Now we should be able to access current `HttpContext` inside our views:

```html
@inject Microsoft.AspNetCore.Http.IHttpContextAccessor Accessor
<html>
<head>
    <title>Layout</title>
    <link rel="stylesheet" href="/css/shared.css" />
    @RenderSection("styles", false)
</head>
<body>
    <header class="header-shadow">
        <div class="container is-fluid header">
            <nav class="navbar">
                <div class="navbar-menu navbar-end" id="mainNavMenu">
                    <a class="navbar-item @(Accessor.HttpContext.Request.Path.Value == "/" ? "nav-item-selected" : "" )" href="/">Home</a>
                    <a class="navbar-item @(Accessor.HttpContext.Request.Path.Value == "/Services" ? "nav-item-selected" : "" )" href="/Services">Services</a>
                    <a class="navbar-item @(Accessor.HttpContext.Request.Path.Value == "/About" ? "nav-item-selected" : "" )" href="/About">About Us</a>
                    <a class="navbar-item @(Accessor.HttpContext.Request.Path.Value == "/Contact" ? "nav-item-selected" : "" )" href="/Contact">Contact</a>
                </div>
            </nav>
        </div>
    </header>

    @RenderBody()

</body>
</html>

```
