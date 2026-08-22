# TIL: Gemini CLI Now Has Agent Skills

Gemini CLI now supports Agent Skills

- Published: 2026-01-01
- Language: en
- Tags: Gemini, CLI, AI, Agent Skills
- Canonical: https://sirwan.info/blog/en/gemini-cli-agent-skills

---

I was messing around with the [Gemini CLI nightly build](https://github.com/google-gemini/gemini-cli/releases/tag/v0.24.0-nightly.20251231.05049b5ab) and discovered it now supports **Agent Skills**. It's still experimental and you need to enable it in `~/.gemini/settings.json`:

```json
{
  "experimental": {
    "skills": true
  }
}
```

<blockquote data-title="Important">

You also need to make sure `previewFeatures` is enabled in your `~/.gemini/settings.json`:
```json
{
  "general": {
    "previewFeatures": true
  }
}
```
</blockquote>


Following the community standard, they go in either `~/.gemini/skills` or `./.gemini/skills` (project-level takes precedence). There's also a new `/skills` command to list/enable/disable them.

> It's probably a good idea to symlink your skills directory so that you can share them across Claude Code and Gemini CLI.


It's super cool since everyone is now adopting this standard, so we can easily reuse skills whether we're on Claude Code, Gemini CLI, or something else. At some point I might share some of mine. Here's a quick sneak peek:

<img src="/img/gemini/gemini-nightly-agent-skills.png" alt="Gemini CLI Agent Skills" />
