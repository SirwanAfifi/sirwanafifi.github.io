# How I Use Back Tap and Shortcuts to Capture Info on My iPhone

iPhone has a hidden gem called Back Tap within its Accessibility features that I've found incredibly useful. As someone who values productivity and believes that a day without learning is a day lost, I've developed a workflow that transforms passive social media consumption into active knowledge capture.

- Published: 2025-03-16
- Language: en
- Tags: AI, LLM, Notes, Obsidian, Productivity
- Canonical: https://sirwan.info/blog/en/how-i-use-back-tap-and-shortcuts-to-capture-info-on-my-iphone

---

iPhone has a hidden gem called Back Tap within its Accessibility features that I've found incredibly useful. As someone who values productivity and believes that a day without learning is a day lost, I've developed a workflow that transforms passive social media consumption into active knowledge capture.

## The Social Media Time Trap

I’m big on productivity, and I believe that a day without learning is a day wasted. So, I find mindless scrolling incredibly frustrating. At the end of the day, what have you actually learned? Nothing. Whether it’s Instagram, X (Twitter), Mastodon, or BlueSky, they all have different algorithms but the same goal: keep you scrolling.

But instead of letting these platforms control me, I figured I’d flip the script. The other day, while at the gym listening to a podcast, I had an idea, what if I could make my time on social media actually useful? Instead of just consuming content passively, I wanted to capture interesting stuff and learn from it in a way that I control.

## My Setup: Turning Scrolling Into Learning

So back to the feature I wanted to share with you, Back Tap.

> With Back Tap in iOS 14 or later, a quick double- or triple-tap on the back of your iPhone can open Control Centre, take a screenshot, trigger accessibility-specific actions and more.

<img src="/img/iphone/iphone-back-tap.webp" alt="Back Tap" />

Nice, isn’t it? But how can we use this feature to our advantage? The answer lies in the last part of that sentence: "trigger accessibility-specific actions." This is where we can set up a custom shortcut!

## My workflow is pretty simple:

<img src="/img/iphone/AppleShortcut.png" alt="Back Tap" />

1. When I come across interesting information while browsing, I double or triple tap the back of my iPhone to trigger an action using Back Tap.

2. This triggers an Apple Shortcuts automation (by the way, I use Apple Shortcuts for most of my automated tasks).

3. The shortcut takes a screenshot using the built-in screenshot API.

4. It then sends the screenshot to the text extraction API, which pulls all text from the image.

5. The extracted text is sent to ChatGPT or Claude, which summarises it into a concise "Today I Learned" (TIL) paragraph.

6. Finally, the summary is automatically stored in my Obsidian Vault within my daily note.

<img src="/img/iphone/result_automation.png" alt="Example of a screenshot and summary" />

## Hands-Free Mode: Just Say “Nice”

To make things even more accessible, I configured a voice activation. Now, whenever I say “Nice”, the same shortcut runs, no tapping needed!

<img src="/img/iphone/vocal_shortcuts.jpeg" alt="Vocal Shortcuts" height="400" />

## Why This Workflow is a Game-Changer

This setup has been a game changer for me over the past two weeks. Instead of mindlessly consuming content, I’m actively capturing valuable information and integrating it into my knowledge system. It transforms what could have been wasted time into productive learning moments.

## What About You?

What productivity hacks have you developed to make better use of your time on social media? I'd love to hear your thoughts in the comments!
