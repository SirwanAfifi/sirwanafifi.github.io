# Fixing my Hevy workout history

How a conversation with Mahdi led to a small Python tool for correcting my workout history without losing the original data.

- Published: 2026-10-05
- Language: en
- Tags: Python, Automation, Hevy
- Canonical: https://sirwan.info/blog/en/fixing-hevy-workout-history

---

My friend [Mahdi](https://mahdi.uk/) pointed out an issue with how I was logging my gym weights: one dumbbell's weight for dumbbell exercises, and the plates on only one side for barbell exercises.

I wanted to update my existing history to the totals I intended to track. Rather than editing each workout manually, I worked with ChatGPT to build a small Python tool using [Hevy's public API](https://api.hevyapp.com/docs/).

The rules I chose were simple:

```text
dumbbell: recorded weight × 2
standard barbell: recorded weight × 2 + bar weight
```

I used a configurable 20 kg assumption for the standard bar. These rules reflect my requested migration, not a recommendation to double every dumbbell entry: the exercise and how you record reps matter. Specialty bars, machines, cables, and other equipment were left alone.

## Making the update safe

The script separates the work into three steps:

1. **Plan:** download a backup and generate the exact before-and-after weights for review. No updates yet.
2. **Apply:** check that the workouts still match the backup, update them, and fetch each result to verify it. A journal lets the same plan resume without doubling corrected weights again.
3. **Verify:** compare the entire original history, including untouched workouts, with the expected result.

There were a couple of surprises. The API did not return workout visibility, but its write schema documented a public default. We stopped until I confirmed the existing settings, then supplied them explicitly. A public profile alone was not enough: Hevy supports [individual private workouts](https://help.hevyapp.com/hc/en-us/articles/34461853165079-How-to-keep-my-information-private-Account-Single-Private-Workout-Remove-Social-Media-Features).

Later, Hevy refreshed an exercise's display name while keeping its ID. The strict comparison stopped the batch. After checking the response, we allowed only that exact, known catalogue-name refresh and resumed the original plan. Already-corrected workouts were skipped.

We verified one workout before the batch and checked the full history afterward. The final comparison passed, allowing only the planned weights, the catalogue-name refresh, and server-managed modification timestamps. Verification covers the fields the API exposes; visibility cannot be independently read back.

The code, setup instructions, and 31 synthetic tests are on GitHub: **[hevy-weight-correction](https://github.com/SirwanAfifi/hevy-weight-correction)**. My API key, workout exports, backups, and run reports stayed local.
