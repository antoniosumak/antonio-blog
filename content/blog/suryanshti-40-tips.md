# 40 Claude Code Practices That Separate Power Users From Everyone Else

## Target Keyword: Claude Code best practices
## Secondary Keywords: Claude Code tips, Claude Code workflow, Claude Code CLAUDE.md, Claude Code productivity
## Word Count Target: 1200-1500

---

## Meta Description
Most developers use Claude Code like autocomplete. These 40 practices show what the top 1% actually do differently, and why it adds up to 4-6 hours saved per week.

---

## Introduction

Most people using Claude Code are leaving hours on the table every week. Not because they're bad at prompting. Because they never configured anything.

Suryansh Tiwari put together 40 Claude Code practices that the power users actually use. I read through all of them. Most of them I hadn't heard of. A few of them I've been doing wrong. And at least five of them I set up the same day I read the list.

This post covers all 40, grouped by what problem they solve. You don't need to do all of them. You need to do five of them this week, and five more the week after that.

---

## Part 1: The Setup That Pays for Itself in Day One

The first thing most people skip is configuration. They open Claude Code, start chatting, and never touch the settings. That's a mistake you pay for every single day.

### Stop clicking "approve" on every command

Create a shell alias: `alias cc='claude --dangerously-skip-permissions'`. Now you're not approving every single `npm install` or `git status`. Just make sure you know what you're authorizing before you use this.

Use `/permissions` to allowlist commands you trust, like `npm run lint` or `prettier --write`. Every approval prompt is a tiny interruption. They add up.

### Your terminal should tell you what's happening

Run `/statusline` to get a live display at the bottom of your terminal showing your current directory, git branch, and how much context you've used. It's a HUD for your session. You'll wonder how you worked without it.

### Pick a voice, stick with it

Run `/config` and set your output style once. Explanatory if you want Claude to explain its reasoning, Concise if you just want it to do the thing, Technical if you're deep in code. You can also write custom styles in `~/.claude/output-styles/`. Stop editing Claude's tone after every response. Configure it once.

### The keyboard shortcuts worth memorizing

These four will change how you work:

- **Ctrl+G** before Claude starts coding. Opens the plan in your editor so you can tweak it before any files are touched. This one prevents more wasted hours than almost anything else on this list.
- **Esc** stops Claude mid-run. **Esc+Esc** (or `/rewind`) opens a menu to restore code, conversation, or both. Experimentation gets cheaper when there's an undo button.
- **Ctrl+S** stashes your half-written prompt, lets you ask a side question, then restores your draft when you're done.
- **Ctrl+B** backgrounds a long-running task. Claude is building your tests, you're already writing the next prompt. True parallel work.

### The `!` prefix is underrated

Type `!git status` or `!npm test` directly in Claude Code. The output lands in Claude's context automatically. No more copy-pasting error messages into the chat. This alone eliminates one of the most tedious loops in debugging.

---

## Part 2: Context Is Your Scarcest Resource

Here's the thing most people don't realize: long sessions degrade output quality silently. Claude doesn't tell you it's confused. It just starts giving you worse answers.

### Clear the context between tasks

Run `/clear` when you switch to something unrelated. Fresh session, fresh context, better results. Accumulated context from three different tasks isn't helping anyone.

And if Claude gets something wrong twice in a row, don't correct it a third time. That's a sunk cost. Run `/clear`, rewrite your prompt with what you've learned, and start clean. Continuing a broken thread makes it worse.

### Stop describing bugs. Paste the actual data.

Don't explain the error. Don't summarize the log. Paste the raw output and say "fix this." Your abstraction of the problem loses details Claude actually needs. Raw data gets better results.

### Reference files directly

Use `@src/auth/middleware.ts` instead of saying "the auth middleware file." It's more precise, saves tokens, and tells Claude exactly where to look instead of making it guess.

### Use Plan Mode for anything multi-file

Before any change that touches more than one file, hit Shift+Tab to enter Plan Mode. Claude lays out the approach, you review it, then it executes. This catches the "wait that's not what I meant" moment before 20 minutes of work happens in the wrong direction.

### Upgrade your context window when you need it

Switch to Opus 4.6 with a 1M token context using `/model opus[1m]`. For big codebases or long sessions, this removes the ceiling. But watch for quality degradation as you approach the limits. There's a sweet spot.

### Guide compaction instead of just doing it

When you use `/compact`, tell Claude what to keep. "Focus on the API changes" or "preserve the database schema discussion." Without guidance, compaction loses the parts you actually needed.

### Add "ultrathink" to hard problems

On Opus 4.6, add "ultrathink" to any prompt that involves real complexity. It signals Claude to allocate more reasoning to the problem. On genuinely hard work, the quality difference is visible.

---

## Part 3: Let Claude Verify Its Own Work

Most developers write the prompt, get the code, and paste it in. That's fine for small edits. For anything real, you want Claude to close the loop itself.

### Build self-checking into your prompts

"Refactor the auth module. Run the test suite. Fix any failures before telling me you're done." That instruction produces 2-3x better output than the same prompt without the verification step. Claude catches things it would have handed off to you.

### Install LSP plugins

```bash
/plugin install typescript-lsp@claude-plugins-official
```

After every edit, Claude gets automatic diagnostics from the language server. Type errors get caught before you see them. Broken code stops being written.

### Prefer CLI tools over MCP servers

