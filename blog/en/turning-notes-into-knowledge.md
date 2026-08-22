# Turning Notes into Knowledge

Taking notes is essential for learning and retaining information, but without regular review, those notes lose their value. Over time, I’ve discovered that how you revisit and engage with your notes matters just as much as taking them.

- Published: 2025-01-12
- Language: en
- Tags: Tech Talks, Notes, Obsidian
- Canonical: https://sirwan.info/blog/en/turning-notes-into-knowledge

---

Taking notes is essential for learning and retaining information, but without regular review, those notes lose their value. Over time, I’ve discovered that how you revisit and engage with your notes matters just as much as taking them.

<figure>
<img src="/img/turning-notes-into-knowledge.jpeg" class="m-auto w-1/2" alt="Turning Notes into Knowledge" />
</figure>

I have been taking notes for quite some time, and the issue with dumping information is that you need to find a way to review and retrieve your notes; otherwise, there’s no point in taking them. The tool I use is [Obsidian](/blog/en/how-i-use-obsidian-to-publish-posts), which has some extensions for reviewing notes using the Spaced Repetition System. For years, I had been using [Quiver](https://yliansoft.com) as my go-to note-taking tool, where I had built a fully automated system for retrieving information. I had developed a system on top of it to easily retrieve my notes. If you're using it, I had some tweets about it, they are in Farsi, but you can get the idea by looking at the screenshots:

<blockquote class="twitter-tweet" data-conversation="none"><p lang="fa" dir="rtl">این روال رو توسط یه Cron Job انجام میدم که همیشه آخرین نوت‌ها رو توی دیتابیس داشته باشم؛ از اونجائیکه همیشه روی macOS هستم و از Alfred زیاد استفاده میکنم، یک workflow ساده براش نوشتم که بتونم داخل دیتابیس نوت‌هام سرچ کنم و به سادگی در دسترس باشن (۳) <a href="https://t.co/GFd5GZRCp5">pic.twitter.com/GFd5GZRCp5</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1493846036326060035?ref_src=twsrc%5Etfw">February 16, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

However, based on my experience, the best way to review notes is to discuss them with someone else. My friend and I have started a habit of having bi-weekly tech talks where we discuss what we’ve learned over the past two weeks. This has been a great way to review notes and learn from each other. I highly recommend trying this with your friends or colleagues. The template I use for summarising my week is pretty simple (as you can see, I've used [Dataview](https://blacksmithgu.github.io/obsidian-dataview/) to query my notes and sort them by date):

````md
# MM DD - MM DD

[[Journal/Weekly/YYYY-WWW | ← Previous Week]] | [[Journal/Weekly/YYYY-WWW | Next Week →]]

```dataview
TABLE
FROM #daily
WHERE file.cday >= date(today) - dur(7 days)
SORT file.cday
```

## Things I Learned

- One
- Two
- Three
````

At the end of the day, reviewing your notes shouldn’t feel like a chore. Whether through tools like Obsidian or meaningful conversations with others, finding a method that keeps you engaged makes all the difference. Give it a try, you might be surprised by how much more you retain and learn 🙂.
