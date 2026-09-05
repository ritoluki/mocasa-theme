# AGENTS.md

## Purpose

This repository is a Shopify Online Store theme maintained for a client. Read this file before inspecting the whole repository. Start with the files relevant to the requested change and preserve unrelated client changes.

## Project context

- Local path: `C:\shopify\mocasa-theme`
- Git repository: `https://github.com/ritoluki/mocasa-theme.git`
- Primary branch: `main`
- Shopify CLI environment: `default`
- Store configured in `shopify.theme.toml`: `m0ys5p-ga.myshopify.com`
- Customer-facing domains: `mocasa.cloud` and `www.mocasa.cloud`
- This is a standard Shopify Liquid theme. Main code lives in `assets/`, `blocks/`, `config/`, `layout/`, `locales/`, `sections/`, `snippets/`, and `templates/`.
- Never store Shopify passwords, session cookies, access tokens, customer data, or other secrets in this repository.

## Current deployment snapshot

The following was verified on 2026-09-06 and can become stale. Always run `shopify.cmd theme list --environment default` before previewing, pushing, or publishing.

- Live theme at that time: `Halloween 27/8/26` (`#155939274919`)
- Review/draft theme: `Mocasa Header Refactor 2026-09-06` (`#156182577319`)
- The draft theme was uploaded with `--unpublished`; seeing `mocasa.cloud` in its preview URL does not mean it is live. The black Shopify preview bar and `Draft` label identify preview mode.
- Publishing theme `#156182577319` would make it appear on the customer-facing domains. Never publish without the user's explicit approval in the current conversation.
- Do not delete the previous live theme after publishing; retain it for rollback unless the user explicitly requests deletion.

## Git workflow

Before starting a change:

```powershell
git status
git switch main
git pull --ff-only origin main
git switch -c fix/short-description
```

- Use a fresh branch for each bug fix or feature (`fix/...`, `feat/...`, or `refactor/...`).
- Do not work directly on `main` unless the user explicitly requests it.
- Do not overwrite, reset, clean, or discard uncommitted work. Existing changes may belong to the user.
- Commit only files relevant to the task, push the branch, and merge through a pull request.
- After a merge, update local `main` with `git switch main` followed by `git pull --ff-only origin main`.
- If Git reports dubious ownership in the Codex sandbox, use a per-command option such as `git -c safe.directory=C:/shopify/mocasa-theme status`. Do not change the user's global Git configuration merely to bypass it.

## Shopify workflow

The Shopify Admin theme editor and apps can change theme code independently of Git. At the beginning of new work, confirm whether the live theme has changed since the last sync. Only pull live code into a clean, dedicated sync branch, review the diff, and commit it before starting feature work.

Useful commands (PowerShell):

```powershell
shopify.cmd theme list --environment default
shopify.cmd theme dev --environment default
shopify.cmd theme check --fail-level error
shopify.cmd theme push --unpublished --theme "Descriptive Review Theme Name" --environment default
```

To sync live theme code, first ensure the worktree is clean and create a sync branch, then run:

```powershell
shopify.cmd theme pull --live --environment default
```

Release flow:

1. Develop and verify locally with `shopify.cmd theme dev --environment default`.
2. Push a new unpublished theme; do not push directly to live.
3. Open the uploaded theme and use Shopify's preview bar **Copy link** action to send the review URL to the client.
4. Wait for explicit client/user approval.
5. Re-run `shopify.cmd theme list --environment default` and verify the exact theme name and ID.
6. Publish only the approved theme. Publishing is a high-impact action and requires explicit authorization in the current conversation.
7. Verify the storefront in an incognito window and keep the former live theme available for rollback.

When authorization is given, the command format is:

```powershell
shopify.cmd theme publish --theme THEME_ID --environment default
```

The CLI may ask for confirmation. Do not infer approval from a previous session or merely from a successful unpublished push.

## Header and homepage decisions already implemented

The responsive header refactor was merged into `main` by commit `5e0d883` (merge of `5034325`). Relevant files are:

- `assets/header-disclosure-navigation.js`
- `blocks/_header-menu.liquid`
- `sections/header-group.json`
- `sections/header.liquid`
- `snippets/header-category-navigation.liquid`
- `snippets/header-drawer.liquid`
- `snippets/header-utility-navigation.liquid`
- `sections/hero.liquid`
- `templates/index.json`

Expected behavior to preserve unless the user requests another design:

- Desktop has a compact utility navigation and a separate product-category row.
- Mobile shows hamburger, search, centered logo, account, and cart; category links belong inside the hamburger drawer rather than permanently below the header.
- The drawer close button is on the top-right with a generous touch target.
- Categories appear first; Home, Tracking Order, Customer Service, and About Us appear below a divider with consistent typography.
- Tracking Order and Customer Service submenus animate open and use readable mobile text.
- Currency/language controls are pinned to the drawer's bottom-right.
- The obsolete featured-product preview in the drawer was removed.
- The homepage mobile hero uses the full landscape image without aggressive cropping. The old purple gap and rough `SHOP NOW` button were removed, and the hero itself links to `shopify://collections/all`.

## Verification expectations

- Check the requested page at both desktop and mobile widths. Header-related changes must be tested with the drawer closed and open, including nested menus.
- Run `git diff --check` for edited files.
- Run `node --check` for edited standalone JavaScript files when applicable.
- Run Shopify Theme Check and clearly distinguish new diagnostics in changed files from legacy diagnostics elsewhere. As of 2026-09-06, the repository had 12 pre-existing Theme Check errors outside the header/hero files; do not claim the entire theme is clean unless a fresh full check passes.
- Confirm the local preview returns successfully and visually inspect material layout changes before committing.

## Safety and communication

- Prefer reversible actions and make the smallest change that satisfies the request.
- Never publish, delete a theme, edit production settings, install/uninstall apps, or change domains without explicit user authorization.
- A request to review, diagnose, or explain is not authorization to edit or deploy.
- Before any push or publish, report the target store, theme name/ID, and whether it is live, unpublished, or development.
- Communicate in Vietnamese unless the user asks for another language. Commands should be suitable for Windows PowerShell.
