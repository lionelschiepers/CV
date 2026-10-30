# Lionel Schiepers, CV

Freelance platform architect and DevOps engineer, based in Brussels. I design Azure platforms, landing zones and
delivery pipelines that let development teams ship safely, and I have been building software since 1998.

- **Read the CV:** [lionelschiepers.github.io/CV](https://lionelschiepers.github.io/CV/)
- **Download the PDF:** [CV.pdf](https://lionelschiepers.github.io/CV/CV.pdf)
- **Get in touch:** [LinkedIn](https://www.linkedin.com/in/lionel-schiepers-3a727a156/) or
  [lionel_schiepers@hotmail.com](mailto:lionel_schiepers@hotmail.com)

## What I do

- **Now:** I'm building Cegeka's self-service internal developer platform. One click gives a project its GitHub
  organisation, repositories, Azure landing zone, pipelines, quality gates and team access. Built with .NET 10, Azure
  Durable Functions, React, TypeScript, Terraform and GitHub Enterprise.
- **Roles:** platform, cloud or solution architect, head of platform, lead DevOps engineer. Freelance since 2022.
- **Before:** .NET, Azure and DevOps for financial data (Bureau van Dijk / Moody's, 21 years), insurance, rail and
  automotive.

## About this site

A single static page with no framework: HTML, CSS and vanilla JavaScript, built with Vite and deployed to GitHub
Pages.

- The hero opens with my career since 2019 drawn to scale as a CSS timeline.
- Typography uses the self-hosted Archivo variable font, using its width axis for hierarchy.
- Light and dark themes follow the system setting and can be switched by hand.
- A print stylesheet turns the page into the downloadable A4 PDF.
- A strict Content Security Policy allows no inline scripts and no third-party fonts or scripts.
- Structured data (schema.org `ProfilePage` and `Person`) helps search engines describe the profile.

## Run it locally

You need [Node.js](https://nodejs.org/) 24 or later.

```sh
npm install
npm start          # dev server on http://localhost:5173
npm run build      # production build in dist/
npx vite preview   # serve the production build
```

Format with `npx prettier --write "LandingPage/**/*.{html,css,js}"`.

## Update the CV

1. Edit the content in `LandingPage/index.html`.
2. Regenerate `LandingPage/public/CV.pdf` from the print stylesheet, as described in [AGENTS.md](AGENTS.md).
3. Open a pull request. CI builds the site and posts Lighthouse scores, and merging to `main` deploys it.

## Project structure

```
.
├── .github/workflows/
│   ├── static.yml        # build, Lighthouse CI, deploy to GitHub Pages
│   └── semgrep.yml       # Semgrep security scan
├── LandingPage/          # Vite root
│   ├── index.html        # all CV content
│   ├── style.css
│   ├── script.js         # theme, timeline, contact form, back to top
│   ├── fonts/            # Archivo variable font and its licence
│   ├── icons/            # SVG sprites for social links and technologies
│   └── public/           # copied as-is: CV.pdf, CV.docx, theme-init.js, social preview image, robots.txt
├── AGENTS.md             # instructions for coding agents
├── lighthouserc.js
└── vite.config.js
```

## Licence

The code is under the [MIT licence](LICENSE). The Archivo font is under the SIL Open Font License
(`LandingPage/fonts/archivo-LICENSE.txt`). The React, TypeScript and OpenTelemetry icons come from
[Simple Icons](https://simpleicons.org/) (CC0). The CV content and portrait are mine and are not covered by the MIT
licence.
