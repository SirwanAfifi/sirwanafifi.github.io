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
So we have essentially recreated the same Person data type but with much better syntax. behind the scene the runtime is doing the exactly what we used to do. But now the syntax is clean and expressive. As you can see there is `constructor` in the class definition. the constructor is one of the class members that we can list in the body of a class, just like the other members it is a function, it is a function that automatically invoked when we say `new` and use the class name as a function call:
{% highlight js %}
var person = new Person("Sirwan", "Afifi");
{% endhighlight %}
###Getters and Setters
In a class we can also use getter and setter, they are created using `get` and `set` keyword. get and set allows us to run code on the reading or writing of a property:

{% highlight js %}

// ES6 get and set
class Person {
    constructor(firstName, lastName) {
        this._firstName = firstName;
        this._lastName = lastName;
    }
  
    get fullName() {
      var result  = this._firstName + ", " + this._lastName;
        return result.toUpperCase();
    }
  
    set firstName(newName) {
        this._firstName = newName; 
    }
   set lastName(newName) {
        this._lastName = newName; 
    }
   greet(name) {
     return `Hello, ${name}. My name is ${this._firstName}`;
   }
}    
let sirwan = new Person('Sirwan', 'Afifi');
console.log(sirwan.fullName);  // Outputs 'SIRWAN, AFIFI'
let omid = new Person('Daryoush', 'Zandi');
omid.firstName = "Omid";
omid.lastName = "Kamangar";
console.log(omid.fullName);  // Outputs 'OMID, KAMANGAR'

{% endhighlight %}


###Inheritance
ES6 also gives us an easy syntax to specify and inheritance for relationship. Which is a way we say a class inherits from another class. Now assume that we need another class for modling an `Employee`, since every employee is a person, maybe we will have the `Employee` inherit from a `Person`. In ES6 we can inheritance is specified using `extends` keyword:
{% highlight js %}
class Employee extends Person{
  // more features
  getWork() {
    return `${ this._firstName } is working.`;
  }
}

let emp = new Employee('Sirwan', 'Afifi');
console.log(emp.getWork()); // Outputs 'Sirwan is working.'
{% endhighlight %}

The only thing is that a lot of features in ES2015 are not supported in the browsers. For example classes are not supported by any browser, now there might be a nightly built of Firefox that supports classes. So instead we have to use a transpiler and there are many transpilers such as [TypeScript](http://www.typescriptlang.org), [Bable](https://babeljs.io) and variety of others. I recommend you to use Bable because it has the best support for all of ES2015 features. 