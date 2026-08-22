# Object Oriented JavaScript Part 1

In this post we are going to talk about object oriented programming in JavaScript and how it's different from other languages.

- Published: 2015-12-10
- Language: en
- Tags: C#, JavaScript
- Canonical: https://sirwan.info/blog/en/Object-Oriented-JavaScript-Part-1

---

Recently I've started to improve my JavaScript skill, So I decided to keep notes about new things I learn from now on.
Since I'm a C# developer, I'm trying to use my existing knowledge in C# to learn JavaScript.  
As you know in C# we have something called [Object and collection initializer](https://msdn.microsoft.com/en-us/library/bb384062.aspx). For example we can use object initializer to create name and value pairs for different properties of the object, in this case `car` object:

```csharp
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
```

As you can see we used object initializer for those embedded objects too.
Although object initializers can be used for anonymous types. So here's the same example which we build with anonymous object:

```csharp
var car = new {
    Name = "Chevrolet Corvette",
    Color = "Red",
    Manufacturer = new {
        Name = "Chevrolet",
        Country = "USA"
    }
};
```

This is very similar the way dynamic objects work in JavaScript. So in JavaScript object creation is going to follow this pattern:

```js
var car = {
  name: "Chevrolet Corvette",
  color: "Red",
  manufacturer: {
    name: "Chevrolet",
    country: "USA",
  },
  "towing capacity": "5,952 lbs",
};
```

As you can see we use key/value pairs. Actually it's a little different from C# for instance we used colons (`:`) instead of equals (`=`) but generally the syntaxes are similar. In some case you may see the name is embedded in quotes, it's optional but if you're using any reserved characters like space, in this case, you need to surround the name with quotes (like `towing capacity`).

These dynamic objects that you have defined with this name value pairs allows you to take these objects you are creating and access each the properties you have defined in that name value pair by the name using a simple dot syntax. For example here in JavaScript you can just access the name using dot name convention:

```js
var name = car.name;
```

You can also use a bracket syntax, that's why objects are sometimes called associative arrays:

```js
var name = car["name"];
```

This way we can retrieve or set the property values. There are other ways for accessing and retrieving property value that are as follows:

```js
car.color = "Dot syntax";
car["towing capacity"] = "String with space";
car[str] = "String value";
car[rand] = "Random Number";
car[obj] = "Object";
car[""] = "Even an empty string";
```

We can also get embedded objects that are the properties of those dynamic objects as well and retrive properties from them:

```js
var manufacturer = car.manufacturer;
var name = manufacturer.name;
var country = manufacturer.country;
```

###Malleability
As you probably know, One of the key features of JavaScript is that the language is [loosely typed](http://blog.jeremymartin.name/2008/03/understanding-loose-typing-in.html) it means that variables are declared without a type. So the objects that you are creating in this way are very malleable. In C# `ExpandoObject` gives you this behavior.

> ExpandoObject Represents an object whose members can be dynamically added and removed at run time.

For example in this code we are creating a new object and marking it as dynamic so that we can add members to this `ExpandoObject` as we want:

```csharp
dynamic car  = new ExpandoObject();
car.Name = "Chevrolet Corvette";
car.Color = "Red";
```

These are being added on-the-fly. It means that these aren't defining the shape ahead of time. We are just saying we are going to add properties to the `car` object. In fact this is pretty much the same way in JavaScript:

```js
var car = {
  name: "Chevrolet Corvette",
  color: "Red",
};
```

We can still add another property or function on-the-fly:

```js
car["towing capacity"] = "5,952 lbs";
car.model = function () {
  var s = this.name;
};
```

Resourses:

<ul>
    <li><a href="https://pluralsight.com/courses/js4cs
">JavaScript for C# Developers by Shawn Wildermuth</a></li>
    <li><a href="https://mauricebutler.wordpress.com/2011/11/07/getting-started-with-javascript-with-a-c-background/">Getting started with JavaScript with a C# background</a></li>
    <li><a href="https://dzone.com/articles/javascript-c-developers">JavaScript for C# Developers: Functions are Objects</a></li>
</ul>
