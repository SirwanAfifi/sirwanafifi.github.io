# A Weekend with Chrome AI

Building a Chrome extension to summarize web pages

- Published: 2024-10-26
- Language: en
- Tags: Browsers, LLM, AI, Obsidian
- Canonical: https://sirwan.info/blog/en/weekend-with-chrome-ai

---

I've been a big fan of LLMs, and I believe they're not here to replace programmers but to turn them into 10x engineers. I’ve spent plenty of weekends working on interesting projects to "make my life easier" and, as a programmer, I’m always looking to automate stuff as much as possible ([+](https://sirwan.info/blog/en/OS-Notification/), [+](https://sirwan.info/blog/en/different-ways-of-adding-your-signature-on-a-pdf/)).

Previously, my main tools were (still are) PowerShell (which I particularly love and have blogged about in [Farsi](https://www.dntips.ir/posts-writers/%D8%B3%DB%8C%D8%B1%D9%88%D8%A7%D9%86%20%D8%B9%D9%81%DB%8C%D9%81%DB%8C) – I should probably blog more about it) and Bash. Now, with the addition of LLMs, I’m working faster than ever, and they’ve perfectly matched my needs.

For anyone new to the field, this stuff can feel a bit intimidating. But if you focus on the fundamentals first, then come back to these AI tools, they’ll make you insanely fast at getting things done. You end up fine-tuning and quality-checking LLM responses before pushing them into production, adding that crucial human touch. And when that human is a senior engineer, the results are even better.

Long story short, I love working with AI and LLMs, so for this weekend project, I decided to boost my productivity a bit by building a Chrome extension. One of my daily tasks is journaling, and I read a lot of blog posts from various sources. Web clipping is essential for me; I have several methods for it, moving the text to my note-taking app (Obsidian 🦄). And I thought, why not add an extra step? Before clipping something, I could use Chrome's built-in model to summarise the text before sending it to my Obsidian vault. So, I sat down for a few hours, built it, and rewarded myself with a good dose of dopamine and a long walk outside 😄.

![alt text](/img/chromeai/chrome-extension-ai-assistant-sirwan.png)

It uses the same API I used in my previous blog post, [Local AI Models in Browsers (Chrome Canary)](https://sirwan.info/blog/en/local-ai-models-in-browsers/):

```tsx
const handleSummarize = useCallback(async () => {
  // other code
  const summariser = await window.ai.summarizer.create();

  const prompt = `Create a concise summary of the following text. Key points:
- Focus on the main ideas and key takeaways
- Skip any code blocks, technical snippets, or implementation details
- Keep technical terms if they are essential to understanding the content
- Maintain the original tone (technical, educational, conversational, etc.)
- Summary should be 2-3 sentences for short texts, or up to 5 sentences for longer ones
- If there are important warnings, limitations, or prerequisites, include them`;

  const stream = await summariser.summarizeStreaming(`
      ${prompt}
      ${editableText}
    `);
  for await (const chunk of stream) {
    setDisplayText(chunk);
  }
  // other code
}, [editableText]);
```

Once the text is genrated I can use a save button:

![chrome_ai_extension_save_to_obsidian_button](/img/chromeai/chrome_ai_extension_save_to_obsidian_button.png)

To send it to my Obsidian vault, the result looks like this:

![obsidian_ai_clipper](/img/chromeai/obsidian_ai_clipper.png)

Make sure to check out my previous blog posts on this topic:

- [Local AI Models in Browsers (Chrome Canary)](https://sirwan.info/blog/en/local-ai-models-in-browsers/)
- [Beyond Titles, Embracing Data Analysis in Every Tech Role](https://sirwan.info/blog/en/beyond-titles-embracing-data-analysis-in-every-tech-role/)
- [Programmers and LLMs](https://sirwan.info/blog/en/programmers-and-llms/)
