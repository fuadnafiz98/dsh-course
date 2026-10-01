# Mission: Understand DeepSeek Harness end to end

## Why
The user wants to genuinely learn how a production-grade agent harness works — DeepSeek Harness in particular — so they can navigate its codebase confidently, understand the Cordis plugin framework underneath it, and eventually build on or contribute to systems like it.

## Success looks like
- Can trace `dsh web` from CLI argv to a running plugin tree without getting lost
- Can explain what Cordis is doing: contexts, services, `inject`, fibers, effects, the five event dispatch modes
- Can follow one user message through the agent loop: turn → step → prompt assembly → LLM stream → tool calls → durable session events
- Knows where any given behavior lives and which extension point (`ctx.*` service, `agent/*` event, `tools/*` waterfall, session event) would carry a new feature
- Can click through the lessons' source-map links into the real files and read them productively

## Constraints
- Learner starts with only a basic mental model of agent harnesses; every lesson must build from fundamentals
- Prefers visual learning: many diagrams, interactive diagrams, and click-through maps over walls of text
- Advanced material must be tucked into collapsible "go deeper" layers so the main path stays gentle
- Lessons and reference pages link to the real source files (pinned commit on GitHub) so reading the actual code is one click away

## Out of scope
- Contributing changes to the repo, running its build/test suite, or writing plugins for real deployment (we note where those docs live but don't practice them yet)
- The Python SDK internals and the Electron desktop shell beyond a map-level mention
