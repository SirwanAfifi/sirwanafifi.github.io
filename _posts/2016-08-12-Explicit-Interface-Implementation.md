---
layout: post
title: Explicit Interface Implementation
tags: C#
---
Let's imagine that you have a class with two methods:
{% highlight csharp %}
public class VendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    public string Buy()
    {
        return "Buy";
    }
}
{% endhighlight %}
Now when we want to create an instance of this class and call one of those methods, it executes as expected:
{% highlight csharp %}
VendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // false
machine.Buy();         // "Buy"
{% endhighlight %}
Now suppose that we have an interface called `IVendingMachine` that has two methods:
{% highlight csharp %}
public interface IVendingMachine 
{
    bool InsertCoin(float amount);
    string Buy();
}
{% endhighlight %}
We want our class to implements this interface:
{% highlight csharp %}
public class VendingMachine : IVendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    public string Buy()
    {
        return "Buy";
    }
}
{% endhighlight %}
Our class satisfied the interface because it has the methods with the same names. So Visual Studio doesn't give you a compiler error. Now let's imagine that we
also want to add interface's methods to this class, So, in this case, we must explicitly prefix the methods with `IVendingMachine.`:
{% highlight csharp %}
public class VendingMachine : IVendingMachine
{
    public bool InsertCoin(float amount)
    {
        if (amount < 500)
        {
            return false;
        }
        return true;
    }

    bool IVendingMachine.InsertCoin(float amount)
    {
        if (amount < 300)
        {
            return true;
        }
        return false;
    }

    public string Buy()
    {
        return "Buy";
    }

    string IVendingMachine.Buy()
    {
        return "IVendingMachine Buy";
    }
}
{% endhighlight %}  
Note that Visual Studio can help you to implement interface explicitly by pressing `Ctrl + .` on the name of the interface and select `Implement interface explicitly`:  

<img src="/public/img/explicit_interface_implementation.jpg" width="800">
Now, what happens when we call the `InsertCoin` and `Buy` methods? In this case, we should consider two different situations when we create the object:  

- Concrete Type  
- Interface Variable

If we want the methods of `VendingMachine` we should create the object with concrete type:
{% highlight csharp %}
VendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // false
machine.Buy();         // "Buy"
{% endhighlight %}
If we want the methods of `IVendingMachine` we should create the object with interface variable:
{% highlight csharp %}
IVendingMachine machine = new VendingMachine();
machine.InsertCoin(5); // true
machine.Buy();         // "IVendingMachine Buy"
{% endhighlight %}
