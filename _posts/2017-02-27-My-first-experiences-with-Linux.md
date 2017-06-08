---
layout: post
title: My first experiences with Linux
tags: Linux, Windows
---
Running Window 98 on my PC was my first experience with Windows. in fact, for the last 11 years or so, Windows has been the dominant operating system that I've been using. So, up until now, I have been an avid fan of Windows.  

> Disclaimer: I'm not going to say that I'm not interested in Windows anymore, I just want to explain my experience with Ubuntu


Windows just works fine for the most part. But, as a developer, I have always felt something is missing. For solving this problem, Microsoft has tried its best bringing in tools like PowerShell and Bash to Windows. But again, with all these great features and tools, as a developer, you think something is missing.


Two weeks ago, I decided to give Linux a try, So I chose Ubuntu because it's user-friendly and its community is huge. Actually, my goal was to do some experiments with new version of .NET called .NET Core. The experience was great. First, I created a very simple console application on Windows and deployed it as a [SCD (Self-Contained Deployment)](https://docs.microsoft.com/en-us/dotnet/articles/core/preview3/deploying/#self-contained-deployments-scd):


<img width="800" src="/public/img/publish.jpg">


Then, I copied the publish folder on my USB stick and finally, I could run my .NET Core application without installing the .NET runtime on the target machine: 


<img src="/public/img/run_app.png">

As a .NET developer I have been waiting voraciously for such opportunity. So, I think it's the best time to migrate to Linux.

Actually, I was amazed at the first impression because Linux has everything a developer needs out of the box. Python is already installed on the OS. This is great because there are times you want to write simple scripts, scrap a page or something like that.

Other cool features of Linux are commands like [sed](https://www.gnu.org/software/sed/manual/sed.html) and [grep](https://www.gnu.org/software/grep/manual/html_node/index.html). These tools are great whether you are a developer or a network administrator. for example, suppose that you have following content within a file named `test.json`:

{% highlight csharp %}
{
   "AppName": "Simple App",
   "Website": "sirwan.info",
   "UseSqlite": false,
}
{% endhighlight %} 

Now you want to replace all occurrence of `"UseSqlite": false,` to `"UseSqlite": true,` you can do that simply by typing this command:

{% highlight csharp %}
cat text.json | sed 's/"UseSqlite": false,/"UseSqlite": true,/'
{% endhighlight %} 

<img src="/public/img/sed_command.png">

You can definitely do wide varaity of things using these tools, I just wanted to tell you how much I am excited about these cool stuff.

### Development on Ubuntu
The good news is that .NET Core runs on Windows, Mac and Linux. In order to install .NET Core on Ubuntu you just simply need to navigate to [dot.net](https://www.microsoft.com/net/download) site and download the appropriate version. after installing .NET Core, it gives you a CLI called `dotnet` so you can simply create, build and publish your applications using this command, for example:
{% highlight csharp %}
dotnet new
dotnet restore
dotnet run
{% endhighlight %}
You can also use the editor of your choice for developing .NET Core application, personally I prefer to use [Visual Studio Code](http://code.visualstudio.com/) or VSCode for short. because it has all great features you need:

<img src="/public/img/vscode.png">


VSCode is great, But I think using an IDE like Visual Studio gives you the power you need when are developing applications, Unfortunately, there's no official version of Visual Studio for Linux at this time. I hope Microsoft release it for Linux users The only reason that I can't abandon Windows is the lack of Visual Studio So I have to keep using Windows on my main machine.

### Conclusion
As I mentioned Visual Studio is the only reason to not completely abandon Windows, But I will use Ubuntu for sure. This was my first attempt to use Ubuntu and I am very happy about the experience, I would like to hear your ideas about your journey.  

Happy Coding :))