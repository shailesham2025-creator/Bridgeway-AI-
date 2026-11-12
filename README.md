# Bridgeway AI

Bridge the gap between where you are and the job you want.

A free, rule-based career-guidance app for 5 roles: Full Stack Developer, Data Analyst, Data Scientist, AI Engineer, Cybersecurity Engineer.

## Files
- `index.html` - page shell
- `styles.css` - design system (emerald/teal + slate, light/dark)
- `app.js` - all logic: role data, readiness score, roadmap, quizzes, ATS checker, resume builder, router

## Run locally
1. Unzip the folder.
2. Double-click `index.html` to open it in Chrome. No install or build step is needed.

## Deploy free
Drag the unzipped folder onto https://app.netlify.com/drop, or push it to GitHub and import it in Vercel (framework: Other, no build command).

## Notes
- Accounts and data are stored in your browser (localStorage) in this version.
- Google login and password reset need a backend such as Supabase and are not active here.
- The ATS checker takes pasted resume text. Resume PDF export uses the browser print dialog (Save as PDF).
- Readiness % = sum(weight x coverage) / sum(weight) x 100, with Critical = 3, High = 2, Nice-to-have = 1 and coverage = min(your level / required level, 1).
