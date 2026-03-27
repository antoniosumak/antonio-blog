# How to Actually Use Claude Code: Configuration, Skills, and Team Workflows

## Target Keyword: Claude Code configuration for teams
## Secondary Keywords: CLAUDE.md setup, Claude Code skills, Claude Code hooks, Claude Code team workflow
## Word Count Target: 1200-1500

---

## Meta Description
Claude Code is more than a chat assistant. Here's how to configure it with CLAUDE.md, skills, hooks, and team settings so it actually knows your codebase.

---

## Introduction

Most developers use Claude Code the same way they use Google. Type a question, get an answer, close the tab. Maybe ask it to write a function. Maybe paste in an error.

That works. But it's not even close to what Claude Code can do.

The developers who get the most out of it have set up the configuration layer. They've got a CLAUDE.md file that explains the project. Skills that automate their most common workflows. Hooks that enforce standards. And a `.claude/` folder committed to git so every teammate starts with the same setup.

This guide covers that configuration layer, from scratch.

---

## What Claude Code Actually Is

Claude Code isn't just a chat interface with access to your files. It can read and write files directly, run shell commands, execute builds and tests, search your codebase with pattern matching, spawn multiple subagents to work on tasks in parallel, and connect to external tools like GitHub and databases via MCP servers.

It's available as a CLI (`npm install -g @anthropic-ai/claude-code`), IDE extensions for VS Code and JetBrains, a desktop app, and at claude.ai/code.

Sessions are stateless. Each new conversation starts fresh. So anything you want Claude to know about your project, you have to either tell it explicitly or configure it to load automatically. That's what the `.claude/` folder is for.

---

## The .claude/ Folder: Your Project's Configuration Center

Everything Claude Code knows about your project lives in `.claude/` at the project root. Commit this folder to git and your whole team shares the same context.

Here's what the structure looks like:

```text
your-project/
├── CLAUDE.md                    # Project instructions
├── .mcp.json                    # MCP server configs
└── .claude/
    ├── settings.json            # Permissions, hooks, model config
    ├── settings.local.json      # Personal overrides (auto-gitignored)
    ├── rules/                   # Topic-specific instruction files
    │   ├── testing.md
    │   ├── api-design.md
    │   └── security.md
    ├── skills/                  # Reusable workflows
    │   └── deploy/
    │       ├── SKILL.md
    │       └── scripts/
    └── agents/                  # Specialized subagents
        └── code-reviewer.md
```

There's also a user-level config at `~/.claude/` for your personal preferences. Things like your preferred coding style, favorite tools, and shortcuts. That stuff stays off your team's repo.

The separation matters: `.claude/settings.json` is for team standards. `.claude/settings.local.json` is for your personal overrides. Claude automatically gitignores the local file.

---

## CLAUDE.md: The First Thing Claude Reads

CLAUDE.md is a Markdown file Claude loads at the start of every session. Think of it as the README your AI reads instead of a human.

Put in things Claude can't figure out by reading the code. Architecture decisions and the reasoning behind them. Non-obvious constraints. Deployment gotchas. Decision trees for common scenarios. Skip the stuff that's already in `package.json` or visible in the source. Claude can read those.

```markdown
# Project: E-commerce API

## Architecture Decisions
- Orders service is eventually consistent. Don't expect immediate read-after-write on order status.
- Auth uses short-lived JWTs (15 min) + refresh tokens. Never store sessions server-side.
- All prices stored as integers (cents). Never use floats for money.

## Non-Obvious Constraints
- The payments webhook endpoint must respond within 5 seconds or Stripe retries
- Rate limiter on /api/auth/* is 10 req/min per IP. Don't disable it in tests, use the test bypass header instead: `X-Test-Bypass: {RATE_LIMIT_SECRET}`
- Database migrations run on deploy. They must be backwards-compatible because old and new code runs simultaneously during rollout.

## When Confused
- If a test fails on CI but passes locally, check that you're using the test database seed in `scripts/seed-test.sh`
- If you're unsure whether a change needs a migration, it does
```

Keep it under 200 lines. This isn't a rule for aesthetics. Claude's adherence to CLAUDE.md instructions drops significantly after ~200 lines. If your file grows past that, break it into topic files in `.claude/rules/`.

