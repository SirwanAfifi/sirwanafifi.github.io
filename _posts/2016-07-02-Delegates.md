---
layout: post
title: Delegates in C#
tags: C# ASP.NET MVC
---
Lately I have been studying some topics in C# in order to improve myself. I think [Delegate](https://msdn.microsoft.com/en-us/library/ms173171.aspx) is one of those topics which is kinda difficult for beginners to initiate with. So, in order to make it clear how it works, I'm going to make some explanations in this post.

### What are Delegates?
Delegate was introduced in C# 1. Think of it as a simply being a placeholder for functions that'll be called at some point in time. Assume you want to declare a variable that is a reference to a specific method. In this case, the variable encapsulates some executable code and you can invoke the variable just like an actual method. In doing so, we need to create a delegate

### Defining a Delegate
Delegates are created using `delegate` keyword along with the function signature:
{% highlight csharp %}
delegate int Sum(int a, int b);
{% endhighlight %}
As you can see we are defining a delegate called `Sum` that is compatible with any method with an `int` return type with two parameters. Actually we defined a type that we can use to create variables and point those variables to methods that have the same signature and same return type. 
The type defenition for a delegate describes the method that we want to call:
{% highlight csharp %}
int Add(int a, int b) => a + b;
{% endhighlight %}
Now we can assign a method to the delegate variable. This assignment creates a delegate instance:
{% highlight csharp %}
Sum s = Add;
{% endhighlight %}
Now we can invoke the delegate instance in the same way as a method:
{% highlight csharp %}
int result = s(5, 6);
{% endhighlight %}

### Advantages of Delegate

- Delegates are type safe, It means that the C# compiler checks the function signatures of a Delegate when you use them at runtime.
- Can be used to define callback functions.
- Can be dynamically switched at runtime.  

### Real World example
Suppose that you want to implement something like a [Repeater](https://msdn.microsoft.com/en-us/library/system.web.ui.webcontrols.repeater(v=vs.85).aspx) control in your ASP.NET MVC application, As you probably know a Repeater is(was) server side databound control in ASP.NET WebForm for displaying information, It had a lot of flexability becuase you had complete control over the your markup. 
{% highlight csharp %}
public static class Helpers
{
	public delegate HelperResult ItemTemplate<T>(T input);

	public static HelperResult Repeater<T>(this HtmlHelper html,
	  IEnumerable<T> items,
	  ItemTemplate<T> itemTemplate,
	  ItemTemplate<T> alternatingitemTemplate = null)
	{
		return new HelperResult(writer =>
		{
			int i = 0;
			foreach (var item in items)
			{
				var func = i % 2 == 0 ? itemTemplate : alternatingitemTemplate;
				func(item).WriteTo(writer);
				i++;
			}
		});
	}
}
{% endhighlight %}
As you can see we emulated the `ItemTemplate` and `AlternatingItemTemplate` using a delegate. In this case user can pass the data and the data will be rendered inside the view. In this case the delegates act like callback.   
The `ItemTemplate` delegate in our example can be replaced with `Func` delegate:  
{% highlight csharp %}
Func<T, HelperResult> itemTemplate,
Func<T, HelperResult> alternatingitemTemplate = null
{% endhighlight %}
Now we can use our helper inside any view:  

{% highlight html %}
<table>
    <tr>
        <td>Id</td>
        <td>Name</td>
    </tr>
    @Html.Repeater(Model, @<tr>
	    <td>@item.Title</td>
	    <td>@item.Price</td>
	</tr>, 
	@<tr class="alert-info">
	    <td>@item.Title</td>
	    <td>@item.Price</td>
    </tr>)
</table>
{% endhighlight %}
If you run the application you can see the result:  

<img src="/public/img/repeater.jpg" width="500">  


You can check out the [GitHub repository](https://github.com/SirwanAfifi/using_delegates) for this post.



