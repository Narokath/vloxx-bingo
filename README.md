# Vloxx LCM Bingo

A static GitHub Pages website for predicting which mechanics Vloxx LCM will have.

The pool contains 38 predictions. Each card randomly selects 24, plus a free center square.

## Host setup

Edit `items.js` to set the title, collection, and predictions. Provide at least 24 unique predictions (up to 200 characters each). A longer list also randomizes which predictions appear. The center is free.

No build or installation is required. Run `python -m http.server 8000` here and open `http://localhost:8000` for a local preview.

## GitHub Pages

Upload `index.html`, `styles.css`, `items.js`, `app.js`, `.nojekyll`, and `vloxx_pleasure_pain.png` to your repository root. In **Settings → Pages**, select **Deploy from a branch**, your branch (usually `main`), and **/(root)**, then save. GitHub will show the published URL.

[Official publishing instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Cards and sharing

- Shuffle generates a random card. Click predictions to mark them; completed lines are highlighted.
- Copy card link preserves the predictions, order, title, and current marks. Old links still work after list changes. Explicit wording corrections update saved cards without changing their layout or marks. Copy a fresh link to share updated progress.
- Save as image downloads a PNG. Print / save PDF opens the browser print dialog.
- The latest card saves automatically when browser storage is available.
- The short card ID is a label, not a retrieval key. Use the full link to recover a card. No database or accounts are required.
- Cards and marks are editable client-side. This is casual prediction bingo, not a tamper-proof competition or shared live scoreboard.

System fonts are used. Gameplay runs in the browser.
