# Chrome’s Decisions API: A Semantic If for the Browser

Chrome is exploring a Decisions API for fast, local decisions over text. A follow-up to my experiments with local AI models in the browser.

- Published: 2026-10-05
- Language: en
- Tags: AI, Browsers, JavaScript
- Canonical: https://sirwan.info/blog/en/chrome-decisions-api-semantic-if

---

Back in 2024, I wrote about [Local AI Models in Browsers](https://sirwan.info/blog/en/local-ai-models-in-browsers/) and later built [a Chrome extension](https://sirwan.info/blog/en/weekend-with-chrome-ai/) to summarise pages before saving them to Obsidian. What interested me was doing useful work locally, without sending the text to a remote LLM.

Chrome’s team is now exploring a [Decisions API](https://github.com/explainers-by-googlers/decisions-api), described as a [**“Semantic If”**](https://www.mail-archive.com/blink-dev@chromium.org/msg17639.html). The idea is to score predefined answers locally in one pass, without generating text token by token. Think checking whether a bug report contains reproduction steps, or suggesting a category for a support request.

A keyword check for `"steps"` would accept “I don’t know the steps” and miss “Open Settings, choose Dark Mode, then reload.” We care about the meaning of the report. With the proposed API, that check could look like this:

**This is illustrative syntax. As of 5 October 2026, the API is an early proposal and has not been approved to ship.**

```js
const reportChecker = await DecisionModel.create({
  context: "Software bug report form",
  questions: [
    {
      id: "has_steps",
      type: "boolean",
      prompt: "Does the report describe actions that reproduce the problem?",
    },
  ],
});

try {
  const { has_steps } = await reportChecker.decide("The page is broken.");

  if (has_steps.label === "false" && has_steps.confidence > 0.8) {
    console.log("Could you add the steps to reproduce the issue?");
  }
} finally {
  reportChecker.destroy();
}
```

The proposed boolean labels are strings, hence `"false"`. The `0.8` threshold is just an example to evaluate with real reports; it doesn’t guarantee 80% accuracy. I’d use this for optional hints and keep the form working when the model is uncertain or unavailable. Feature detection and model download handling are omitted here.

Chrome’s [Prompt API already supports structured output](https://developer.chrome.com/docs/ai/prompt-api). What interests me about Decisions is the prospect of making these small checks faster and cheaper to run. For my Obsidian clipper, I’d like to try suggesting whether a page belongs with tutorials, reference material or opinion pieces.

One related update: Chrome is [proposing to sunset the experimental Writer and Rewriter APIs](https://groups.google.com/a/chromium.org/g/blink-dev/c/k80to1ZlrbY) in favour of the Prompt API. The Early Preview Program consultation runs through **23 October 2026**; that’s a feedback deadline, not a removal date. My original post’s API examples reflect the experiments available in 2024.
