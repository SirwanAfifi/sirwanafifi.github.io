# A Weekend with Swift

Every Friday night I try to do something to get my dopamine flowing to start my weekend. Programming is one of the things that does the work for me and increases my dopamine level so much that if I start focusing on something, nothing can distract me. I can keep going for hours after hours without feeling tired, which sometimes isn't good. We should definitely pay attention to our health and get out of the building to connect with real people instead of just sitting in front of the computer coding...

- Published: 2024-02-17
- Language: en
- Tags: swift, tvOS, apple, fun
- Canonical: https://sirwan.info/blog/en/a-weekend-with-swift

---

Every Friday night I try to do something to get my dopamine flowing to start my weekend. Programming is one of the things that does the work for me and increases my dopamine level so much that if I start focusing on something, nothing can distract me. I can keep going for hours after hours without feeling tired, which sometimes isn't good. We should definitely pay attention to our health and get out of the building to connect with real people instead of just sitting in front of the computer coding. Long story short, I had some ideas in mind that I was trying to convince myself which one makes me more excited. As I was juggling them, when I looked around at my room, I saw my old Apple TV and thought to myself, "Why not try to make a simple app for it?" 😃 I've never done anything for tvOS, and I thought it would be a good idea to try it out.

<blockquote class="twitter-tweet"><p lang="zxx" dir="ltr"><a href="https://t.co/zvoAj7TeFG">pic.twitter.com/zvoAj7TeFG</a></p>&mdash; Sirwan Afifi (@SirwanAfifi) <a href="https://twitter.com/SirwanAfifi/status/1519007773928923136?ref_src=twsrc%5Etfw">April 26, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

On this journey, [GitHub Copilot](https://medium.com/globant/boost-your-productivity-integrate-github-copilot-with-xcode-94a0ee74b961) helped a lot, as I'm less confident with Swift than with other languages( JavaScript/TypeScript, C#, PowerShell, and Golang). After deciding to make a tvOS app, I started to think about what kind of app I should make. I thought about the previous project I did over the last weekend, which I blogged about [here](/blog/en/programmers-and-llms). It's basically a website showing the latest Tesco products and their prices. I thought it would be a good idea to make a similar app for tvOS.

I installed everything I needed, and after a couple of hours, I had a simple app that shows the latest Tesco products and their prices. The backend is a tRPC server written in Bun (TypeScript). I've done quite a lot of WPF projects in the past, and I would say the experience felt quite similar. It uses the same MVVM pattern for the UI as WPF. The cool thing about SwiftUI is that the UI is the views are rendered as they will appear in the app:

 <img src="/img/swift-tvOS-xcode.png" alt="Swift tvOS xCode" />

Another one:
<img src="/img/swift-tvOS-mainscreen.jpg" alt="Swift tvOS main screen" />

And this one on my Apple TV:
<img src="/img/swift-tvOS-real-tv.jpg" alt="Swift tvOS Apple TV" />
