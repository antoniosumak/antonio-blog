# How to Build a Self-Improving AI Research Workflow With Claude Code, NotebookLM, and Obsidian

## Target Keyword: AI research workflow
## Secondary Keywords: Claude Code workflow, NotebookLM Obsidian, AI productivity system
## Word Count Target: 1200

---

## Meta Description
Build an AI research workflow that actually gets smarter over time using Claude Code, NotebookLM, and Obsidian. Here's the full framework and how to set it up.

---

## Introduction

Most people use AI tools one at a time. Ask ChatGPT a question. Copy the answer somewhere. Forget about it next week.

There's a better approach. Connect Claude Code, NotebookLM, and Obsidian into a single pipeline that does your research, organizes the output, and gets better at it the more you use it.

The idea isn't complicated. But the results compound in a way that single-tool workflows can't touch.

---

## The Core Framework: Data In, Knowledge Out

Here's how the pieces fit together.

**Claude Code** is the orchestration layer. It runs the show. You give it one command and it coordinates everything else.

**NotebookLM** handles the heavy analysis. It processes your sources, whether that's YouTube videos, PDFs, articles, whatever. And here's the part that matters: Google handles those tokens. You're not paying for that processing through Claude Code. That's a real cost advantage when you're working at scale.

**Obsidian** is where everything lands. All output gets saved as markdown files in your Obsidian vault. So you get structured knowledge that's human-readable (Obsidian's UI, graph view, backlinks) and machine-readable (Claude Code can search and reference it later).

Simple flow: source material goes in, AI processing happens, structured markdown comes out, and it all lives in one place.

---

## Why This Gets Better Over Time

This is the part most people miss.

Every time you run this workflow, your Obsidian vault grows. More documents. More analysis. More patterns. Claude Code can reference all of it.

But the real trick is the `claude.md` file. Think of it as Claude Code's instruction manual for working with you specifically. It tracks your preferences, your formatting style, how you like your analysis structured.

You update it periodically. Just tell Claude Code "update claude.md based on our recent work so it better reflects how I like things done." That's it.

After a week? Not much difference. After a month? You'll notice it. After a year with hundreds of documents and conversations? Completely different tool than what you started with.

It's a feedback loop. The more you use it, the better it gets at producing what you actually want. Not what a generic AI thinks you want.

---

## Skills Turn Multi-Step Workflows Into One Command

Here's where it gets practical.

Claude Code has "skills." Reusable commands you trigger with a slash command. Instead of typing out instructions every time, you build a skill once and run it forever.

The workflow uses three layers:

- **A data source skill** that pulls in your raw material (YouTube search, PDF ingestion, web scraping, whatever fits your work)
- **A processing skill** that sends that material to NotebookLM for analysis
- **A "super skill"** that chains the first two together into a single command

So instead of manually doing five steps, you type one slash command and the whole pipeline runs. Search, process, analyze, save. Done.

The Skill Creator plugin builds these for you. Describe what you want in plain English and it generates the skill file. No coding required.

---

## You Don't Need These Exact Tools

This matters. The specific tools aren't the point. The pattern is.

The pattern is: **data source, AI processing, structured output, knowledge storage, preference refinement.**

You could swap YouTube for internal company docs. You could skip NotebookLM entirely if you don't need that layer. You could use a different note-taking app, as long as it works with markdown files that Claude Code can read.

The framework is what's valuable. Not the specific combination.

So if you're a business owner reading this thinking "I don't do YouTube research," that's fine. Think about what you do research. Market analysis? Competitor tracking? Customer feedback? Same pipeline works. Different inputs, same structure.

---

## Setting It Up Takes Less Than 30 Minutes

Here's the quick version:

1. **Open Claude Code inside your Obsidian vault folder.** All generated files show up in Obsidian automatically.
2. **Install the Skill Creator plugin.** Run `/plugin`, search for "skill creator", install it, restart Claude Code.
3. **Build your data source skill.** Use `/skill-creator` and describe what you want in plain language.
4. **Set up NotebookLM integration** (optional). Install the notebook-lm-pi package from GitHub, authenticate through your browser, then create a skill for it.
5. **Chain everything into a super skill.** Describe the full pipeline to the Skill Creator and let it generate the master command.
6. **Run it.** One slash command. Everything happens.

That's the whole setup. The ongoing work is just running the pipeline and occasionally updating your claude.md file so Claude Code stays aligned with how you think.

---

## The Bigger Picture for Your Business

Look, we talk to business owners every day who are drowning in information but starving for insight. Customer data, competitor websites, industry reports, meeting notes. All sitting in different places. None of it connected.

This kind of workflow isn't just for tech people experimenting with AI. It's a real pattern for turning scattered information into structured knowledge you can actually act on.

The businesses that build systems like this, where tools get smarter over time instead of starting fresh every session, are the ones that pull ahead. Not because of any single AI tool. Because of how they connect them.

If your business runs on information (and whose doesn't), this framework is worth 30 minutes of your time.

---

## Internal Links
- [Link to relevant blog post about AI tools for business]
