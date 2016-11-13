---
layout: post
title: Getting to know Singleton pattern in C#
tags: C#, Design Patterns
---

This pattern helps us to ensure a class has only one instance. The term comes from the [mathematical concept of a singleton](https://en.wikipedia.org/wiki/Singleton_(mathematics)):  

> In mathematics, a singleton, also known as a unit set,[1] is a set with exactly one element. For example, the set {0} is a singleton.

Eventually we must have a class that only gives us a single instance:
{% highlight csharp %}
var sigleInstance = MySingletonClass.GetInstance();
{% endhighlight %}
As you can see the only way to access the instance is by calling a public static method called `GetInstance()`, the single object instance under consideration is created only for the first time it is requested. suppose the following class:
{% highlight csharp %}
public class MySingletonClass
{
    public MySingletonClass()
    {
	
    }
}
{% endhighlight %}
Now I want to make this class singleton, So the first step is to ensure that no one can instantiate our class for doing so we must make the constrauctor `private`:
{% highlight csharp %}
public class MySingletonClass
{
    private MySingletonClass()
    {
	
    }
}
{% endhighlight %}
Now whenever you want to create a new instance of `MySingletonClass` using `new` keyword, Visual Studio gives you this error:

<img src="/public/img/singleton_error.jpg" width="500">

But we can still instantiate it from within the class. So next step is to create a new variable of type `MySingletonClass` inside the class, this class is going to be the only instance of the class:
{% highlight csharp %}
public class MySingletonClass
{
	private static MySingletonClass _instance;

	private MySingletonClass() { }
}
{% endhighlight %}

So we are getting close to implementing the pattern. Now we need a way to get access the single instance. So we need a method like this:
{% highlight csharp %}
public static MySingletonClass GetInstance()
{
	if (_instance == null)
	{
		_instance = new MySingletonClass();
	}
	return _instance;
}
{% endhighlight %}
This method instantiates `MySingletonClass` if an instance doesn't already exist, otherwise it return the existing instance. To demonstrate the object lifetime we can print value of `GetHashCode()` fo these objects:
{% highlight csharp %}
var mySingleInstance   = MySingletonClass.GetInstance();
var mySingleInstance_2 = MySingletonClass.GetInstance();
var mySingleInstance_3 = MySingletonClass.GetInstance();
var mySingleInstance_4 = MySingletonClass.GetInstance();

Console.WriteLine($"obj1: {mySingleInstance.GetHashCode()}");
Console.WriteLine($"obj2: {mySingleInstance_2.GetHashCode()} ");
Console.WriteLine($"obj3: {mySingleInstance_3.GetHashCode()} ");
Console.WriteLine($"obj4: {mySingleInstance_4.GetHashCode()} ");
{% endhighlight %}

<img src="/public/img/singleton_GetHashCode.jpg">
As you can see all of the objects are the same and share the same instance. The problem with this implementation is that, it's not [thread-safe](http://csharpindepth.com/Articles/General/Singleton.aspx). One of the solution is by using .NET 4's `Lazy<T>` type:
{% highlight csharp %}
public class MySingletonClass
{
	private static readonly Lazy<MySingletonClass> _instance = 
		new Lazy<MySingletonClass>(() => new MySingletonClass());

	private MySingletonClass() { }

	public static MySingletonClass GetInstance()
	{
		return _instance.Value;
	}
} 
{% endhighlight %} 