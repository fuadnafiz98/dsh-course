# Inside DeepSeek Harness — an interactive course

A visual, click-through course on how [deepseek-harness](https://github.com/deepseek-ai/deepseek-harness)
is actually built: Cordis plugins, the agent loop, the session log, the tool pipeline, and the LLM seam.
Every claim links to real source at a pinned commit.

**Live site:** https://fuadnafiz98.github.io/dsh-course/

## Layout

- `index.html` — hub: layered architecture map
- `lessons/` — 12 progressive lessons (0001–0012)
- `reference/` — source map, glossary, event catalog, Cordis API, patch tour, turn flow
- `assets/` — shared stylesheet + interactivity (quizzes, diagram panels, progress)
- `MISSION.md` / `NOTES.md` / `RESOURCES.md` — the teach-skill workspace docs

No build step — plain HTML/CSS/JS. Serve statically anywhere.
