---
layout: post
title: Why AngularJS?
tags: Angular.js JavaScript
---


I wanted to share a few thoughts about AngularJS

### Introduction
AngularJS is a MV* framework for writing manageable, clean, full-featured applications in the browser with JavaScript , It's also incredibly easy to learn for those who already have HTML and JavaScript experience. Angular's goal was to create a way for designers to be able to do HTML design using components. One thing that I like about Angular is that, it's an opinionated MV* framework, It means that it tells you what are the certain ways of doing things, Some people might argue that it's somehow a limitation for a framework such as Angular because it solves fewer problems, but I think at least it assures to not having spaghetti code.

### How I got into AngularJS
I have been sitting on the fence for far too long to chose a great JavaScript framework. Finally a couple of years ago I decided to use AngularJS and it caught my attention. It actually made me cursious to learn more about it. I started to use AngularJS for some parts of my application. At the time Angular team were working on the next version of the framework So I stopped using it because I heard that the next version is a different framework. Now I have come to conclusion that it's better to stick with Angular 1.x, then I can switch to Angular 2 in a right time.

### AngularJS Benefites
Angular has lots of great features from testability and two-way binding, to more vague concepts. For me the best thing about Angular is that it has a flat learning curve So you can get the most of it. All being said here are the some of my favorite features and benefits of Angular:

- Code Reduction: Angular reduces the amount of code that developers write.
- Two Way Binding
- Beautiful syntax and higher level APIs

For example take a look this piece of code written in raw JavaScript:

{% highlight js %}
document.getElementById('btn')
.addEventListener('click', function(el) {
    alert('clicked!');
});
{% endhighlight %}

Whereas with Angular you can simple achieve same goal this way:

{% highlight js%}
<button id="btn" ng-click="handleClick()">Click Me</button>

$scope.handleClick = function() {
    console.log('clicked!');
}
{% endhighlight %}
As you can see the Angular code is less complex.

- Popularity  
- Testability  
  Angular was designed with testing in mind. So you can test any components of your application easily through both [unit testing](https://docs.angularjs.org/guide/unit-testing) and [end to end](https://docs.angularjs.org/guide/e2e-testing) testing. For unit testing you can use a component called [ngMock](https://docs.angularjs.org/api/ngMock) and for e2e testing you can use [Protractor](https://github.com/angular/protractor). It is worthwhile to mention that for both cases you can run your tests using a tool called Karma.
    

### AngularJS gotchas
Although Angular is a great framework but it has some problems that you can run into trouble with it. Here are some of them:

- SEO  
  For dealing with this issue we can use server side rendering or use a [prerenderer](https://prerender.io/),
- Performance  
  One thing that causes performance problem in Angular is having too many bindings. If performance is important you can consider using a different rendering engine.
- External Events and Digest Cycle

### Conclusion
Even though Angular 2 is coming, But Angular 1 is still a thing and I think Angular 1 will be supported for a long time to come.