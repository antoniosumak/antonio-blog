# 10 CLI Tools That Make Claude Code Actually Useful
## Target Keyword: Claude Code CLI tools
## Secondary Keywords: Claude Code extensions, Claude Code workflow, AI coding tools
## Word Count Target: 1200

---

## Meta Description
10 CLI tools that extend Claude Code without burning through tokens. GitHub, Supabase, Playwright, and more, each explained in plain terms.

---

## Introduction

Everyone's talking about MCPs right now. And yeah, they work. But if you've been using Claude Code for a while, you've noticed the overhead. More tokens. More setup. More things that break quietly.

CLI tools are different. Claude Code lives in the terminal. CLI tools live in the terminal. So instead of building a bridge between them, you just... use them together. No overhead. No extra context. Two things that belong in the same place, working together.

There's a whole wave of CLI tools being built specifically for Claude Code workflows right now. Here are 10 worth your time.

---

## Why CLI Tools Beat MCPs for Claude Code

Look, MCPs aren't bad. But there's a concrete reason to prefer CLIs: they use fewer tokens.

Playwright ran a head-to-head test comparing their CLI tool to their MCP equivalent. The CLI version used 90,000 fewer tokens and ran faster. That's not marginal. That's real money and real time if you're using Claude Code daily.

The architecture makes sense when you think about it. Claude Code runs in your terminal. CLI tools run in your terminal. You're not adding a layer. You're just giving Claude Code a new command to run.

---

## The 10 Tools

### 1. CLI Anything

This is kind of a meta-pick. CLI Anything doesn't do one specific thing. It creates CLI tools for other programs.

Point it at any open-source project, and it generates a CLI wrapper for that program. Blender, Inkscape, OBS, Zoom, Notebook LM. Anything without a public API that you'd otherwise have no way to automate.

It's made by the LightRAG team, who build some of the most-used RAG tools in open source. Install takes two steps. Then you just run it.

### 2. Notebook LM Python Interface (LM-PI)

One of Claude Code's real limitations is video. It can't watch a YouTube video. Can't process audio. If your workflow involves research or content, that gap gets annoying fast.

Notebook LM-PI solves it. It connects Claude Code to Google's Notebook LM via CLI, so you can throw YouTube URLs at it and have Notebook LM process them on Google's servers for free. Podcasts, slide decks, quizzes, infographics, all automated.

The output comes back into Claude Code so you can use it downstream. If you do research-heavy work with Claude Code, set this one up first.

### 3. Stripe CLI

Setting up Stripe through the web interface is a lot. At least 20 different tabs before you've got a working payment flow.

The Stripe CLI lets Claude Code handle most of that from the terminal. Product creation, pricing configuration, webhook setup. It won't run actual test transactions, that still needs manual work. But the setup steps that used to eat 45 minutes? Claude Code handles them in a few commands.

Building anything with payments? Install this at the start.

### 4. FFmpeg

FFmpeg is a multimedia library. Video, audio, subtitles, all manipulable from the command line.

In practice, this means Claude Code can take a video file, split it into individual frames, and stitch those frames into a scrolling animation. Or loop a video by reversing it and appending the reverse. Or strip the audio and replace it.

Doing that by hand in a video editor takes forever. With FFmpeg and Claude Code, you describe what you want and it runs the commands.

Good if you're building sites that need custom animations or video assets.

### 5. GitHub CLI

Table stakes at this point. If you're not using the GitHub CLI with Claude Code, you're doing more manual work than you need to.

Claude Code already understands Git deeply. The GitHub CLI extends that to the full feature set: creating branches, opening PRs, managing issues, pushing code. All from the terminal.

Setup is fast. One command to install, then a simple OAuth login that takes about 30 seconds. After that, Claude Code handles your entire Git workflow without you touching the web interface.

### 6. Vercel CLI

If you're deploying to Vercel, this is how you should be doing it.

The CLI gives Claude Code full control over your deployment pipeline. No switching to the browser to trigger a deploy or check a build. And combined with the GitHub CLI, you can set up a full CI/CD workflow where code goes from your editor to production without leaving the terminal.

Vercel's free tier is generous enough that most small projects don't need to pay. And the CLI docs are solid. Paste them into Claude Code and it'll know exactly what to do.

### 7. Supabase CLI

Supabase is the open-source Firebase alternative. Postgres database, auth, storage, all in one place.

The CLI lets you run Supabase locally, manage migrations, and control your backend entirely from the terminal. Claude Code handles the database setup and schema changes. You stay in your editor.

Building a full-stack app and not on a database yet? Supabase plus its CLI is a solid starting point. The free tier covers most hobby and early-stage projects.

### 8. Playwright CLI

Browser automation. Claude Code can spin up actual Chrome instances and interact with web pages programmatically.

The obvious use is testing. Instead of manually clicking through your app to check that a form works, Claude Code opens five browser tabs and runs through different test scenarios automatically.

But there's more. Playwright scrapes, automates complex multi-step web workflows, and interacts with pages that don't have APIs. The basics are easy to get running, but the repo is worth reading if you want to see what it can really do.

And again, 90,000 fewer tokens than the MCP equivalent. That matters.

### 9. LLM Fit

More niche. Only relevant if you're running Claude Code with local models.

Picking a local model from Ollama is genuinely confusing. The list is huge, every model has 8+ versions, and it's not obvious which one works for what.

LLM Fit analyzes your hardware and tells you which models actually make sense for your setup. Small tool, specific problem, saves you a lot of guessing.

### 10. Google Workspace CLI (GWS)

The most powerful tool on this list. And the one that deserves the most thought before you set it up.

GWS gives Claude Code access to your entire Google Workspace. Email, Docs, Sheets, Drive. All of it. The skill library is massive.

The obvious concern: do you actually want an AI agent with access to your email? Honest answer: it depends on your comfort level. Google's built-in security features handle prompt injection attempts. You can add filters to limit access to specific folders or senders. You don't have to give it full access.

The recommendation: clone the repo, have Claude Code analyze it, and pick the skills that match your workflow. Don't install everything.

---

## How to Pick What to Install

You don't need all 10. Start with what you actually do.

Developer? GitHub CLI, Vercel CLI, Playwright CLI. Those three alone cut a ton of manual work from your day.

Research or content work? Notebook LM-PI and FFmpeg. They fill the media gap that Claude Code has out of the box.

Building a web app? Supabase CLI and Stripe CLI. Backend and payments from the terminal.

Most of these follow the same two-step install: install the CLI, then set up the skill in Claude Code. Usually a one-liner. You can also just paste the CLI docs into Claude Code and let it figure out setup. It usually does.

---

## The Bigger Picture

This isn't just a list of tools. It's a pattern shift.

The ecosystem around Claude Code is moving toward CLI tools. They're faster, use fewer tokens, and fit naturally into how Claude Code already works. A year from now, there will probably be 50 tools like this.

The developers building with Claude Code right now, and actually figuring out the tooling, are going to have a real head start.

---

## What to Do Next

CLI tools aren't a workaround. They're becoming the actual way to extend Claude Code. Pick two or three that fit your workflow and try them this week.

---

## Internal Links
- [Link to: What is Claude Code and should developers use it?]
