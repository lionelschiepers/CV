# Agent instructions

## Keep CV.pdf in sync with the site

`LandingPage/public/CV.pdf` is the downloadable CV that recruiters forward. Whenever the CV content changes
(`LandingPage/index.html`, or print styles in `LandingPage/style.css`), regenerate `CV.pdf` in the same change so the
PDF never drifts from the website.

The PDF is rendered from the built site using the `@media print` styles in `LandingPage/style.css`:

1. Build and serve the site: `npm run build`, then `npx vite preview --port 4317`.
2. From the repo root, render the page to PDF with Playwright and Microsoft Edge (install `playwright-core` in a
   temporary folder, not in this repo):

   ```js
   const { chromium } = require('playwright-core');
   (async () => {
     const browser = await chromium.launch({ channel: 'msedge' });
     const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
     await page.goto('http://localhost:4317/', { waitUntil: 'networkidle' });
     await page.emulateMedia({ media: 'print', colorScheme: 'light' });
     await page.waitForTimeout(2500); // let the career chart animation finish
     await page.pdf({
       path: 'LandingPage/public/CV.pdf',
       format: 'A4',
       printBackground: true,
       margin: { top: '14mm', bottom: '14mm', left: '16mm', right: '16mm' },
     });
     await browser.close();
   })();
   ```

3. Check the result: contact details and LinkedIn on page 1, no headings orphaned at the bottom of a page, then run
   `npm run build` again so `dist` contains the new PDF.

## Writing the CV

The audience is headhunters and clients hiring a freelancer. Keep these rules when editing content:

- **Positioning.** Lionel works freelance only, since April 2022; Capgemini was his last salaried job. Target roles
  are platform, cloud or solution architect and lead DevOps engineer. Don't add titles such as "Head of platform" or
  anything suggesting he wants a salaried job.
- **Confidentiality.** Never name a client's internal project or product names, and don't expose internal details of
  their platforms. Describe what was built in generic terms.
- **Verifiable claims.** Back every claim with the client's code or ask Lionel first. Word it precisely ("public
  access off or limited to the corporate VPN", not "no public access") and leave out figures that can't be checked,
  such as commit percentages.
- **Decisions before tools.** Lead with the design decision and its outcome, then name the technologies. A buzzword
  like "zero trust" needs the concrete controls next to it.
- **Timeline.** The hero career chart is to scale from January 2019 (positions are months since then, also in
  `script.js`). Roles that started earlier are drawn as a stub fading off the left edge.
- **Visual restraint.** Headings stay at weight 600 or less at normal width, with no all-caps labels, rotating quotes
  or decorative motion. The career chart is the one bold element.
