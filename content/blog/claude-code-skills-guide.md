# The 9 Types of Claude Code Skills (And How to Actually Build Good Ones)
## Target Keyword: Claude Code skills
## Secondary Keywords: AI coding tools for teams, Claude Code customization, developer productivity tools
## Word Count Target: 1000-1400

---

## Meta Description
A practical breakdown of the 9 types of Claude Code skills, with tips on how to build, structure, and scale them across your team. No fluff, just what actually works.

---

## Introduction

Most teams using Claude Code start the same way. Throw a few markdown files in the `.claude` folder, call them "skills," and wonder why Claude keeps doing the same dumb stuff.

Here's the problem. Skills aren't just text files. The teams actually getting results are treating skills like mini-products. Folders with structure, scripts, reference code, and a dedicated section for all the things Claude gets wrong.

This is a breakdown of the 9 categories that actually matter, how to build them right, and how to scale them without everything turning into a mess.

---

## What a Skill Actually Is

A skill is a folder, not a file. That distinction matters more than people think.

When you structure a skill as a folder, you can separate reference docs into `references/`, store helper scripts in `scripts/`, and drop templates in `assets/`. Claude reads what's relevant based on context. You're not shoving everything into one giant prompt.

Think of it as context engineering. You decide what Claude sees and when it sees it.

---

## The 9 Types of Claude Code Skills

### 1. Library and API Reference Skills

These teach Claude how to use your internal libraries, CLIs, or SDKs correctly. The value isn't the happy path. It's the gotchas. The edge cases, the footguns, the things that look right but explode in production.

If your team has an internal billing library or a custom CLI with 30 subcommands, Claude has no idea those exist. A reference skill fixes that.

### 2. Product Verification Skills

This category is worth the most investment. Full stop.

Pair Claude with Playwright, write programmatic assertions, and you get a skill that can actually check whether code works. Not just whether it compiles.

Anthropic's team says a full engineer week building a solid verification skill pays back fast. They use these for stuff like testing the entire signup-to-onboarding flow in a headless browser, or running checkout tests with Stripe test cards.

If you're building one type of skill this quarter, make it this one.

### 3. Data Fetching and Analysis Skills

These connect Claude to your actual data. Funnel queries, cohort comparisons, Grafana dashboard references. Instead of Claude guessing about how your business performs, it can look.

Key things to include: credentials setup, query patterns for common workflows, and pointers to the dashboards people actually use. When Claude can ground analysis in real numbers, the output gets meaningfully better.

### 4. Business Process and Automation Skills

Any multi-step workflow your team does manually more than once a week? That's a candidate. Standup aggregators, ticket creation with schema enforcement, weekly recap tools.

These skills often benefit from storing previous results in log files so Claude can track state across runs. You ran the standup post yesterday. Claude can see that and skip duplicating work.

### 5. Code Scaffolding and Template Skills

Scaffolding skills generate the boilerplate for new services, migrations, or app setups in your specific stack with your specific conventions.

These shine when the requirements are hard to express purely in code. "Create a new service with our auth middleware, logging config, and deploy yaml pre-wired" is a natural language instruction. A scaffolding skill makes it repeatable.

### 6. Code Quality and Review Skills

Skills that enforce standards and improve code review. The most useful version: an adversarial review skill that spawns a fresh-eyes subagent to look for problems the original author missed.

These can also run automatically in hooks or GitHub Actions. No manual triggering needed.

### 7. CI/CD and Deployment Skills

These handle the full deployment lifecycle. Fetch the PR, push, retry failed CI, auto-merge when ready, or do a gradual rollout with automatic rollback if error rates spike.

If your team spends hours babysitting deploys, start here.

### 8. Runbook Skills

Runbook skills take a symptom (a Slack alert, an error signature) and walk Claude through the same investigation a senior engineer would run. Which logs to check first. Which query patterns map to which services. What the usual suspects are.

This is how you operationalize institutional knowledge. The new person on oncall gets the benefit of what the senior engineer learned from 2 years of incidents.

### 9. Infrastructure Operations Skills

Routine maintenance with guardrails. Finding orphaned pods or volumes, managing dependencies, investigating costs.

The useful pattern here is building in confirmation steps for destructive actions. Claude finds the orphaned resources, lists them. You confirm. Then it deletes. Simple.

---

## How to Build Skills That Actually Work

### Write the Gotchas Section First

Every good skill has a dedicated Gotchas section. Not aspirational documentation. Actual failure modes you've watched Claude hit.

Update it over time. The best skills aren't built perfectly on day one. They get better because someone adds a gotcha every time Claude screws something up. Start with what you know. Keep adding.

### Don't Tell Claude Things It Already Knows

Claude already understands a lot about coding. Writing a skill that explains what a REST API is or how to write a for loop just wastes context.

The highest-value skills push Claude past its defaults. One example from Anthropic's team: a frontend design skill built specifically to steer Claude away from defaulting to Inter font and purple gradients. You know, the generic SaaS look that nobody wants anymore. That's the kind of thing you can only teach through a skill.

### Use the File System as Progressive Disclosure

Don't put everything in the root README.

- `references/` for detailed API docs
- `scripts/` for helper code Claude can run
- `assets/` for templates
- `examples/` for reference implementations

Claude reads what's relevant. You're not choosing between complete information and a bloated prompt.

### Write Descriptions for Routing, Not Humans

The description field in a skill isn't a summary. It's how Claude decides whether to use the skill at all.

Write it as: "When should this skill trigger?" Not: "What does this skill do?"

### Use Config Files for Setup

If your skill needs user input at setup time (which Slack channel to post in, which environment to target), store that in a `config.json`. Have Claude detect when config is missing and ask the user to fill it in.

Don't hardcode it. Skills get reused in contexts you don't anticipate.

---

## How to Scale Skills Across a Team

For small teams with a few repos, checking skills into the repo works fine. `./.claude/skills` and you're done.

For larger organizations, that breaks down. Every skill in the repo adds context load to the model. At some point you want a plugin marketplace where teams pick which skills to install.

The pattern that works: start with GitHub sandboxes. Engineers publish experimental skills, build momentum, then submit a PR to add them to the internal marketplace. Don't set up a central committee. Let the good skills surface naturally.

And measure what's actually getting used. You can log skill invocations via PreToolUse hooks. That tells you which skills are popular and which ones exist in theory but never get triggered. That data shapes where to invest next.

---

## The Honest Part

Most of Anthropic's skills started as a few lines and a single gotcha. They got better because people kept adding to them as Claude hit real edge cases.

You don't need a perfect skill taxonomy before you start. You need one skill that solves a real problem your team hits every week. Build that. See what Claude gets wrong. Update the gotchas. Repeat.

The teams getting outsized value from Claude Code aren't the ones who designed the best skill system upfront. They're the ones who iterated fast on a small number of skills that actually mattered.

---

Pick one category that matches something your team does every week. Build a minimal version. Improve it from real use. That's the whole playbook.

---

## Internal Links
- [Why Your Development Process Is Slower Than It Needs to Be]
