---
layout: post
title: Shahriban - My first Hackathon project (Challenges, Lesson Learned)
tags: Vue.js, JavaScript, Teamwork, SideProject
image: /public/img/shahriban_logo.png
---
<img class="center-image" src="/public/img/poster-hackathon.jpg" alt="Hackathon Event" width="700">
<span style="display: block; text-align: center;">*Image courtesy of [LiveH2H](http://www.liveh2h.com/media/liveh2h-announces-global-collaboration-hackathon-developer-event/)*</span>

As you probably know, Hackathon is an event that programmers, designers, entrepreneurs to get together for a short period of time to collaborate on a project. The cool part of this event is delivering tasks rapidly, In fact, it's more like a Marathon for programmers. I have never participated in a hackathon before but I always wanted to give it a try because it is something I have been wanting to do for a long time. Several weeks ago I had the opportunity to participate in such event with my friends [Sohail](https://sohailabbasi.com/) and [Arash](http://chirokydil.blogfa.com/) from [Kurdsoftware](http://www.kurdsoftware.com/) group. By the way, the event was not supposed to be like a competitive sort of events, We just wanted to do something. In this blog post, I am going to share challenges we faced over the course of the event.

### Challenge #1
The first challenge for us was picking a project to implement so we decided to brainstorm as many ideas as possible then we tried to write them down. At this point, we had a big picture of all potential ideas. At the end of the day we ended up to an interesting one, [Shahriban](https://shahriban.com/); the idea was to implement a platform for reporting local issues in a city. it's more like a collaborative culture, something a citizen should do but does not have to do, to make their community better. Our goal was to encourage citizens across our city to be involved in process of improving the city. You can read more about Shahriban here([English](https://sohailabbasi.com/shahriban-social-capital-iran/), [Persian](http://foad-ansari.ir/%d8%b4%d9%87%d8%b1%db%8c-%d8%a8%d8%a7%d9%86-%d9%86%da%af%d9%87%d8%a8%d8%a7%d9%86-%d8%b4%d9%87%d8%b1/), [Kurdish](http://chirokydil.blogfa.com/post/71)):

<img class="center-image" src="/public/img/shahriban_homepage.png" alt="Shahriban" width="700">

### Challenge #2
The next challenge after choosing the project was the technical side of it, Since we have different types of skills, we were not sure what language/platform to use to implement the project. we decided to keep it simple and follow [KISS principle](https://en.wikipedia.org/wiki/KISS_principle) and use something like Wordpress but the problem is that customizing Wordpress takes time and it's not simple as it sounds. So at the end, we decided to implement it from scratch so we picked PHP for the backend and Vue.js for the frontend. Sohail and Arash worked on the backend and used [php-crud-api](https://github.com/mevdschee/php-crud-api); a single file PHP script that adds a REST API to a SQL database, So at this point we had a fully fledged RESTful API and the process went very smoothly, we had everything at our disposal quickly. On the frontend, I picked Vue.js because getting up and running with Vue.js is really simple. So I used Vue CLI to generate the project. Over the course of 2 hours we had everything in place:

<img class="center-image" src="/public/img/shahriban_vue_project.png" alt="Shahriban" width="700">

### Challenge #3
The last challenge was to implement an app, Since Telegram is the most popular instant messaging app in Iran, we decided to develop a bot to do the job for us. This was really great because we didn't have to implement an app for Android, iOS:

<img class="center-image" src="/public/img/shahriban_screenshots.png" alt="Shahriban" width="700">

### Conclusion
The whole experience was really great, we learned a lot in the process and feel a lot more confident and prepared for future events.