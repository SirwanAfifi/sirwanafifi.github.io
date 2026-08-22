# Sending Code from VS Code to Obsidian

A small VS Code extension that sends code snippets directly into your Obsidian vault

- Published: 2025-05-26
- Language: en
- Tags: AI, LLM, Notes, Obsidian, Productivity, Vibe Coding
- Canonical: https://sirwan.info/blog/en/weekend-project-code-clipper

---

If you’ve seen [how I use Obsidian to publish blog posts](https://sirwan.info/blog/en/how-i-use-obsidian-to-publish-posts/), you know I care a lot about smooth workflows. One gap I kept running into: there wasn’t a great way to quickly save bits of code—bugs, TODOs, oddities, or just thoughts—straight from VS Code into my notes.

So this weekend, I finally built what I needed: [**CodeClipper**](https://marketplace.visualstudio.com/items?itemName=SirwanAfifi.obsidian-clipper), a small extension that sends code snippets from VS Code directly into my Obsidian vault.

![CodeClipper in action](/img/obsidian/ObsidianClipper.png)

---

## The Problem

I’m often jumping between writing code and jotting down ideas. Copying a snippet, switching to Obsidian, creating a note, pasting it in, adding some context, then figuring out what file or branch it came from, it’s too much friction for something I want to do in a few seconds.

---

## What CodeClipper Does

With CodeClipper, you just:

- Select code in VS Code
- Hit a shortcut
- Fill out a small form (optional: add a description, tag it, set priority)
- Done. A clean, timestamped note lands in your vault with all the metadata: file path, repo, branch, author (via `git blame`), etc.

You can configure your vault name, default folder, and tag presets. It even opens the note automatically if you want to edit further.

PS: You can also use GitHub Copilot to generate the description for you, which is a nice touch.

<iframe width="560" height="315" src="https://www.youtube.com/embed/jNEgQWvL9Yo?si=DC4SWhAbr_DoJxjW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

---

## Under the Hood

VS Code’s extension API is better than I expected intuitive and well-documented. Most of the time went into:

- Getting Git metadata reliably (and handling no-repo edge cases)
- Talking to Obsidian via its `obsidian://` URI handler
- Making the input form simple but flexible, using a webview

---

## Why It’s Helpful (At Least for Me)

I use this mostly for tracking “tech debt” moments—stuff I want to revisit but can’t fix right now. Before, I’d try to remember it or bury it in a `TODO`. Now, I can send it to Obsidian in under 10 seconds, and it’s waiting for me in my `tech-debt/` folder.

---

## Final Notes

This was one of those projects that scratched a very specific itch. I built it for myself, but if you use VS Code and Obsidian together, it might save you a lot of friction too.

Here's the [GitHub repo](https://github.com/SirwanAfifi/code-clipper.git) if you want to check it out or contribute.
