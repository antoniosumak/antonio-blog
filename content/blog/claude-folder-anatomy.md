# The .claude/ Folder Explained: What Every Developer Using Claude Code Should Know

## Target Keyword: claude code .claude folder
## Secondary Keywords: CLAUDE.md setup, Claude Code configuration, Claude Code commands, Claude Code settings.json

---

## Meta Description
Most Claude Code users ignore the .claude/ folder. Here's what's actually inside it and how to set it up properly for your team.

---

## Introduction

Most developers using Claude Code have no idea what's in the `.claude/` folder. They open it once, see some files, and close it.

That's a mistake.

The `.claude/` folder is where you tell Claude who you are, what your project does, and what rules to follow. The more clearly you define that, the less time you spend correcting Claude and the more time it spends doing useful work.

Here's what's actually in there.

---

## Two Folders, Not One

Before anything else, there's a distinction that trips people up.

You have two `.claude/` directories:

- **Your project folder**: `your-project/.claude/`, this gets committed to git. Your whole team shares it.
- **Your home folder**: `~/.claude/`, this lives on your machine. Personal preferences, session history, auto-memory.

One is for team rules. One is for personal rules. They don't conflict.

Most of your time goes into the project folder. That's where the useful stuff lives.

---

## CLAUDE.md: The One File That Actually Matters

If you only set up one thing, make it `CLAUDE.md`.

This file sits at your project root and gets loaded straight into Claude's system prompt when you start a session. Claude reads it before it does anything else. It stays in context the entire conversation.

That makes it your highest-impact file. Get it right and Claude behaves the way your team expects. Skip it and you're spending half the session correcting basic assumptions.

### What to put in it

Keep it under 200 lines. Seriously. Files longer than that eat too much context and Claude's instruction adherence actually drops. You want specific, not comprehensive.

Good things to include:
- Build, test, and lint commands (`npm run test`, `make build`)
- Key architecture decisions ("we use a monorepo with Turborepo")
- Non-obvious gotchas ("TypeScript strict mode is on, unused variables are errors")
- Import conventions and naming patterns
- File and folder structure for the main modules

What not to put in it: linter config, full documentation you can already link to, long paragraphs explaining theory. If it belongs in a README, it doesn't belong in `CLAUDE.md`.

A 20-line `CLAUDE.md` covering an Express REST API with PostgreSQL can handle everything Claude needs. Longer doesn't mean better.

### CLAUDE.local.md

Same idea, but for personal overrides. Different test runner preference? Specific file-opening patterns? Put them here.

This file is auto-gitignored. Your personal tweaks never land in the repo.

---

## settings.json: What Claude Can and Can't Do

This is your permission layer. It lives at `.claude/settings.json` and controls exactly what Claude is allowed to run without asking first.

Structure looks like this:

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git status)",
      "Bash(git diff *)",
      "Read",
      "Write",
      "Edit"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(curl *)",
      "Read(./.env)",
      "Read(./.env.*)"
    ]
  }
}
```

The `allow` list runs without confirmation. Good defaults are your build commands and read-only git operations.

The `deny` list is blocked completely, no matter what. Put destructive commands here. Put sensitive files here. `rm -rf *`, `curl *`, `.env` reads. All of it.

Anything not on either list triggers a confirmation prompt. That's intentional. Safety net for stuff you haven't thought about yet.

One note: include the `$schema` line. It enables autocomplete and inline validation in VS Code and Cursor. Small thing but you'll thank yourself later.

---

## The commands/ Folder: Slash Commands for Your Workflows

Every markdown file in `.claude/commands/` becomes a slash command.

`review.md` becomes `/project:review`. `fix-issue.md` becomes `/project:fix-issue`. You get the idea.

The useful part is what you can do inside those files. You can embed shell command output directly into the prompt using backtick syntax:

```markdown
## Changes to Review
!`git diff --name-only main...HEAD`

## Detailed Diff
!`git diff main...HEAD`

