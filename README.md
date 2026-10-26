# Nicole James L. Maloloy-on | Personal CV Website

A responsive personal CV and portfolio for **Nicole James L. Maloloy-on**, an Information Technology student and aspiring web developer. It includes education, skills, a project showcase, student experience, and contact links.

**Live Vercel link:** `https://YOUR_PROJECT_NAME.vercel.app`

## Technologies

- HTML5
- CSS3 (Grid, Flexbox, custom properties)
- Vanilla JavaScript
- Google Fonts: Playfair Display and DM Sans

No frameworks, libraries, or build tools are required.

## Folder structure

```text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── assets/
│   ├── profile.jpg               # Nicole's portrait; initials appear if unavailable
│   ├── project-chat.svg          # Illustrative preview; replace with a screenshot if available
│   └── project-shop.svg          # Illustrative preview; replace with a screenshot if available
└── README.md
```

If `assets/profile.jpg` is absent, the website displays Nicole's initials automatically.

## Personalize before publishing

1. Review the personal and education details for accuracy before publishing.
2. Review the two project descriptions and replace the illustrative previews with real screenshots if available. Add verified technologies or live demo links only when you have them.
3. Replace `assets/profile.jpg` if you want to use another portrait; the initials fallback remains available.
4. Replace example skill percentages with honest self-assessments and update both the visible percentages and `aria-valuenow` values.
5. Replace the Vercel link above and review the supplied social links before publishing.

## Preview locally

Open `index.html` in a browser. A local server is helpful for a closer deployment preview, but no installation or build is needed.

## GitHub and Vercel

1. Create an empty public GitHub repository.
2. In this folder, run `git init`, `git add .`, and `git commit -m "Add personal CV website"`.
3. Run `git branch -M main`, then `git remote add origin https://github.com/maloloy-onnicolejames-maker/YOUR_REPOSITORY.git`.
4. Run `git push -u origin main`.
5. In Vercel, choose **Add New → Project**, import the GitHub repository, select **Other** as the framework preset, leave the build command empty, and set the output directory to `.` if Vercel asks for one.
6. Deploy, copy the live URL, and replace the placeholder at the top of this README.

## Final checks

- Check every navigation link, project filter, theme toggle, mobile menu, and back-to-top button.
- Open each phone, GitHub, LinkedIn, Facebook, and repository link.
- Confirm the portrait or initials fallback and both project preview images display.
- Review the page at phone, tablet, laptop, and desktop widths in light and dark modes.
- Test keyboard navigation, visible focus, and reduced-motion settings.
