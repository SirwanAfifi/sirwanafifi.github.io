# Fixing my Hevy workout history with a small Python migration

A conversation with Mahdi turned into a Python tool for correcting workout weights, with backups, a reviewable plan, and verification.

- Published: 2026-10-05
- Language: en
- Tags: Python, Automation, Hevy
- Canonical: https://sirwan.info/blog/en/fixing-hevy-workout-history

---

This started with my friend [Mahdi](https://mahdi.uk/), who pointed out an issue with how I was recording my gym weights.

For dumbbell exercises, I had been entering the weight of one dumbbell. For barbell exercises, I had been entering the plates on one side, without including the other side or the bar itself. I wanted to correct the existing history, while leaving the rest of each workout alone.

The arithmetic was straightforward. Updating a history I cared about needed a little more thought.

I worked through it with ChatGPT and Codex, and the result is a small Python tool: [hevy-weight-correction](https://github.com/SirwanAfifi/hevy-weight-correction). The repository contains the tool and synthetic tests. My API key and workout data stayed local.

## Deciding what the numbers should mean

These were the rules I chose for this migration:

```text
dumbbell: recorded weight × 2
standard barbell: recorded weight × 2 + bar weight
```

For example, a hypothetical dumbbell entry of 10 kg becomes 20 kg. A hypothetical entry of 15 kg of plates on one side of a 20 kg bar becomes 50 kg.

The script works in kilograms, regardless of the units displayed in the app. The bar weight is configurable, with overrides for individual exercises. I used 20 kg as the assumption for a standard Olympic bar, rather than weighing the equipment myself.

There is a distinction here between a logging convention and a correction that everyone should run. Hevy Trainer's [equipment documentation](https://help.hevyapp.com/hc/en-us/articles/43572343844247-How-Hevy-Trainer-Settings-Work) describes combined weight for exercises that use two dumbbells. That does not mean every exercise involving a dumbbell should automatically be doubled. The exercise, number of dumbbells, and way reps were recorded matter. The tool implements the migration I requested; anyone reusing it needs to review whether those rules fit their own history.

## From a manual edit to an API migration

The Hevy connection available in my initial ChatGPT conversation could read workout history, but it did not provide an action for editing old sets. The first suggestion was to open each workout and edit it manually.

Hevy's [public API](https://api.hevyapp.com/docs/) provided another route: read the workouts, then update an existing workout with `PUT /v1/workouts/{workoutId}`. It requires a developer API key, available to Pro users through [Hevy's developer settings](https://hevy.com/settings?developer).

The first generated script already separated planning from applying. That was a useful starting point. Before running it against my account, we checked the actual API schema and strengthened the preservation checks.

One detail made this more involved than updating a single database column: the API expects a workout write payload. The script has to carry over the other exercises and set information while changing the selected weights. A missing note, superset, or set metric could therefore become an unintended edit.

## Download first, decide what to write second

The tool downloads all pages of workout history and the exercise templates. It checks the workout count, saves a backup, and creates a separate plan containing the exact old and new weights.

It also writes a CSV preview and a short summary. Planning sends no update requests.

The plan is tied to both the account and the backup. Before applying it, the script regenerates the expected corrections from that backup and checks that they match the saved plan. The first run directory is kept, rather than overwritten by another download.

This separation turned an instruction like “double my dumbbell weights” into a specific set of changes that could be inspected before anything was written.

## Equipment labels needed checking

The initial script assumed that EZ bars, Smith machines, and trap bars would always be identified by separate equipment categories. The schema did not support that assumption, and the data confirmed why it mattered: an EZ-bar exercise could be labelled simply as `barbell`.

The final version uses the exercise template's equipment metadata and checks for specialty-bar names before accepting an exercise as a standard barbell. EZ, Smith, trap, hex, and other recognised specialty bars are left alone. Explicit non-target equipment is never overridden just because an exercise title happens to contain a familiar word.

That still has limits. Metadata can be incomplete, and a custom exercise name cannot prove which physical bar somebody used. Missing equipment metadata blocks the run for review. The preview remains part of the workflow.

## The unexpected privacy question

The API's workout read response did not include `is_private`. Its write schema, however, documented a public default when that field was omitted.

A public profile was not enough to resolve this. Hevy allows [individual private workouts on a public profile](https://help.hevyapp.com/hc/en-us/articles/34461853165079-How-to-keep-my-information-private-Account-Single-Private-Workout-Remove-Social-Media-Features).

We stopped before applying the plan while I checked the visibility settings. Once the existing visibility of the affected workouts was confirmed, it was supplied explicitly in the update requests.

The script now refuses to update an affected workout without a known visibility value. It can preserve a value supplied by the user, but it cannot independently read that value back through an API response that does not expose it.

## Applying one workout, then the rest

Before the first write, every affected workout is fetched again and compared with the backup. This checks more than the weights: reps, set order, notes, exercise identities, and unrelated fields must still match. Each workout is checked once more immediately before its update.

We applied one workout first and fetched it back to verify the result. That also established that its routine link and supersets survived the update. Only then did we continue with the rest.

For every write, the script records a pending entry in a local journal, sends the update, fetches the workout again, and records the verified result. A request timing out does not automatically trigger another write. The same plan can be resumed after inspecting what the server actually saved.

This matters because a successful request and a received response are different things. If the server saved the update but the response was lost, calculating another correction from the new weight would double it again. Reusing the original plan means the script can recognise the already-corrected result and skip it.

## A mismatch that was worth stopping for

The batch did stop partway through.

Hevy had refreshed an exercise's display name to its current catalogue title. The exercise ID was unchanged, and every other checked field matched. Our comparison was strict enough to notice the name difference and stop.

We inspected the saved response before resuming. The new name exactly matched the template name captured in the original download. We then added a narrow allowance: for a corrected target exercise, its display name may become that exact known template name, provided its ID and all other expected fields still match.

That is the only name change the comparison allows. An arbitrary new title, a different exercise ID, or a title change in an untouched workout still fails verification. The accepted catalogue-name refreshes are recorded in the report.

After adding regression tests, we resumed the same plan. The tool recognised the completed updates and continued with the remaining workouts.

## Checking the entire history

The final pass fetched every original workout, including those that did not need a correction. It compared the corrected workouts with the planned result and the untouched workouts with the backup.

The verification passed. Beyond the planned weight changes, the recorded differences were Hevy's refreshed catalogue name and the server-maintained modification timestamps. Reps, notes, set types, supersets, routine links, and the other exposed workout fields were checked against their expected values.

There are practical limits to that claim. A backup made through the public API covers the data the API exposes. There is no documented conditional-write mechanism, so another edit between the final read and the write remains possible. I would avoid editing the same history while running a migration like this.

## Keeping the tool public and the history local

The public repository contains the Python source, example configuration, documentation, and tests built from invented workouts. It does not contain my workout export, account or workout IDs, correction plan, visibility mapping, journal, reports, or API key.

There are 31 simulated-API tests covering the formulas, preservation checks, privacy blockers, interrupted requests, repeated application, and the catalogue-name case. They do not contact Hevy.

The basic workflow is:

```sh
python3 fix_hevy_weights.py plan
# Inspect the saved plan and resolve any blockers.
python3 fix_hevy_weights.py apply --limit 1
python3 fix_hevy_weights.py apply
python3 fix_hevy_weights.py verify
```

The [repository README](https://github.com/SirwanAfifi/hevy-weight-correction#readme) covers configuration and credentials. These commands are for a new migration; after a run has started, continue using its original plan. Generating a fresh plan from already-corrected history would calculate another conversion.

Thanks to [Mahdi](https://mahdi.uk/) for starting this. A small observation about my gym log became a useful exercise in working with personal data: make the intended changes explicit, keep the original state, and be able to explain every difference afterward.
