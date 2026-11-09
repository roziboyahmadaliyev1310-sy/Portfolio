# Personal portfolio (decorative night-sky theme)

Plain HTML, CSS and JavaScript. No build step, so it runs directly on GitHub Pages.

## Files

| File | What it does |
| --- | --- |
| `index.html` | Page structure and the background decoration layers |
| `style.css` | Themes (night and daybreak), decorations, layout, print styles |
| `data.js` | **All your content.** This is the only file you need to edit |
| `script.js` | Renders the sections, star field, typewriter, skill map, live GitHub data |
| `photo.jpg` | Your picture (you add it). Falls back to your initials if missing |
| `resume.pdf` | Your resume (you add it) |

## Publish it (new repository)

1. On GitHub, create a **new repository** named `portfolio` (public). Do not add a README there.
2. In the folder with these files, run:

   ```bash
   git init
   git add README.md
   git commit -m "Add README"
   git add data.js
   git commit -m "Add portfolio content data"
   git add index.html style.css
   git commit -m "Add page structure and styles"
   git add script.js
   git commit -m "Add interactive behavior and GitHub data"
   git add photo.jpg resume.pdf
   git commit -m "Add photo and resume"
   git branch -M main
   git remote add origin https://github.com/roziboyahmadaliyev1310-sy/portfolio.git
   git push -u origin main
   ```

3. In the repository go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then Save.
4. After a minute your live site is at `https://roziboyahmadaliyev1310-sy.github.io/portfolio/`.

Keep making small commits with clear messages as you change things. The site shows the commit count and the latest commits automatically.

## What to edit in `data.js`

- `GITHUB_USER` and `PROFILE.mainRepo` (needed for live site, repository and commit links)
- Your name, roles, tagline, email, location
- `ABOUT`, `CONSOLE`, `TIMELINE`, `CLASSES`, `SKILLS`, `PROJECTS`, `RESUME`, `HOMEWORK`

Only list a skill if one of your projects uses it, and put that project's id in `usedIn`.

## Notes

- Commit counts come from the public GitHub API (about 60 requests per hour per visitor). Results are cached for the browser session. If the API is unavailable, the buttons simply say "Commits".
- The contact form opens the visitor's email app. For a real form, create a Formspree form and paste its URL into `PROFILE.formEndpoint`.
- Animations switch off for visitors who prefer reduced motion. The Print button prints only the resume.
