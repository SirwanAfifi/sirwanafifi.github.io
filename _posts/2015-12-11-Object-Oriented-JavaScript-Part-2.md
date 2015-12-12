---
layout: post
title: Object Oriented JavaScript Part 2
tags: JavaScript C#
---
###Classes
In many programming languages a [class](https://en.wikipedia.org/wiki/Class_(computer_programming)) is a standard unit of work, which means that you normally create all of your code inside classes and these classes contain data, behaviour, events and those sort of things that you are going to use in developing your solutions. for example in C# we can create a class this way:
{% highlight csharp %}
public class Person
{
    // Field
    public string firstName;
	// Constructor that takes no arguments.
    public Person(string firstName, string lastName)
    {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // Method
    public string Greet(string name)
    {
        return $"Hello, { name }. My name is { this.firstName }"
    }
}
{% endhighlight %}
In this case we have a class along with properties, constructor. So a class in C# contains data as well as operation as well as events. It will be useful to create same sort of structure in JavaScript. Prior to ES6 there was no such thing as a class in JavaScript, we could simply do everything with functions, we could create classes by using some of the language semantics to create things that look and feels like classes. But they were not classes in the classical sense. for example we used function to do this:
{% highlight js %}
function Person(firstName, lastName){
	this.firstName = firstName;
	this.lastName = lastName;
}
Person.prototype.greet = function (name) {
	return "Hello, " + name + ". My name is " + this.firstName;
};
{% endhighlight %}
So what this function does is use the `this` keyword to define new property that represents a person object in this case. And what's interesting here this is what's called a constructor syntax. So this function when called will return an object. By doing this, we can create a new person:
{% highlight js %}
var person = new Person("Sirwan", "Afifi");
{% endhighlight %}
In this case, we can see that it is using the `new` keyword. this keyword is used to find a function with a name, after the `new`, return an object that contained the shape that is defined in the function. Once we have an instance of that, we can get any of the properties that are specified in the constructor syntax function:
{% highlight js %}
var firstName = person.firstName;
{% endhighlight %}
ES6 introduces language support for classes with `class` keyword. So the ES6 equivalent of the `Person` function would be the following:
{% highlight js %}
class Person {
	constructor(firstName, lastName) {
		this.firstName = firstName;
		this.lastName = lastName;
	}
	
	greet(name) {
		return `Hello, ${name}. My name is ${this.firstName}`;
	}
}	
{% endhighlight %}