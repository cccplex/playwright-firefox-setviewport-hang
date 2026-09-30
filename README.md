# Headed Firefox `setViewportSize()` hang

Minimal reproduction using only the Playwright Node.js library.
With Playwright `1.64.0-alpha-2026-09-30`, headed Firefox starts successfully, but dynamically changing the page viewport does not return.

## Run

Run this in a graphical desktop session:

```bash
npm install
npx playwright install firefox
node repro.js
```

Expected: `page.setViewportSize({ width: 400, height: 800 })` returns and the script prints `After resize: [ 400, 800 ]`.

Actual: the script prints `Starting setViewportSize...`, remains at the `await page.setViewportSize(...)` call for approximately 20 seconds, then prints `setViewportSize did not return within 20 seconds` and exits with code 124.

With the same Playwright version, headless Firefox completes the dynamic resize, and headed Firefox works when `{ viewport: { width: 400, height: 800 } }` is supplied to `browser.newContext()` instead.
The latest stable release tested, `1.63.0`, also completed the headed dynamic resize on this machine; the hang reproduces with the alpha version pinned here.
