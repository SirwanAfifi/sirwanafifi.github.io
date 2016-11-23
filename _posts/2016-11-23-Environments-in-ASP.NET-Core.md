---
layout: post
title: Environments in ASP.NET Core
tags: ASP.NET Core
---
In ASP.NET Core we can have different hosting environments, this is supported by an environment variable called `ASPNETCORE_ENVIRONMENT`. You can see this value is already set to `Development`:

<img src="/public/img/environment.jpg" width="600">

This value is active as long as you run your application inside Visual Studio, So when you deploy your application you must change this value. Actually, this value comes from a file called `launchSettings.json`:
{% highlight csharp %}
{
  "iisSettings": {
    "windowsAuthentication": false,
    "anonymousAuthentication": true,
    "iisExpress": {
      "applicationUrl": "http://localhost:13880/",
      "sslPort": 0
    }
  },
  "profiles": {
    "IIS Express": {
      "commandName": "IISExpress",
      "launchBrowser": true,
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    },
    "ProjectName": {
      "commandName": "Project",
      "launchBrowser": true,
      "launchUrl": "http://localhost:5000",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
{% endhighlight %}
You can determine what the environment is by using `IHostingEnvironment`:
{% highlight csharp %}
public void Configure(IApplicationBuilder app, 
	IHostingEnvironment env, ILoggerFactory loggerFactory)
{
	loggerFactory.AddConsole();

	if (env.IsDevelopment())
	{
		app.UseDeveloperExceptionPage();
	}
	else
	{
		app.UseExceptionHandler(new ExceptionHandlerOptions
		{
			ExceptionHandler = context => context.Response.WriteAsync("Opps!")
		});
	}

	// other configurations
}
{% endhighlight %}
This object also has a method called `IsEnvironment` for using custom environment:
{% highlight csharp %}
if (env.IsEnvironment("envName"))
{
    // some config
}
{% endhighlight %}

One interesting thing is that the Startup class itself supports different environments, it means that for each environment you can have both `Configure` and `ConfigureServices`:
{% highlight csharp %}
public void ConfigureDevelopment(IApplicationBuilder app, .....
public void ConfigureServicesDevelopment(IServiceCollection services)

public void ConfigureStaging(IApplicationBuilder app, .....
public void ConfigureServicesStaging(IServiceCollection services)

public void ConfigureProduction(IApplicationBuilder app, .....
public void ConfigureServicesProduction(IServiceCollection services)
{% endhighlight %}

Now you might ask how we can set this environment variable, well there are several ways that you can use, this great [post](http://andrewlock.net/how-to-set-the-hosting-environment-in-asp-net-core/) explains them in details.