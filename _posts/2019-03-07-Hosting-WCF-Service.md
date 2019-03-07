---
layout: post
title: Hosting a WCF Service as a Windows Service Using Topshelf
tags: C# WCF
---
You might be wondering why I am blogging about WCF. Is it still relevant?  This is part of a legacy WCF project, and I am responsible for adding some functionalities to it, I like it though. By the way, it's been a long time since it went out of fashion, but many large enterprise applications still use it. 

As you know, WCF services need to run in a host process so when clients want to consume the services we need to make sure the services are alive. The host process needs to provide a host, and this host is responsible for setting up the services and listening for incoming messages then creating instances of the service and respond to the client by dispatching a call to the service class. As I mentioned in a legacy application we wanted to host our services as a Windows Service, this app had been using a Console application, but the problem with Console applications is that you need to make sure the app is open all the time. For example, if the server gets restarted you should manually open the app, you could say we should add this app as a startup process so whenever the system boots up this app is opened but we can achieve a better result by writing a Windows service instead. Windows services are a great way to run code in the background; this means that we don’t need a UI like Console Application to run the application. Once you installed the service it keeps running, we can control how to start the service for example when can set it to automatically started when the system boots or be configured when a user logs in. Both of these approaches are considered as two hosting options because they are self-hosted applications; it means that both are running inside a .NET process.

## Installing Topshelf
Topshelf is an open source .NET Windows Service library, it makes the process of creating Windows services much easier for us so that we can only focus on the service functionality as opposed to setting up the boilerplate service code. To install TopShelf all we need to do is installing its NuGet package:

```
Install-Package Topshelf
```

The next step is wrapping yuor service functionality inside a classs with two methods `Start` and `Stop` these methods are going to be used by TopShelf to start and stop the service:


```csharp
public class MyService
{
    private ServiceHost usersHost;
    
    public bool Start()
    {

        try
        {
            usersHost = new ServiceHost(typeof(UsersService.UsersService));

            usersHost.Open();
            Console.WriteLine("Service Running...");
            Console.WriteLine("Press a key to quit");

            return true;
        }
        catch (Exception ex)
        {

            return false;
        }
        finally
        {
            usersHost.Close();
        }
    }

    public bool Stop()
    {
        usersHost.Close();
        
        return true;
    }
}
```

The next step is adding this class to TopShelf for creating our Windows Service:

```csharp
public class Program
{
    static void Main(string[] args)
    {
        HostFactory.Run(serviceConfig => 
        {
            serviceConfig.Service<MyService>(serviceInstance => 
            {
                serviceInstance.ConstructUsing(() => new MyService());
                serviceInstance.WhenStarted(execute => execute.Start());
                serviceInstance.WhenStopped(execute => execute.Stop());
            });

            serviceConfig.SetServiceName("My Service");
            serviceConfig.SetDisplayName("My Service");
            serviceConfig.SetDescription("Hosting WCF services");

            serviceConfig.StartAutomatically();
        });
    }
}
```

## Installing our service into Windows
- Run Command Prompt as Admin
- cd into to bin\Debug folder
- {AssebmlyName}.exe install