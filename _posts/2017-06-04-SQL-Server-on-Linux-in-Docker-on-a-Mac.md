---
layout: post
title: SQL Server on Linux in Docker on a Mac
tags: Docker, ASP.NET Core
---
Over the last few months, I have been working on a couple of ASP.NET Core projects, it's been great experience so far becuase I can easily work on [different platforms](http://sirwan.info/My-first-experiences-with-Linux) while working with these projects. I recently bought a MacBook Pro and have decided to do .NET projects on macOS from now on.

Fortunately working with projects is not a pain in the neck anymore, with help of [Docker](https://www.docker.com/what-docker) you can easily setup up a complex development environment in minutes. It actually simplifies the process of building and shipping, running your apps on differente environments.  

The first challenge I faced when using macOS was connecting and using SQL Server. Thanks to Docker and SQL Server for Linux. It's an instance of SQL Server as a docker container and it's super-fast so that it runs in seconds.

<center><img src="/public/img/docker.png"></center>

---

## Installing Docker for Mac
In order to get Docker to work you will need to install Docker for Mac, you can follow [these steps](https://docs.docker.com/docker-for-mac) to install it. Once Docker installation is done, it will automatically be started:
<br />
<center><img width="400" src="/public/img/docker-running.png"></center>

You can also run `docker --version` to verify that Docker is working as expected.

---

## Pulling and running Docker image
Next, you can install and run SQL [Server on Linux docker image](https://hub.docker.com/r/microsoft/mssql-server-linux) using following command:
{% highlight shell %}
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=Passowrd’ -p 1433:1433 -d microsoft/mssql-server-linux
{% endhighlight %}
This command will install and run the SQL Server image. Now SQL Server is running locally in Docker container:
<center><img width="800" src="/public/img/sql-server-is-running.png"></center>
You can use its connection string in your ASP.NET Core application:
{% highlight csharp %}
public class MvcMovieContext : DbContext
{
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer(@"Data Source=localhost;Initial Catalog=MovieDB;User ID=sa;Password=StrongPassword");
    }

    public DbSet<Movie> Movies { get; set; }
}
{% endhighlight %}
Now if we run migration, the `MovieDB` database will be created in the running docker container:
{% highlight shell %}
dotnet ef database update
{% endhighlight %}

## Connecting and quering the databse
There are several ways to connect and query a database running in Docker container, one way is using a command line tool called `sqlcmd`:
<center><img width="800" src="/public/img/sqlcmd.png"></center>

Personally I use `mssql` extension for Visual Studio Code. becuase it's really easy to use so you don't have to write your queries in command line mode. If you have not already installed this extension, all you need to do is press `⌘ + P` and type `ext install mssql` then press enter to install it.

In order to connect and query your database you need to first write your SQL queries into a `SQL` file in VS Code then press `⌘ + Shift + P` then choose `Create Connection Profile`, follow the prompts to specify the connection properties for the new connection profile. At the end you should have following settings:
{% highlight jsonnet %}
{
    "mssql.connections": [
        {
            "authenticationType": "SqlLogin",
            "server": "localhost",
            "database": "MovieDB",
            "user": "SA",
            "password": "",
            "savePassword": true,
            "profileName": "MovieDB"
        }
    ],
}
{% endhighlight %}
As you can see `mssql.connections` takes an array, it means that you can define as many connection profiles as you want. Once you defined your profile, you can use it to execute your queries then the result will be shown as a seperate window:
<center><img width="800" src="/public/img/query_result_mssql.png"></center>

As you can see working with SQL Server on macOS is really straightforward. Something like this was not possible in .NET before but nowadays but nowadays you can develope .NET applications on OS of your choice. that's why I’m more excited about .NET than ever.