If you can teach Claude to use `gh` for GitHub operations or `sentry-cli` for debugging, do that instead of the MCP equivalent. CLI tools are more context-efficient. Over a long session, those savings compound.

### If you're going to use MCP, start with these four

Playwright for UI verification. PostgreSQL/MySQL for schema queries. Slack for reading bug threads in context. Figma for design-to-code. These have the best signal-to-noise ratio. Master these before adding anything else.

### Set up background monitoring

```
/loop 5m check if the deploy succeeded
```

Claude checks every 5 minutes and updates you, while you stay focused on what you're doing. You stop manually checking CI. Context stays where it belongs.

---

## Part 4: CLAUDE.md Is a System, Not a Document

Most people have a CLAUDE.md that's either empty or 500 lines of every thought they ever had. Neither works.

### Start with `/init`, then cut it in half

Run `/init` to generate a starter file based on your project. Then delete anything you can't explicitly justify. Every unnecessary line is token bloat that dilutes the instructions you actually need followed.

### The test for every instruction

Ask: "Would Claude make a mistake without this?" If the answer is no, delete it. You have roughly 150-200 instruction slots before compliance starts dropping. That's not many. Use them on things that matter.

### Let CLAUDE.md evolve automatically

When Claude makes a mistake, say "Update CLAUDE.md so this doesn't happen again." The file becomes a living system that gets smarter with each session instead of a static document you forget to maintain.

### Split your rules by file type

Use `.claude/rules/` with `paths` frontmatter to load rules conditionally. TypeScript rules only for `.ts` files. Database rules only in `/db`. Zero wasted context when the rules aren't relevant.

```yaml
---
paths: ["src/**/*.ts"]
---
Always use strict TypeScript. No any types without a comment explaining why.
```

### Use `@imports` to keep things lightweight

Instead of pasting content into CLAUDE.md, reference it: `@docs/git-instructions.md`. Claude reads it when needed, and your base context stays lean.

### Know the difference between guidelines and requirements

Claude follows CLAUDE.md about 80% of the time. For anything non-negotiable, like formatting standards or security rules, use Hooks.

---

## Part 5: Hooks Are CLAUDE.md With Teeth

Hooks run every time, no exceptions. They're the difference between "Claude usually does this" and "this always happens."

### Auto-format on every edit

Add a PostToolUse hook to run Prettier after every file edit. Manual formatting disappears. This is one of those things that seems small until you never think about formatting again.

### Block the destructive stuff

Use PreToolUse hooks to intercept `rm -rf` or `DROP TABLE` before they execute. Higher autonomy becomes safe when you've got a tripwire on the dangerous commands.

---

## Part 6: Parallel Work and Agent Teams

Single sessions are fine. But the real productivity jump comes when you stop thinking in one thread.

### Worktrees for parallel branches

```bash
claude --worktree feature-auth
```

Creates an isolated working copy. Three simultaneous sessions, no cross-contamination. You're working on the auth refactor, testing the new API, and reviewing the design system at the same time.

### Subagents keep your context lean

"Use subagents to investigate the payment flow." Claude spawns a separate instance, reads the files, returns a summary, and your main context stays clean. Offload the heavy exploration to parallel workers.

### Build your own agent team

Save pre-configured agents in `.claude/agents/`. A fast Haiku agent for quick lookups. A strict TypeScript reviewer. A documentation writer. Your own AI team, ready without setup each session.

### Enable agent teams for big work

```bash
CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=true claude
```

A team lead distributes work to 3-5 subagents running simultaneously. For large-scale refactors or research, this isn't an incremental improvement. It's a different category of speed.

### Sandbox for risky experiments

Run `/sandbox` to give Claude OS-level isolation via Seatbelt or bubblewrap. Let it experiment freely on a big refactor. You review the diff and merge what works. Zero risk, full autonomy.

---

## Where to Start

Don't try to do all 40. Pick five this week.

**If you're new to Claude Code:**
- Tip 6 (the `!` prefix for debugging)
- Tip 13 (`/clear` between tasks)
- Tip 17 (reference files directly with `@`)
- Tip 21 (build test verification into your prompts)
- Tip 1 (the `cc` alias)

**If you've been using it a while:**
- Tip 11 (Ctrl+G to edit plans before execution)
- Tip 16 (Plan Mode for multi-file changes)
- Tip 27/28 (build a lean CLAUDE.md that actually gets followed)
- Tip 34 (auto-format hook)
- Tip 36 (worktrees for parallel work)

**If you're already doing most of this:**
- Tip 25 (`/loop` for background monitoring)
- Tip 31 (`@imports` for lightweight CLAUDE.md)
- Tip 39 (agent teams)
- Tip 40 (`/sandbox` for unsupervised experimentation)

Pick five. Implement them. Come back in 30 days.

---

## The Actual Takeaway

Most engineers spend time optimizing their code. The fastest ones optimize their AI workflow. Those are two different compounding advantages.

The gap between a casual Claude Code user and someone getting real leverage from it isn't skill. It's configuration. These 40 practices are sitting in the tool you already use. Most of them take five minutes to set up.

The question isn't whether to do this. It's how long you want to wait.

---

## Internal Links
- [Link to Claude Code getting started guide]
- [Link to CLAUDE.md deep dive post]
- [Link to Claude Code agent teams post]

## CTA

If you're building something with Claude Code and you want a team that actually knows how to get the most out of it, we work with agencies and dev teams on exactly this. [Get in touch] and we'll talk about what you're working on.