You can also use `@imports` to pull in other files and block-level HTML comments to write maintainer notes without spending context tokens:

```markdown
<!--
  Note: We use Turbo for monorepo builds. Cache busts when package.json changes.
  Main build bottleneck is Playwright tests (~8 min).
-->

Run `npm run build` to compile.
```

The `<!-- -->` block never reaches Claude. Free notes for humans.

Run `/init` in Claude Code to auto-generate a starter CLAUDE.md from your codebase. The interactive mode (`/init CLAUDE_CODE_NEW_INIT=true`) asks follow-up questions about your stack before writing anything.

---

## Rules: When One CLAUDE.md Isn't Enough

Rules live in `.claude/rules/` and let you organize instructions by topic and scope them to specific file patterns.

A rule without frontmatter loads like CLAUDE.md, every session. A rule with `paths:` frontmatter only loads when Claude is working on matching files:

```yaml
---
paths:
  - "src/api/**/*.ts"
  - "**/*.test.ts"
---
# API Design Rules
- All endpoints must validate input with Zod
- Return shape: { data: T } | { error: string }
- Add error codes to all error responses
```

Claude won't load your API design rules when it's writing a CSS file. That saves context and keeps the rules relevant.

User-level rules at `~/.claude/rules/` apply across every project. Good for personal preferences you want everywhere.

---

## Skills: Automate Your Workflows

Skills are the main way to extend Claude Code with reusable, invocable workflows. They replace the older `commands/` folder (though old commands still work).

A skill is a directory with a `SKILL.md` file inside. That file has YAML frontmatter for metadata and Markdown for the actual instructions.

```yaml
---
name: fix-issue
description: Fix a GitHub issue by number. Use when asked to fix a bug or issue.
allowed-tools: Read, Grep, Glob, Bash, Edit
---

Fix GitHub issue $ARGUMENTS following our coding standards.

1. Read the issue description with `gh issue view $ARGUMENTS`
2. Understand what needs to change
3. Implement the fix with tests
4. Create a commit with the issue number
```

That creates a `/fix-issue` command. Type `/fix-issue 142` and Claude reads issue #142, figures out what to change, makes the fix, writes tests, and commits it.

But skills can also trigger automatically. Claude reads the description and decides when to invoke a skill based on what you're asking. So if someone says "can you review this PR before I merge?", Claude can auto-invoke your `/pr-review` skill without you typing the command.

### Dynamic Context in Skills

One of the more useful features: skills can run shell commands before Claude sees the instructions. The output gets injected as context.

```yaml
---
name: pr-summary
context: fork
allowed-tools: Bash(gh *)
---

## Pull request context
- PR diff: !`gh pr diff`
- PR comments: !`gh pr view --comments`

Summarize this pull request for team review...
```

When you run `/pr-summary`, Claude gets the actual diff and comments injected into its context before starting. No copy-pasting needed.

The `context: fork` setting spins up a completely isolated subagent with its own context window. Useful for large operations that would eat up your main thread.

### What Goes in git vs What Stays Personal

Skills in `.claude/skills/` get committed and shared with the team. Everyone gets `/deploy`, `/pr-review`, `/fix-issue`.

Personal skills go in `~/.claude/skills/`. Only you see them. Good for personal shortcuts that don't apply to the team.

Claude Code ships with a few built-in skills worth knowing:

- `/batch <instruction>` — runs large-scale codebase changes using parallel worktrees
- `/simplify [focus]` — review recently changed files with parallel review agents
- `/loop [interval] <prompt>` — run a prompt on a repeating interval

---

## Hooks: Enforcement, Not Just Guidance

CLAUDE.md is guidance. Claude reads it and tries to follow it. Hooks are different. They run guaranteed, at specific lifecycle points, and they can block operations.

You configure hooks in `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit|Write",
      "hooks": [{
        "type": "command",
        "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
      }]
    }]
  }
}
```

Every time Claude writes or edits a file, Prettier runs automatically. You don't have to ask.

There are 20+ hook events. The ones you'll use most:

