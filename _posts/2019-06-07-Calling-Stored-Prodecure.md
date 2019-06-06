---
layout: post
title: Calling Stored Procedures using Dapper
tags: EF Core Dapper C#
---

Today I wanted to call a Stored Procedure using Entity Framework Core. It is possible using `DbSet.FromSql()` method, which is one of the powerful features of Entity Framework Core. It gives us the ability to run RAW SQL queries directly against a database:

```csharp
var blogs = context.Blogs
    .FromSql("CALL GetBlogs")
    .ToList();
```

But the problem is that the column names in the result set must match the column names that properties are mapped to. So, for example, given this Stored Procedure:

```sql
CREATE DEFINER=`root`@`%` PROCEDURE `GetBlogs`()
BEGIN
	select avg(Rate) as average, min(Rate)as minimum, max(Rate) as maximum
	from blogs
END
```

In this case, your model must be exactly the same as the result set. Otherwise, you'd get an exception. Most of our Stored Procedure use some Aggregate functions. So I had to find another solution for it which was using Dapper. As you probably know, Dapper is nothing but a set of extension methods on top of `IDbConnection`. So to use it, you will need to install `Dapper` and register it using built-in IoC container in your ASP.NET Core application:

```csharp
services.AddTransient<IDbConnection>((sp) => new MySqlConnection(configuration.GetConnectionString("MyConnection")));

```

Then you can use it inside your services:

```csharp
public class MyService
{
    private readonly IDbConnection _dbConnection;

    public MyService(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public Task<IEnumerable<BlogViewModel>> GetBlogs(long authorId)
    {
        var query = _dbConnection.QueryAsync<BlogViewModel>("GetBlogs", new { AuthorId = authorId },
            commandType: CommandType.StoredProcedure);
        return query;
    }
}
```
