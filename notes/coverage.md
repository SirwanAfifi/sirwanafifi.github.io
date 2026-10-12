# About the X archive — Sirwan Afifi

1,833 posts from 2012-01-17 to 2026-10-02, captured on 2026-10-08 using the X API. This is a saved snapshot, not a live feed.

The website displays standalone posts. Replies and reposts are excluded from the timeline, search, and individual entry pages. Each displayed post has its own page and an original Markdown copy with any captured conversation context. Images and videos remain links to X; no media files were included in the source archive.

[Search the notes](https://sirwan.info/notes/) · [Browse every post](https://sirwan.info/notes/archive/1/)

## Gaps and caveats


- **About 111 posts fewer than the profile count.** Search and the timeline agree almost exactly for 2014 onwards (1 difference in 3141 posts). The profile counter usually includes posts that were later deleted, or that X no longer serves (for example, reposts of posts that are now deleted or protected). As a spot check, 7 of your posts that other people's replies point to, but that no query returned (2012–2015), were looked up by ID. All 7 came back "Not Found", meaning they were deleted. Some of the gap may also be 2012–2013 posts that search misses, but nothing can check that period.
- **Replies are incomplete.** Replies from accounts that are deleted, suspended, or protected are not returned by the API. 2015–2019 have few replies. Conversation search returns nothing before 2017, so replies before then come only from the `to:` search, which only catches replies addressed to you.
- Replies are threaded under your post when their reply chain leads back to it. A reply to your post inside someone else's thread appears under that post of yours. The rest of that other thread is not included.
- Views (`impression_count`) are 0 for older posts because X does not report views for them.
- In-reply-to and quoted posts show "text not available" when the API did not return the original (deleted or protected).


