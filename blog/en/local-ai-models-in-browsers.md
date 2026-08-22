# Local AI Models in Browsers (Chrome Canary)

Browsers and operating systems are increasingly expected to have access to language models. This could really boost productivity, making tasks like translation and summarisation a lot easier.

- Published: 2024-09-09
- Language: en
- Tags: AI, Browsers, Gemini Nano
- Canonical: https://sirwan.info/blog/en/local-ai-models-in-browsers

---

Browsers and operating systems are increasingly expected to have access to language models. This could really boost productivity, making tasks like translation and summarisation a lot easier. as you probably know Apple has been trying to bring AI models into their devices using [Apple Intelligence](https://www.apple.com/uk/apple-intelligence/).

<img src="https://www.apple.com/newsroom/images/2024/06/introducing-apple-intelligence-for-iphone-ipad-and-mac/article/Apple-WWDC24-Apple-Intelligence-hero-240610_big.jpg.large_2x.jpg" alt="Apple Intelligence" />

Google, on the other hand, is adding a local LLM ([Gemini Nano](https://deepmind.google/technologies/gemini/nano/)) directly into its web browser; **It's quite <u>experimental</u> at the moment (it's behind some flags and you have to enable them)** but it's a big step forward.
For us developers, this means we can build even better front-end experiences with almost no latency when getting results from the LLM. For instance, you could type in English and get real-time translations into other languages. With language models baked into browsers, there’s no need to rely on external API calls to OpenAI, Google Gemini, or others. As browsers start to natively support local LLMs pre-installed within them, this opens up a whole new world for web developers. Of course, remote LLMs still let us fine-tune models and do advanced things like RAG. Right now, the local version of Google Gemini which comes with Google Canary/Dev is a bit limited, it has smaller context windows and fewer tokens. I think in the future, we might be able to do those advanced RAG-like tasks locally as well.

<figure>
  <img src="https://developer.chrome.com/static/docs/ai/built-in/chrome-ai-infra_1920.jpg" alt="" >
  <figcaption class="text-center">This diagram demonstrates how your website or app can use task and exploratory web platform APIs to access models built into Chrome.
 <a href="https://developer.chrome.com/docs/ai/built-in">Buit-in AI</a>
  </figcaption>
</figure>

You might be wondering why we even need this on-device AI and why it's so important. The main reason is privacy. When handling sensitive data, we don’t want to expose that information to remote LLMs. This is especially crucial for industries like healthcare, where keeping patient data secure is a top priority. With on-device LLMs, we can ensure that data never leaves the device. This is a big win for privacy and security.

<svg class="inline-block fill-white" width="18" height="18" viewBox="0 0 18 18"><path d="M15.78,13.39L11,7V4h2V2H5v2h2v3l-4.9,6.53c-0.34,0.47-0.39,1.1-0.12,1.62C2.24,15.67,2.77,16,3.36,16h11.28 c0.86,0,1.56-0.7,1.56-1.56C16.2,14.04,16.03,13.67,15.78,13.39z" fill="%2380868b"/></svg> This **experimental** feature gives us a set of utility methods under the `ai` namespace to interact with the local LLM (Gemini Nano):

<img src="/img/chromeai/ai_namespace.png" alt="AI namespace" />

Working with the local LLM is a bit tricky, as it only works on Chrome Canary or Dev. You must enable some flags:

```
chrome://flags/#optimization-guide-on-device-model (set to "Enabled BypassPerfRequirement")
chrome://flags/#prompt-api-for-gemini-nano (set to "Enabled")
```

Then install the modal:

<img src="/img/chromeai/chrome_components.png" alt="Chrome Component" />

The project I am working on is a simple eshop that uses the LLM to generate reviews for products and summarise them. Here's a quick demo:

- Writer API:

<iframe width="560" height="315" src="https://www.youtube.com/embed/aBpOJgAdxWM?si=viZXt6YMC_x4Pc0a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

- Summarisation API:

<iframe width="560" height="315" src="https://www.youtube.com/embed/4ZKLe4OVJnM?si=OoUXbKfPnutqse6I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Both APIs are quite simple to use:

```tsx
const handleGenerateReview = async () => {
  try {
    const writer = await window.ai.writer.create();
    const stream = await writer.writeStreaming(
      `Based on the following product details:

Title: ${product.title}
Description: ${product.description}
I have rated it ${newReview.rating} stars out of 5.

Please write a review reflecting this rating. Make sure to:

Mention the rating number explicitly in the review.
Tailor the tone to the rating given.
Include (must) a relevant emoji to match the overall sentiment.
Rating Guide:

1 star: Terrible 😡
2 stars: Bad 😞
3 stars: Average 😐
4 stars: Good 🙂
5 stars: Excellent 😍
      `
    );
    for await (const chunk of stream) {
      setNewReview((prev) => ({
        ...prev,
        content: "",
      }));
      setNewReview((prev) => ({
        ...prev,
        content: prev.content + chunk,
      }));
    }
  } catch (error) {}
};

export const ShowSummary = (props: ShowSummaryProps) => {
  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const generateSummary = async () => {
    try {
      setLoading(true);
      const summarizer = await window.ai.summarizer.create();
      const result = await summarizer.summarize(`
          Here is a list of customer reviews for the product:
          Reviews: ${props.context}
          Please:
          Summarise the key points and sentiments from these reviews.
          Provide a clear takeaway on whether the product is worth buying or not, based on the overall consensus.
          Make sure to highlight any recurring themes, positives, or concerns that are mentioned frequently.
          Result should be super concise in one paragraph. The result must be in markdown table format, add an hr before the table.
      `);
      setSummary(result);
      setLoading(false);
    } catch (error) {}
  };

  return (
    <Dialog
      open={props.isModalOpen}
      onOpenChange={() => {
        props.setIsModalOpen(!props.isModalOpen);
        generateSummary();
      }}
    >
      ...
    </Dialog>
  );
};
```

Personally, I think this is huge. It makes front-end development easier and gives users a smoother overall experience with great UX.

## References

- [Built-in AI](https://developer.chrome.com/docs/ai/built-in)
- [explainers-by-googlers/prompt-api: A proposal for a web API for prompting browser-provided language models](https://github.com/explainers-by-googlers/prompt-api)
- [WICG/translation-api: A proposal for a web translation API](https://github.com/WICG/translation-api)