- `SessionStart` — load environment variables, set up context
- `PreToolUse` — block dangerous operations before they run
- `PostToolUse` — run formatters, linters, or log tool usage
- `Stop` — notify Slack when Claude finishes, trigger a deploy

Hooks that return exit code 2 block the operation and show an error to Claude. Everything else is non-blocking.

Here's a hook that blocks destructive commands:

```bash
#!/bin/bash
COMMAND=$(cat | jq -r '.tool_input.command')
if echo "$COMMAND" | grep -qE '(rm -rf|drop table)'; then
  jq -n '{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "Destructive command blocked"}}'
  exit 0
fi
exit 0
```

Hooks committed in `.claude/settings.json` apply to everyone on the team. Hooks in `settings.local.json` are just for you.

---

## Settings: Permissions and Model Config

`.claude/settings.json` is where you lock down what Claude can and can't do.

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git *)",
      "Read", "Write", "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  },
  "model": "claude-sonnet-4-6",
  "env": {
    "NODE_ENV": "development"
  }
}
```

Permission arrays merge across scopes. So if your user settings allow `Read` and `Write`, and the project settings allow `Bash(npm *)`, you end up with all three. Scalar values like `model` follow the most specific scope.

Settings priority from highest to lowest:

1. Managed/enterprise (deployed via MDM, can't be overridden)
2. Local settings (`.claude/settings.local.json`)
3. Project settings (`.claude/settings.json`)
4. User settings (`~/.claude/settings.json`)

For enterprise setups, you can deploy managed settings to every machine via `C:\Program Files\ClaudeCode\` on Windows, `/Library/Application Support/ClaudeCode/` on Mac, or `/etc/claude-code/` on Linux. Those settings can't be overridden by individual devs.

---

## Team Setup: What to Commit, What to Keep Local

Here's the concrete answer to "what goes in git?":

**Commit these:**
- `CLAUDE.md` (project instructions)
- `.claude/settings.json` (permissions, hooks, model config)
- `.claude/rules/*.md` (topic-specific guidelines)
- `.claude/skills/` (shared workflows)
- `.claude/agents/` (specialized subagents)
- `.mcp.json` (shared MCP server configs)

**Keep local (auto-gitignored):**
- `.claude/settings.local.json` (personal permission overrides)
- `~/.claude/CLAUDE.md` (personal coding style)
- `~/.claude/skills/` (personal workflows)
- `~/.claude/projects/<hash>/memory/` (auto-memory, machine-local)

When a new developer clones the repo, they get the full team configuration. Claude knows the project stack, the conventions, the workflows. They don't have to set anything up.

Auto-memory (`autoMemoryEnabled: true` in settings, on by default) means Claude writes notes to itself at `~/.claude/projects/<hash>/memory/` as it works. MEMORY.md is the index and loads automatically. Topic files load on demand. Stays machine-local, not synced to git.

---

## For Solo Developers

All of this scales down to one person.

Start by running `/init` to generate a CLAUDE.md. Then create a personal `~/.claude/CLAUDE.md` with your general coding preferences. Make one or two personal skills for your most repeated workflows.

The payoff: after one setup session, Claude knows your project, your style, and your workflows. You don't re-explain it every time.

---

## Getting Started

1. Install: `npm install -g @anthropic-ai/claude-code`
2. In your project root, run `/init CLAUDE_CODE_NEW_INIT=true` to generate CLAUDE.md interactively
3. Create `.claude/settings.json` with your team's permission rules
4. Create your first skill in `.claude/skills/`
5. Commit `.claude/` to git
6. Have each developer add `.claude/settings.local.json` for their personal overrides

Type `/memory` at any time to see what Claude has saved across sessions. Type `/hooks` to see what hooks are active.

That's the whole system. Commit it, share it, and your team stops re-explaining the project to an AI that should already know it.

---

## CTA

If you're already using Claude Code, set up your CLAUDE.md this week. It takes 30 minutes and makes every session after that noticeably faster. If you're on a team, commit it so everyone gets the same baseline.

Questions about setting this up for your specific stack? The [Claude Code docs](https://docs.anthropic.com/en/docs/claude-code) have the full reference.
