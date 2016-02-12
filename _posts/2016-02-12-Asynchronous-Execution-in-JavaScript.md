---
layout: post
title: Asynchronous Execution in JavaScript 
tags: JavaScript MVC
---
As you know browsers are typically single threaded, It means that the browser can only be doing either update the UI or executing JavaScript at any given time. It actually incapable of doing theme simultaneously.  


As I mentioned when JavaScript is executing code, the UI is unable to respond to the user. So, our goal as a developer is to build a highly responsive UI. For doing that you could create smaller unit of work and use JavaScript timers to return execution to the next event in the queue:

{% highlight js %}
function buffer(items, iterFn, callback) {
    var i = 0, len = items.length;
    setTimeout(function () {
        var result;

        for (var start = +new Date; i < len && result  
                    !== false && ((+new Date) 
                     - start < 50) ; i++) {
            result = iterFn.call(items[i], items[i], i);
        }

        if (i < len && result !== false) {
            setTimeout(arguments.callee, 20);
        } else {
            callback(items);
        }
    }, 20);
}
{% endhighlight %}
Assume that we want to pull down some data from the server, Then the data is going to be processed through an array loop, And we are going to build some DOM elements:
{% highlight js %}
@{
    ViewBag.Title = "Home Page";
}
<ul></ul>
@section scripts
{
    <script>
        $(document).ready(function () {
            $.get('@Url.Action("Date")', function (result) {
                var html = '';

                buffer(result, function (item) {
                    html += '<li>' + item + '</li>';
                }, function () {
                    $('ul').append(html);
                });
            });
        });
    </script>
}
{% endhighlight %}
Also the action method is like this:
{% highlight csharp %}
public JsonResult Date()
{
    var data = Enumerable.Range(0, 50000);

    return Json(data, JsonRequestBehavior.AllowGet);
}
{% endhighlight %}
The `buffer` method works like a charm but using `setTimeout` is considered to be a bad practice. So that's where the [Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers) come into play.



###Web Workers
[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers):   

> Web Workers provide a simple means for web content to run scripts in background threads. The worker thread can perform tasks without interfering with the user interface. In addition, they can perform I/O using XMLHttpRequest (although the responseXML and channel attributes are always null). Once created, a worker can send messages to the JavaScript code that created it by posting messages to an event handler specified by that code (and vice versa.) This article provides a detailed introduction to using web workers.

Well, Web Wrokers bring background threading to browsers. It is a best option if you have intense processing that needs to happen in your browser. Since Workers run in another global context so there's a few restrictions that you have to keep in mind, [Here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Functions_and_classes_available_to_workers) you can see the list of functions and classes available to Web Workers. So your favorite JavaScript library may not work with workers.  

So let's rewrite our example with Web Workers:

{% highlight js %}
<ul id="result">Hello</ul>
@section scripts
{
    <script>
        $(function () {
            var _worker;

            _worker = new Worker('@Url.Content("~/Scripts/getData.js")');
            _worker.addEventListener("message", messageHander, false);
            _worker.postMessage("fetch");

            function messageHander(e) {
                $("#result").html(e.data);
            }

        });
    </script>
}
{% endhighlight %}
As you can see I instantiated a worker, Then I setup an event listener for message, So when data comes in from the AJAX call, we will inject the result into html of a container called `result`.   
Here you see the worker:
{% highlight js %}
function messageHandler(e) {
    if (e.data === "fetch") {
        fetch();
    }
}

function fetch() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {

            var html = "";
            var res = JSON.parse(xmlhttp.responseText);
            for (var i = 0; i < res.length; i++) {
                html += '<li>' + res[i] + '</li>';
            }
            postMessage(html);
        }
    }

    xmlhttp.open('GET', '/Home/Date', false);
    xmlhttp.send();
}
addEventListener("message", messageHandler, true);
{% endhighlight %}
Inside the fetch content we used typical AJAX call because in Web Workers you can not use a third-party library it means that there's no access to non-thread safe components, So you have to use a native `XMLHttpRequest` in your worker. Now if you run the code you will see that now that's pretty fast even quite a bit faster than before.  

You can see the sample code [in the GitHub repository](https://github.com/SirwanAfifi/asynchronous-execution-in-js)