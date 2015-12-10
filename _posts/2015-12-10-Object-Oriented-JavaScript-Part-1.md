---
layout: post
title: Object Oriented JavaScript Part 1
---
Recently I've started to improve my JavaScript skill, So I decided to keep notes about new things I learn from now on.
Since I'm a C# developer, I'm trying to use my existing knowledge in C# to learn JavaScript.  

As you know in C# we have something called [Object and collection initializer](https://msdn.microsoft.com/en-us/library/bb384062.aspx). For example we can use object initializer to create name and value pairs for different properties of the object, in this case `cat` object:

{% highlight cs %}
var car = new Car()
{ 
    Name = "Chevrolet Corvette", 
    Color = "Red", 
    Manufacturer = new CarManufacturer() 
    { 
        Name = "Chevrolet", 
        Country = "USA" 
    } 
};
{% endhighlight %}
As you can see we used object initializer for those embedded objects too.
Although object initializers can be used for anonymous types. So here's the same example which we build with anonymous object:

{% highlight cs %}
var car = new { 
    Name = "Chevrolet Corvette", 
    Color = "Red", 
    Manufacturer = new { 
        Name = "Chevrolet", 
        Country = "USA" 
    } 
};
{% endhighlight %}
This is very similar the way dynamic objects work in JavaScript. So in JavaScript object creation is going to follow this pattern:
{% highlight js %}
var car = new { 
    name: "Chevrolet Corvette", 
    color: "Red", 
    manufacturer: new { 
        name: "Chevrolet", 
        nountry: "USA" 
    },
    "towing capacity": "5,952 lbs" 
};
{% endhighlight %}
As you can see we use key/value pairs. Actually it's a little different from C# for instance we used colons (`:`) instead of equals (`=`) but generally the syntaxes are similar. In some case you may see the name is embedded in quotes, it's optional but if you're using any reserved characters like space, in this case, you need to surround the name with quotes (like `towing capacity`).