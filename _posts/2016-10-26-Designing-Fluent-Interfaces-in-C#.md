---
layout: post
title: Designining Fluent Interfaces in C#
tags: C#, Design Patterns
---

The concept of [Fluent Interface](martinfowler.com/bliki/FluentInterface.html) was coined by Martin Fowler to create various objects and wire them up together. This pattern is often used for object configuration and setup. For example in ASP.NET Core applications we have following code for configuring the server:
{% highlight csharp %}
using System;
using Microsoft.AspNetCore.Hosting;

namespace aspnetcoreapp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            host.Run();
        }
    }
}
{% endhighlight %}
As you can see we can chain methods together easily and the intention is to produce an API that is readable and flows. This pattern is heavily used in programming, Here's an example of using this approach in jQuery:
{% highlight js %}
$('#result')
	.css('background', 'yellow')
	.width(200)
	.height(200)
	.text('This is the result');
{% endhighlight %}
For C#, there is LINQ:
{% highlight csharp %}
var person = PersonDataSource
	.Where(p => p.Age > 20)
	.OrderBy(p => p.Name)
	.Select(p => new {
		Name = p.Name,
		LastName = p.LastName
});
{% endhighlight %}
You might ask how to implement this pattern, well, it is very simple you just need to return `this` during method call. The `Calculator` defined below contains three methods. These methods are returing `Calculator` object using `this` keyword, which allow to chain the methods:
{% highlight csharp %}
public class Calculator 
{
	public int Initial { get; private set; }
	public ChainableCalculator(int intial)
	{
		Initial = intial;
	}

	public ChainableCalculator Add(int x)
	{
		Initial = Initial + x;
		return this;
	}

	public ChainableCalculator Divide(int x)
	{
		Initial = Initial / x;
		return this;
	}

	public ChainableCalculator Substract(int x)
	{
		Initial = Initial - x;
		return this;
	}
}
{% endhighlight %}
Now we can use the class this way:
{% highlight csharp %}
var calc = new Calculator(5)
			.Add(5)
			.Divide(5)
			.Substract(2);

System.Console.WriteLine(calc.Initial);
{% endhighlight %}

As you can see this approach makes our code concise and more easier to read.