# Project Rules for study4xm

## Browser & Agent Multi-Session Protocol
- **New Window Requirement**: When running browser subagents or automated browser checks, ALWAYS open a new window. Do not replace, hijack, or overwrite existing open windows or tabs (`PageIdToReplace`).
- **Session Pre-Check**: Before opening or interacting with any window, inspect open browser pages and active states to verify if another agent or the user has an active session in that window. Keep all other agent and user windows intact.
- **Strict Content Isolation**: Generated academic explanations must maintain strict 6-section structural boundaries and clean visual separation across light and dark modes.
