# Web Server Logs

An important part of managing software applications effectively is keeping logs, because they provide information about the server's performance and activity and can indicate any issues. An application's behavior has to be analyzed in order to track events and debug any issues...

- Published: 2021-07-20
- Language: en
- Tags: Web Server, Nginx, Logging
- Canonical: https://sirwan.info/blog/en/web-server-logs

---

<figure>
  <img src="/img/web-server-logs.jpeg" alt="Web Server Logs" />
  <figcaption class="text-center">Photo by <a href="https://unsplash.com/@clemono?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Clem Onojeghuo</a> on <a href="https://unsplash.com/s/photos/searching?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </figcaption>
</figure>

An important part of managing software applications effectively is keeping logs, because they provide information about the server's performance and activity and can indicate any issues. An application's behavior has to be analyzed in order to track events and debug any issues.
In order to achieve this goal, I was given the task to implement logging into our applications. Our company has several applications, so adding an application log to them all wasn't a good idea. Although We have application level logs in some parts of our systems, but our goal was to centralize them so that we would have easy access to them. It could have been done with application code, but I would have had to change the codebases elsewheres. Hence, I decided to use our web server for the job. By default, Nginx provides out of the box logging which can be enabled with a few lines of code in the config file. `Error` and `Access` logs are the two types of logs in Nginx. Using the first one, you can track anything unexpected that happens. However, I was particularly interested in the second one, which logs all requests to the server as its name suggests. Nginx's logging functionality is enabled by default, so it does not require you to install third-party modules to make it available.

```js
events {}

http {
  server {
    listen 80;

    access_log /sites/files/log.txt;
    error_log /sites/files/error_log.txt;

    location / {
      return 200 "Hello World!";
    }
  }
}
```

By default, the format of the entry in the log file is as follows:

```js
172.17.0.1 - - [21/Jul/2021:07:24:53 +0000] "GET / HTTP/1.1" 200 12 "-" "Mozilla/5.0...."
172.17.0.1 - - [21/Jul/2021:07:25:03 +0000] "GET / HTTP/1.1" 200 12 "-" "Mozilla/5.0...."
172.17.0.1 - - [21/Jul/2021:07:25:05 +0000] "GET /404.html HTTP/1.1" 200 12 "-" "Mozilla/5.0...."
172.17.0.1 - - [21/Jul/2021:07:25:05 +0000] "GET /favicon.ico HTTP/1.1" 200 12 "http://localhost:9091/404.html" "Mozilla/5.0...."
```

Additionally, we can disable logging for certain requests. For example, let's say we do not want to log the `/admin` request:

```js
location /admin {
  access_log off; // highlight-line
  return 200 "Admin page";
}
```

Our logs should be stored slightly differently by adding more information to them, such as the full name of the user. We had a bit of a challenge to figure this out since the only way to determine who sent the request was by decoding the authorization token. Here is what we wanted in the log file:

```js
remote_address - user_full_name - URL(request_uri) - time_local - user_agent;
```

However, customizing the log is pretty simple, all we need to do is define the format:

```js
events {}

http {
  log_format custom '$remote_addr - user_full_name - URL($request_uri) - $time_local - $http_user_agent'; // highlight-line

  server {
    listen 80;

    access_log /sites/files/log.txt custom; // highlight-line
    error_log /sites/files/error_log.txt;

    location / {
      return 200 "Hello World!";
    }
  }
}
```

`user_full_name` is the tricky part. The good news is that Nginx provides JavaScript support via `njs`. All we need to do is write our JavaScript logic (the syntax is limited to ECMAScript 5.1) inside a file and then invoke it from our configuration file. Within the function, we have access to `Request` and `Response` objects:

```js
// http.js
function jwt(data) {
  var parts = data
    .split(".")
    .slice(0, 2)
    .map((v) => Buffer.from(v, "base64url").toString())
    .map(JSON.parse);
  return { headers: parts[0], payload: parts[1] };
}

function jwt_payload_user(request) {
  try {
    var auth = request.headersIn.Authorization;
    return jwt(auth.slice(7)).payload.profile.fulleName;
  } catch {
    return "Anonymous";
  }
}

export default { jwt_payload_user };
```

We can then import the above file into our Nginx configuration and use it:

```js
load_module modules/ngx_http_js_module.so; // highlight-line

events {}

http {
  js_import /sites/files/http.js; // highlight-line
  js_set $user_full_name http.jwt_payload_user; // highlight-line

  log_format custom '$remote_addr - $user_full_name - URL($request_uri) - $time_local - $http_user_agent'; // highlight-line

  server {
    listen 80;

    access_log /sites/files/log.txt custom;
    error_log /sites/files/error_log.txt;

    location / {
      return 200 "Hello World!";
    }
  }
}
```
