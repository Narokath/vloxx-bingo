# Vloxx LCM Bingo

A static GitHub Pages website for predicting which mechanics Vloxx LCM will have.

The pool contains 41 predictions. Each card randomly selects 24, plus a free center square.

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

## Current prediction pool

1. Spreads on more than 3 players
2. Excision Extremis on more than 4 players
3. Crossing walls kills players instantly
4. Weapons generate Empowerment faster
5. At least 30% more health
6. A secret additional weapon
7. P4 lasts longer than 2 minutes
8. Tethers on 5 players
9. Weapons are harder to crowd control
10. Spread puddles persist throughout each phase
11. Spear puddles persist throughout each phase
12. Spear puddles cannot be blocked or reflected
13. Orbs do not remove Empowerment
14. Echoing Blade red attacks remove Ascension
15. Moving during staff red attacks removes Ascension
16. Moving during spear red attacks removes Ascension
17. More champion and elite adds during phase transitions
18. Two weapons active at once
19. Fewer orbs spawn
20. Tethers launch players farther and faster
21. Spreads overlap with weapon mechanics
22. Phase transitions have a shorter time limit
23. An additional Excision Extremis cast in P4
24. Weapons gain new attacks in P4
25. Elite and champion adds respawn after the breakbar
26. Standing in puddles increases Empowerment
27. Safe areas shrink each phase
28. The final phase repeats all three weapon mechanics
29. Puddles expand over time
30. Excision Extremis hits remove Ascension
31. Division Eternal deals more damage
32. The Fixate target changes more quickly
33. Greens must be resolved more quickly
34. A rotating spear wall in P2
35. Start with fewer than 10 stacks of Ascension
36. LCM breaks the Convergence
37. The release is delayed
38. Vision Eternal is cast during P4
39. Convergence platforms
40. Each active weapon grants the boss a boon
41. Vision Eternal removes Ascension
