## Web design process (paste this block into the CLAUDE.md of every design project)

- Design work runs in five stages, one command each: /design-1-reference, /design-2-system, /design-3-build, /design-4-test, /design-5-fix. Never start the next stage on your own. Finish the current stage, report, and wait for me.
- DESIGN.md is the source of truth. Re-read it before writing any UI code and use only values in it. If a skill conflicts with DESIGN.md, DESIGN.md wins. Tell me what you overrode.
- Skill names: Taste is design-taste-frontend. Motion is Emil Kowalski's emil-design-eng and animate. Spacing, type, hierarchy and layout review is /impeccable.
- Never let Impeccable rewrite DESIGN.md (document, extract, a redesign, or a doctor repair) without asking me first.
- A page is not done after a build. It is done after /design-4-test and /design-5-fix have run.
- Stack: React, Vite and Tailwind unless this project already uses something else. Mobile first. Never migrate an existing project's stack.
- Copy that ships on the site: no em dashes, no en dashes, no curly quotes, no mention of AI as the builder, no dev jargon.
