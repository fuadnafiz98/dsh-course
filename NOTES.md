# NOTES.md — working notes

## Learner profile
- Self-described basic understanding of agent harnesses; wants fundamentals first, depth on demand.
- Wants heavy diagram use and interactive click-through maps; text alone won't do.
- Wants every claim linked back to a real file in the repo (GitHub blob links, pinned to commit `639ed015397290b3745d163aafe02ffee4aa3f84` — marker `639ed01`).
- "Put advanced things in the pillow" → advanced content goes inside `<details class="deeper">` blocks so the main path stays gentle.

## Workspace conventions
- `index.html` at workspace root — the course hub (the repo has no competing root `index.html`).
- `lessons/NNNN-slug.html` — one tightly-scoped lesson each; all link `../assets/course.css` + `../assets/course.js`.
- `reference/` — durable cheat sheets: glossary, event catalog, source map, Cordis API, turn-flow poster.
- Code links: `<a class="code" data-src="path/to/file.ts" data-lines="12-40">label</a>`; `course.js` rewrites to GitHub blob URLs at the pinned commit.
- Diagrams: inline SVG using `.dg-*` classes; nodes carrying `data-dg-info` open the shared detail panel.

## Progression logic
Sessions, services, and the loop are taught AFTER Cordis primitives; presets/scopes last because they build on both. Event catalog + source map are references, not lessons.
