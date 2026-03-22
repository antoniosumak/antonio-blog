# 10 Claude Code Plugins That Actually Matter (And the One Rule for Picking Them)
## Target Keyword: Claude Code plugins
## Secondary Keywords: Claude Code CLI tools, Claude Code MCP vs CLI, AI coding agent plugins
## Word Count Target: 1200

---

## Meta Description
Most Claude Code plugin lists are noise. Here are 10 that actually work, plus the one rule that'll save you from overloading your setup.

---

## The plugin ecosystem is exploding. Most of it doesn't matter.

Every week there's a new Claude Code plugin, MCP server, or framework dropping on GitHub. It's exciting. It's also overwhelming.

Here's the problem. Most developers are adding tools without thinking about whether those tools actually make their work better. More capability doesn't equal more performance. There's a sweet spot, and most people blow right past it.

So let's cut through it. These are 10 plugins that are genuinely worth your time, and more importantly, the framework for deciding what belongs in your setup and what doesn't.

---

## CLI over MCP. Every time.

This is the single most important thing to understand about Claude Code plugins right now.

MCP servers were created by Anthropic back in 2024 as a way to connect AI assistants to external systems. That made sense at the time. But here's the thing. It's 2026 now, and Claude Code lives inside your terminal. It already has direct access to CLI tools.

MCP is basically trying to replicate what a CLI tool does, but with extra overhead because it operates outside the terminal. So if you're looking at a tool and there's both a CLI version and an MCP version, go with the CLI. Always.

Real example: one well-known AI developer was using the Supabase MCP for months before a viewer pointed out the Supabase CLI existed. The CLI does the same things, faster, with less overhead. He switched immediately.

**The rule is simple:** CLI first. MCP only if there's no CLI alternative.

---

## The CLI + Skill Pattern

This is the recurring pattern across almost every tool worth using.

When you install a CLI tool for Claude Code, don't stop there. Check the tool's GitHub or docs for a purpose-built skill. The skill teaches Claude Code how to use that specific CLI correctly.

The workflow:

1. Install the CLI
2. Find and install the matching skill
3. Talk to Claude Code in plain language
4. It knows what commands to run and when

Without the skill, Claude Code can still use the CLI. But with the skill, it uses it well. That's the difference.

---

## The 10 Plugins Worth Installing

### 1. Supabase CLI

Databases and auth. Every project needs one or both eventually. Supabase runs on Postgres, has a solid free tier, and supports vector databases if you need RAG capabilities. The CLI handles everything the MCP does, minus the overhead.

### 2. Skill Creator (Anthropic)

This is the meta-tool. It creates skills, modifies existing skills, and here's the big one, it lets you A/B test skill performance with actual data.

Before skill creator, you had no idea if a skill was actually making things better. Maybe it was. Maybe it wasn't. Now you can test: with skill vs. without skill, current version vs. previous version. Real numbers instead of gut feelings.

Install this one first. It makes everything else better.

### 3. GSD (Get Shit Done) Framework

An orchestration layer for building new projects from scratch. It forces a planning-first approach where Claude Code thoroughly works through what you're building before writing a single line of code.

The key concept is spec-driven development. Plan extensively, execute once. It also manages context window degradation by spinning up fresh context windows for each phase. If you've noticed Claude Code's output quality dropping during long sessions, this is why. GSD solves it.

Best for: new projects that need structured planning. Not as useful for quick fixes or small features.

### 4. NotebookLM CLI

Connects Google's NotebookLM to your Claude Code terminal. Research, analysis, creating deliverables like slide decks or infographics, all from natural language in the terminal.

There's no official NotebookLM API, but this CLI tool gets around that. It's free and it's become the backbone of a lot of research workflows.

### 5. Obsidian

Not a plugin exactly. More of a pairing. If you use Claude Code as a personal assistant (not just for coding), Obsidian gives you a knowledge management layer with interconnected markdown files.

Open Claude Code in your Obsidian vault folder, tell it to follow Obsidian conventions, and you're set. No CLI or skill needed. But this is specifically for personal assistant and knowledge management use cases. For typical coding projects, it doesn't add much.

### 6. Vercel CLI

Deployment management from your terminal. Great free tier. The real value shows up when you pair it with agent loops. Claude Code can check deployment statuses as you push changes, all from one place.

### 7. Playwright CLI

Browser automation from Microsoft. Testing UI, testing form submissions, web scraping. The "playwright CLI show" command gives you a visual dashboard of what all your browser agents are doing, even headless ones. That alone is worth the install.

### 8. GitHub CLI

Everything you were doing manually on GitHub, now from the terminal. Claude Code is already so familiar with Git that you don't really need a dedicated skill for this one. Just install the CLI, talk to Claude Code, and it figures it out.

Pairs perfectly with Vercel CLI for a complete code-to-deployment pipeline.

### 9. Firecrawl CLI

Web scraping where the data comes back formatted specifically for AI agents. Four commands: scrape, crawl, map, search. Claude Code (via the skill) knows which one to use for which job.

Good for competitor research, reading documentation, monitoring site changes, and deep research with sources. A step above Claude Code's built-in web search.

### 10. Excalidraw Diagram Skill

Natural language diagram creation. Point Claude Code at a directory of content, ask it to create diagrams, and iterate using plan mode. Saves a massive amount of time on presentations and visual explanations.

---

## Don't Over-Tool

Here's where most people go wrong. They see a list like this and install all 10 immediately.

Don't do that.

Start with what you actually need for your current project. If you're not doing research, skip NotebookLM. If you're not deploying to Vercel, skip the Vercel CLI. If you're not building from scratch, skip GSD.

The whole point of the CLI-first approach is that these tools are lightweight and purpose-built. Add them when you need them, not before.

More plugins doesn't mean better output. It often means more noise, more context window usage, and worse results. Find your sweet spot.

---

## What This Means for Your Projects

If you're running a business and working with a dev team (or evaluating one), ask them about their tooling philosophy. The teams getting the best results from AI coding agents aren't the ones with the most plugins installed. They're the ones who picked the right 3-4 tools for their workflow and paired them with skills that actually work.

The pattern is clear: CLI over MCP, always pair tools with skills, test whether your skills actually improve output, and resist the urge to add more than you need.

---

## Internal Links
- [Link to relevant existing blog posts about web development process]
