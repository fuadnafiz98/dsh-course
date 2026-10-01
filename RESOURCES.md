# DeepSeek Harness Resources

## Knowledge

- [docs/architecture.md](docs/architecture.md) — the ordered map of the whole system: composition, core packages, turn flow, session log, capability seams, extension table. Use for: the "where does X live" question, always.
- [docs/cordis-primer.md](docs/cordis-primer.md) — the five Cordis ideas and the waterfall contract in two pages. Use for: the framework mental model before diving into `vendor/`.
- [docs/cordis-tutorial/](docs/cordis-tutorial/index.md) — seven hands-on Cordis chapters (first plugin → composition and HMR). Use for: writing a first real plugin.
- [docs/subsystems/](docs/subsystems/README.md) — one reference page per subsystem with type definitions and the generated Cordis API. Use for: exact event signatures and service methods.
- [docs/capability-seams.md](docs/capability-seams.md) — generated graph: every `ctx.*` service, its owning package, providers, and consumers. Use for: seam inventory and the extension cookbook.
- [docs/agent-lifecycle.md](docs/agent-lifecycle.md) — the Mermaid sequence diagram of a turn. Use for: the canonical event order.
- [packages/README.md](packages/README.md) — the package-group map. Use for: which group owns a capability family.
- [vendor/README.md](vendor/README.md) — vendored Cordis manifest + the exhaustive local-modification log. Use for: where upstream Cordis ends and Harness patches begin.
- [.agents/notes/](. agents/notes/) — the decision record archive (the "why" behind every non-obvious choice). Use for: rationale, not mechanics.
- [Cordis upstream](https://github.com/cordiverse/cordis) and the paper [_A Programming Paradigm for Spatiotemporal Composability_](https://arxiv.org/abs/2608.25512) — the framework's origin and theory. Use for: what Cordis is for beyond this codebase.
- Package READMEs under `packages/<group>/<pkg>/README.md` — the per-package contract: config, semantics, extension points, model experience. Use for: any single package in depth.

## Wisdom (Communities)

- [DeepSeek Harness Discord](https://discord.gg/4MrtZUhpxg) — official community; use for design questions and "why is it built this way" threads.
- [GitHub Discussions](https://github.com/deepseek-ai/deepseek-harness/discussions) — async Q&A and RFC-style threads.

## Gaps

- No video content exists for this codebase; the lessons under `lessons/` are the primary learning artifact.