Review these changes for code quality issues, security vulnerabilities, missing test coverage, and performance concerns.
```

When someone runs `/project:review`, Claude gets the actual diff automatically. No copying and pasting. No "here's the diff, now review it." It's already there.

You can also use `$ARGUMENTS` to pass parameters. `/project:fix-issue 234` passes `234` as an argument. Useful for things like pulling in a specific GitHub issue:

```markdown
!`gh issue view $ARGUMENTS`

Understand the bug, trace it to the root cause, fix it, and write a test that would have caught it.
```

Team commands go in `.claude/commands/` and get committed. Personal commands go in `~/.claude/commands/` and work across all your projects.

---

## The rules/ Folder: When CLAUDE.md Gets Too Big

One `CLAUDE.md` works fine for a small project. But once your team grows, you end up with a 300-line `CLAUDE.md` that nobody maintains and everyone ignores.

The `rules/` folder fixes that.

Split instructions into focused files organized by concern:

```
.claude/rules/
├── code-style.md
├── testing.md
├── api-conventions.md
└── security.md
```

The person responsible for API conventions owns `api-conventions.md`. The testing standards person owns `testing.md`. Nobody fights over a single file.

### Path-scoped rules

This is the part most people miss. You can activate a rule file only for matching file paths using YAML frontmatter:

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/handlers/**/*.ts"
---
```

When Claude edits a React component, API-specific rules don't load. When Claude works on API handlers, they do. Rules without a `paths` field load every session unconditionally.

This matters because context isn't infinite. Loading rules Claude doesn't need for the current file wastes it.

---

## Skills and Agents: The Advanced Stuff

Most projects won't need these right away. But they're worth understanding.

**Skills** are workflows that activate automatically based on context. The difference from commands: commands wait for you to call them. Skills watch the conversation and act when the moment is right.

A `security-review` skill with the description "Use when reviewing code for vulnerabilities, before deployments, or when the user mentions security" triggers when you say "review this PR for security issues." You don't type the command. Claude recognizes the pattern and invokes it.

**Agents** are specialized subagents with their own system prompts, tool restrictions, and model preferences.

Say you need a code reviewer. Instead of letting that review process clutter your main context window with thousands of tokens of intermediate exploration, you define a `code-reviewer` agent that runs in isolation. It does its work, compresses the findings, and reports back. Your main session stays clean.

```markdown
---
name: code-reviewer
description: Expert code reviewer. Use PROACTIVELY when reviewing PRs, checking for bugs, or validating implementations before merging.
model: sonnet
tools: Read, Grep, Glob
---

You are a senior code reviewer focused on correctness and maintainability.
```

The `tools` field is intentional. If the agent only needs to read and search, don't give it write access. Restricting tools prevents mistakes and makes your permissions explicit.

You can also pin models. Use Haiku for read-only exploration, Sonnet for complex logic, Opus for the hard problems.

---

## How to Actually Start

Don't try to set everything up at once.

**Step 1**: Run `/init` inside Claude Code. It generates a starter `CLAUDE.md` by reading your project. Edit it down to essentials. Keep it under 200 lines.

**Step 2**: Create `.claude/settings.json`. At minimum, allow your build commands and deny `.env` reads.

**Step 3**: Create commands for workflows your team runs daily. Start with `/project:review`. Add shell embedding.

**Step 4**: When `CLAUDE.md` starts feeling crowded (around 150 lines), move domain-specific rules into `.claude/rules/` with path scoping.

Skills and agents come later, if ever. The first three steps solve 95% of problems.

---

## The Setup Most Teams Skip

Here's the thing: most teams using Claude Code are leaving configuration on the table.

They're not writing `CLAUDE.md`. They're not defining permissions. They're just letting Claude guess.

And it works. Sort of. But "sort of" means correcting Claude on the same things repeatedly. Confirming commands you always allow. Re-explaining architecture every session.

That's friction you don't need. Twenty minutes setting up `CLAUDE.md` and `settings.json` buys you weeks of smoother sessions.

---

## Internal Links
- [What good web development tooling looks like, link to related post]
