# Fixing my Hevy workout history

How a conversation with Mahdi led to a small Python tool for correcting my workout history without losing the original data.

- Published: 2026-10-05
- Language: en
- Tags: Python, Automation, Hevy
- Canonical: https://sirwan.info/blog/en/fixing-hevy-workout-history

---

A conversation with my friend [Mahdi](https://mahdi.uk/) made me revisit how I was logging weights in Hevy. For dumbbell exercises, I had entered one dumbbell's weight and wanted to track the combined weight.

I used a small Python tool with [Hevy's public API](https://api.hevyapp.com/docs/) to update my history. The initial request included two rules:

```text
dumbbell: recorded weight × 2
standard barbell: recorded weight × 2 + bar weight
```

After applying them, I realised the barbell assumption was wrong: those entries already included the bar and plates on both sides. Applying the formula again had inflated correct values.

The backup made this recoverable. We restored the exact original barbell weights while keeping the dumbbell corrections. Machines, cables, specialty bars, and other exercises stayed unchanged. These rules depend on how the original entries were logged; they are not a general recommendation for everyone using Hevy.

The tool separates planning from applying: save the original history, review each proposed change, then check every workout before writing and fetch it again afterward. A journal supports resuming the same run without applying changes twice.

For the restoration, we also saved the current history and compared it with the expected result of the first update. Only the affected barbell weights were replaced, and the final comparison checked the full history, including untouched workouts.

One API detail needed care: reads omitted workout visibility. I confirmed the existing settings so updates could supply them explicitly. The API could not independently verify visibility afterward. We also allowed a confirmed catalogue-name refresh while checking other fields strictly.

The lesson for me was to review the assumptions as carefully as the calculations. A successful API update can still apply the wrong rule.

The code and setup instructions are on GitHub: **[hevy-weight-correction](https://github.com/SirwanAfifi/hevy-weight-correction)**. My API key, workout exports, backups, and run reports stayed local.
