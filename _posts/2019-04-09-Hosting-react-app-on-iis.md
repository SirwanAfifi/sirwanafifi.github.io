---
layout: post
title: Hosting React app on IIS
tags: React.js Routing IIS
---

Today I wanted to host a React application; the first and easiest option was hosting the app using a package called [serve](https://github.com/zeit/serve) which is basically a static file serving tool. The process was easy, all I had to do was first prepare a production build of my application using `npm run build` then run the `npx serve` command inside my build's directory:

```js
cd build
serve -s
```

This is great but the problem is that my application is using React Router and when I wanted to navigate between pages I got `404` error:

<img class="center-image" src="/public/img/react-serve-404" alt="React App 404" width="700">

based on the officail React docs:

> If you use routers that use the HTML5 pushState history API under the hood (for example, React Router with browserHistory), many static file servers will fail. For example, if you used React Router with a route for /todos/42, the development server will respond to localhost:3000/todos/42 properly, but an Express serving a production build as above will not. This is because when there is a fresh page load for a /todos/42, the server looks for the file build/todos/42 and does not find it. The server needs to be configured to respond to a request to /todos/42 by serving index.html

So I decided to host the app on IIS and define a URL rewrite to redirect all unknown paths to `index.html`. URL Rewrite isn't installed by defualt so you must [install](https://www.iis.net/downloads/microsoft/url-rewrite) it if you haven't already. Here's what I did to host my React application:

1- Adding a new website on IIS

<img class="center-image" src="/public/img/create-website-react-app" alt="Create website on IIS for React app" width="700">

2- Adding the following rule to URL rewrite:

<img class="center-image" src="/public/img/url-rewite-ui" alt="URL Rewrite UI" width="700">

As you know, this configuration is also saved in somewhere else which is the location of the newly created website inside a file called `web.config`, So this means that what we created in the UI is generated into this XML file. If we open up the file, we can see the following configuration:

```xml
<?xml version="1.0"?>
<configuration>
    <system.webServer>
        <rewrite>
            <rules>
                <rule name="React Routes" stopProcessing="true">
                    <match url=".*" />
                    <conditions logicalGrouping="MatchAll">
                        <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
                        <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
                    </conditions>
                    <action type="Rewrite" url="/index.html" />
                </rule>
            </rules>
        </rewrite>
    </system.webServer>
</configuration>
```

The critical part is inside the `rules` tag. The tag name is an arbitrary string you can change it to whatever you want, and then we have a pattern `.*` Which means everything using regular expression syntax, then we have our rules, we are basically saying if the input contains a file name or a directory name at the end of URL, an action occurs in this case the action is redirecting to `index.html`. You might be wondering why I set `stopProcessing="true"`, by setting this flag to true it will stop the processing of further rules, and the request will be passed to the IIS request pipeline. Now the unknown paths are handed off to the client side router, and the rest is history.
