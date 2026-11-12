const $ = s => document.getElementById(s), E = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const L = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v } catch (e) { return d } }, S = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch (e) { } };
const go = p => { location.hash = p }, sc = i => $(i).scrollIntoView({ behavior: 'smooth' });
document.documentElement.dataset.theme = L('bw_t', 'dark');
const th = () => { const t = document.documentElement.dataset.theme == 'light' ? 'dark' : 'light'; document.documentElement.dataset.theme = t; S('bw_t', t) };
const LV = ['None', 'Beginner', 'Intermediate', 'Advanced', 'Expert'], RL = ['', 'Beginner', 'Intermediate', 'Advanced'], IM = { C: 'Critical', H: 'High', N: 'Nice-to-have' }, W = { C: 3, H: 2, N: 1 };
const R = {
  fs: { n: 'Full Stack Developer', s: 'HTML & CSS:C:2,JavaScript:C:3,React:C:2,Node.js:H:2,SQL:C:2,Git:H:2,REST APIs:H:2,Deployment:N:1', k: 'html,css,javascript,typescript,react,node.js,express,rest api,sql,postgresql,mongodb,git,github,docker,testing,responsive,deployment,tailwind,agile,api' },
  da: { n: 'Data Analyst', s: 'Excel:C:3,SQL:C:3,Python:H:2,Statistics:C:2,Data Visualization:C:2,Data Cleaning:H:2,Communication:H:2,Git:N:1', k: 'excel,sql,python,tableau,power bi,pandas,statistics,dashboard,data cleaning,visualization,reporting,kpi,analysis,insights,a/b testing,etl,stakeholder,pivot,data analysis,communication' },
  ds: { n: 'Data Scientist', s: 'Python:C:3,Statistics:C:3,SQL:H:2,Machine Learning:C:2,Data Visualization:H:2,Pandas:C:2,Deep Learning:N:1,Git:N:1', k: 'python,pandas,numpy,scikit-learn,machine learning,statistics,sql,regression,classification,tensorflow,pytorch,jupyter,feature engineering,model,visualization,hypothesis testing,deep learning,kaggle,nlp,data science' },
  ai: { n: 'AI Engineer', s: 'Python:C:3,Machine Learning:C:3,Deep Learning:H:2,Prompt Engineering:H:2,REST APIs:H:2,Git:H:2,Mathematics:H:2,Deployment:N:2', k: 'python,machine learning,deep learning,pytorch,tensorflow,llm,prompt engineering,nlp,transformers,api,rag,docker,deployment,fastapi,git,embeddings,vector,huggingface,mlops,neural network' },
  cy: { n: 'Cybersecurity Engineer', s: 'Networking:C:3,Linux:C:2,Security Fundamentals:C:3,Python:H:2,Cryptography:H:2,Web Security:C:2,Incident Response:H:2,Git:N:1', k: 'network,linux,security,siem,firewall,penetration testing,owasp,cryptography,incident response,vulnerability,python,wireshark,nmap,tryhackme,threat,encryption,compliance,malware,iam,risk' }
};
for (const k in R) R[k].s = R[k].s.split(',').map(x => { const a = x.split(':'); return { n: a[0], i: a[1], r: +a[2] } }), R[k].k = R[k].k.split(',');
const PR = { fs: [['Personal portfolio site', 20], ['Task manager app (React + API)', 40], ['Blog with auth and database', 50], ['E-commerce mini store', 60]], da: [['Sales dashboard in Excel', 15], ['SQL analysis of a public dataset', 25], ['Power BI / Python dashboard', 30], ['Customer churn report', 35]], ds: [['EDA on a Kaggle dataset', 20], ['House price predictor', 30], ['Customer segmentation', 30], ['End-to-end ML report', 50]], ai: [['Chatbot with a free open model', 25], ['Image classifier', 30], ['Document Q&A (RAG) demo', 40], ['Deploy a model as an API', 35]], cy: [['Home lab network map', 15], ['TryHackMe write-ups', 30], ['Vulnerability scan report', 25], ['Log analysis project', 30]] };
const ST = ['Plan scope and write a README outline', 'Set up the project and core structure', 'Build the main features', 'Test, fix bugs and polish', 'Publish on GitHub and add it to your resume'];
const Q = {
  JavaScript: [['Which keyword declares a block-scoped variable that can be reassigned?', ['var', 'let', 'const', 'def'], 1, 'let is block-scoped and reassignable; const cannot be reassigned.'], ['What does === check?', ['Value only', 'Type only', 'Value and type', 'Reference only'], 2, 'Strict equality compares value and type, with no coercion.'], ['Which method adds an item to the end of an array?', ['push', 'pop', 'shift', 'slice'], 0, 'push appends; pop removes from the end.']],
  SQL: [['Which clause filters rows?', ['ORDER BY', 'GROUP BY', 'WHERE', 'LIMIT'], 2, 'WHERE filters rows before grouping.'], ['Which JOIN keeps all rows from the left table?', ['INNER', 'LEFT', 'CROSS', 'SELF'], 1, 'LEFT JOIN keeps every left row, with NULLs where there is no match.'], ['Which function counts rows?', ['SUM', 'COUNT', 'AVG', 'MAX'], 1, 'COUNT(*) returns the number of rows.']],
  Python: [['Which type is immutable?', ['list', 'dict', 'tuple', 'set'], 2, 'Tuples cannot be changed after creation.'], ['What does len([1,2,3]) return?', ['2', '3', '4', 'Error'], 1, 'The list has three items.'], ['Which keyword defines a function?', ['func', 'def', 'function', 'lambda only'], 1, 'Functions are defined with def.']],
  Statistics: [['The middle value of sorted data is the…', ['Mean', 'Median', 'Mode', 'Range'], 1, 'The median is the middle value and resists outliers.'], ['A p-value below 0.05 usually suggests…', ['No effect', 'Result unlikely under the null', 'Proof of cause', 'A bad sample'], 1, 'It means the data would be unlikely if the null were true.'], ['Standard deviation measures…', ['Centre', 'Spread', 'Sample size', 'Bias'], 1, 'It describes how spread out values are.']],
  Networking: [['Which protocol resolves domain names?', ['DHCP', 'DNS', 'ARP', 'FTP'], 1, 'DNS maps names to IP addresses.'], ['HTTPS uses which default port?', ['80', '21', '443', '25'], 2, 'HTTPS runs on 443.'], ['Which layer is IP in the OSI model?', ['2', '3', '4', '7'], 1, 'IP lives at Layer 3, the network layer.']],
  Git: [['Which command saves staged changes?', ['git add', 'git commit', 'git push', 'git pull'], 1, 'commit records staged changes locally.'], ['Which command uploads commits to a remote?', ['git push', 'git fetch', 'git clone', 'git log'], 0, 'push sends local commits to the remote.'], ['What does git clone do?', ['Deletes a repo', 'Copies a repo', 'Merges branches', 'Resets files'], 1, 'clone copies a remote repository locally.']]
};
const NAV = [['dashboard', 'Dashboard', '⌂'], ['roadmap', 'Roadmap', '🗺'], ['gap', 'Skill Gap', '📊'], ['projects', 'Projects', '🛠'], ['quiz', 'Assessments', '✎'], ['ats', 'ATS Checker', '✔'], ['resume', 'Resume', '📄'], ['progress', 'Progress', '📈'], ['settings', 'Settings', '⚙']];
const U = () => L('bw_s', null), D = () => L('bw:' + U(), {}), SD = d => S('bw:' + U(), d);
const PL = role => { const s = R[role].s; return [1, 2, 3, 4, 5, 6].map(m => { const a = s[(m - 1) % s.length].n, b = s[m % s.length].n; return { m, g: m < 6 ? 'Master ' + a + ' and start ' + b : 'Polish your portfolio and apply for jobs', t: m < 6 ? ['Learn ' + a + ' fundamentals (freeCodeCamp, YouTube or official docs)', 'Practise ' + a + ' with 10 small exercises (Kaggle, TryHackMe free rooms or docs examples)', 'Build a mini project that uses ' + a, 'Take the ' + a + ' assessment and review mistakes'] : ['Finish your top 2 portfolio projects and publish them on GitHub', 'Run your resume through the ATS checker until it scores 80+', 'Write a LinkedIn summary and ask 2 people for feedback', 'Apply to 5 roles a week and practise interview questions'] } }) };
const cov = d => R[d.p.role].s.map(s => { const y = (d.sk || {})[s.n] || 0; return { ...s, y, c: Math.min(y / s.r, 1) } });
const rdy = d => { const a = cov(d); return Math.round(a.reduce((t, s) => t + W[s.i] * s.c, 0) / a.reduce((t, s) => t + W[s.i], 0) * 100) };
const tk = d => { const P = PL(d.p.role), all = P.flatMap(m => m.t.map((x, i) => ({ id: m.m + '-' + i, m: m.m, x }))), dn = all.filter(t => (d.tasks || {})[t.id]), am = (all.find(t => !(d.tasks || {})[t.id]) || { m: 6 }).m, pg = all.filter(t => t.m == am && !(d.tasks || {})[t.id]); return { P, all, done: dn.length, prog: pg.length, ns: all.length - dn.length - pg.length, next: all.filter(t => !(d.tasks || {})[t.id]).slice(0, 3), am } };
const rec = (d, msg) => { d.trend = (d.trend || []).concat({ t: new Date().toLocaleDateString(), v: rdy(d) }).slice(-30); d.log = [new Date().toLocaleDateString() + ' — ' + msg].concat(d.log || []).slice(0, 8); };
const ring = (p, z) => `<svg width="${z || 110}" height="${z || 110}" viewBox="0 0 36 36" role="img" aria-label="${p}%"><circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--bd)" stroke-width="3"/><circle cx="18" cy="18" r="15.9155" fill="none" stroke="var(--pr)" stroke-width="3" stroke-linecap="round" stroke-dasharray="${p} 100" transform="rotate(-90 18 18)"/><text x="18" y="20" text-anchor="middle" font-size="8" font-weight="700" fill="var(--tx)">${p}</text></svg>`;
const bar = p => `<div class="bar"><i style="width:${p}%"></i></div>`;
const line = v => { if (!v.length) return '<p class="m">No data yet.</p>'; const w = 320, h = 100, pts = v.map((y, i) => (v.length > 1 ? i / (v.length - 1) * (w - 20) : (w - 20) / 2) + 10 + ',' + (h - 10 - y / 100 * (h - 20))); return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="110"><polyline fill="none" stroke="var(--pr)" stroke-width="2.5" points="${pts.join(' ')}"/>${pts.map(p => `<circle cx="${p.split(',')[0]}" cy="${p.split(',')[1]}" r="3.5" fill="var(--p2)"/>`).join('')}</svg><p class="m">Latest: ${v[v.length - 1]}/100 · ${v.length} check(s)</p>` };
const lab = o => R[o] ? R[o].n : o;
const LOGO = (cls = '') => `<div class="brand ${cls}" onclick="go(U()?'dashboard':'home')"><div class="brand-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18h18"/><path d="M5 18C5 11 8.5 7 12 7s7 4 7 11"/><path d="M8.5 18V10"/><path d="M12 18V7"/><path d="M15.5 18V10"/><path d="M4 18v3"/><path d="M20 18v3"/></svg></div><div class="brand-name">Bridgeway <span class="brand-ai">AI</span></div></div>`;
const THEME_BTN = `<button class="theme-btn" onclick="th()" title="Toggle theme" aria-label="Toggle theme"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></button>`;
/* ---------- SVG Visuals ---------- */
const constellation = (roleKey, userSkills) => {
  const skills = (R[roleKey] || R.fs).s;
  const n = skills.length;
  const w = 380, h = 300, cx = 190, cy = 150, r = 105;
  let lines = '', nodes = '';
  skills.forEach((s, i) => {
    const theta = (2 * Math.PI * i) / n - Math.PI / 2;
    const x = Math.round(cx + r * Math.cos(theta));
    const y = Math.round(cy + r * Math.sin(theta));
    const yl = (userSkills || {})[s.n] || 0;
    const isReady = yl >= s.r;
    const isProg = yl > 0 && !isReady;
    const color = isReady ? '#10b981' : isProg ? '#38bdf8' : '#94a3b8';
    const bgNode = isReady ? 'rgba(16, 185, 129, 0.2)' : isProg ? 'rgba(56, 189, 248, 0.18)' : 'rgba(148, 163, 184, 0.15)';
    lines += `<line x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" stroke="${color}" stroke-width="1.8" stroke-dasharray="${isReady ? 'none' : '3 3'}" opacity="0.65"/>`;
    const shortName = s.n.length > 9 ? s.n.slice(0, 8) + '…' : s.n;
    nodes += `<g transform="translate(${x},${y})"><circle r="20" fill="${bgNode}" stroke="${color}" stroke-width="1.8"/><text text-anchor="middle" dy="4" font-size="8" font-weight="700" fill="${color}">${E(shortName)}</text></g>`;
  });
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" height="260" style="overflow:visible;margin:4px auto;display:block">${lines}<circle cx="${cx}" cy="${cy}" r="32" fill="#4f46e5" stroke="#818cf8" stroke-width="2.5" filter="drop-shadow(0 0 14px rgba(99, 102, 241, 0.5))"/><text x="${cx}" y="${cy - 3}" text-anchor="middle" font-size="9" font-weight="800" fill="#ffffff">TARGET</text><text x="${cx}" y="${cy + 9}" text-anchor="middle" font-size="8.5" font-weight="700" fill="#c7d2fe">ROLE</text>${nodes}</svg>`;
};

/* ---------- landing ---------- */
const TOOLS = [
  ['Skill Gap & Constellation', 'Visual hub-and-spoke graph comparing your skills with real industry job requirements.'],
  ['6-Month Weekly Roadmap', 'Curated week-by-week actionable milestones with free, verified resources.'],
  ['Portfolio Project Builder', '4 production-ready portfolio projects per role with 5 milestone steps.'],
  ['Skill Assessments', 'Timed 3-minute quizzes with instant feedback that automatically level up your skill profile.'],
  ['In-Browser ATS Checker', 'Scan your resume against 20+ role keywords, formatting, sections, and action verbs.'],
  ['Free ATS Resume Builder', 'ATS-compliant templates with live preview, custom colors, and clean PDF export.'],
  ['Seniority & Progress Tracker', 'Track your trajectory from Junior to Mid-level and Senior with readiness trendlines.']
];

function home() {
  return `
<header class="nav-wrap">
  <div class="nav">
    ${LOGO()}
    <div class="nav-links">
      <a onclick="sc('features')">Features</a>
      <a onclick="sc('preview')">Live Demo</a>
      <a onclick="sc('careers')">Careers</a>
      <a onclick="sc('how')">How it works</a>
      ${THEME_BTN}
      <a onclick="go('login')" style="font-weight:600">Log in</a>
      <button class="btn s" onclick="go('login')">Get started</button>
    </div>
  </div>
</header>
<div class="wrap">
  <section class="hero">
    <div class="hero-glow"></div>
    <div class="hero-content">
      <div class="hero-badge">THE ALL-IN-ONE CAREER PLATFORM · 100% FREE · NO SUBSCRIPTIONS</div>
      <h1 class="hero-title">
        Bridge the gap between<br>
        <span class="hero-hl">where you are</span> and the job<br>
        you want.
      </h1>
      <p class="hero-desc">Bridgeway <span class="brand-ai">AI</span> maps your skills against real industry benchmarks, generates an actionable 6-month roadmap, tracks your seniority readiness, and validates your resume with an on-device ATS checker.</p>
      <div class="hero-actions">
        <button class="btn btn-lg" onclick="go('login')">🚀 Build My Free Roadmap</button>
        <button class="btn o btn-lg" onclick="sc('preview')">Explore Dashboard Preview</button>
      </div>
    </div>
  </section>

  <div class="stat-ticker">
    <div class="stat-item"><span class="stat-dot"></span> 5 High-Demand Tech Tracks</div>
    <div class="stat-item"><span class="stat-dot"></span> 100% Client-Side Privacy</div>
    <div class="stat-item"><span class="stat-dot"></span> Instant ATS Resume Diagnostics</div>
    <div class="stat-item"><span class="stat-dot"></span> 40+ Practical Project Milestones</div>
  </div>

  <div id="preview" style="margin-bottom:36px">
    <div class="card" style="padding:28px 28px;background:linear-gradient(180deg,var(--cd),rgba(15,25,43,0.95));border:1px solid rgba(16,185,129,0.3)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
        <div>
          <span class="chip y" style="font-weight:700">LIVE PREVIEW</span>
          <h2 style="margin:6px 0 0">Interactive Candidate Dashboard</h2>
          <p class="m" style="margin:2px 0 0">Target: <b>Data Scientist</b> · Track your seniority readiness, weekly milestones, and skill constellation.</p>
        </div>
        <button class="btn s" onclick="go('login')">Create Your Profile</button>
      </div>

      <!-- Top Readiness Banner -->
      <div class="card" style="margin-bottom:24px;display:flex;align-items:center;gap:24px;flex-wrap:wrap;background:rgba(16,185,129,0.06);border:1px solid rgba(16,185,129,0.25)">
        <div style="text-align:center">${ring(64, 110)}</div>
        <div style="flex:1;min-width:240px">
          <h3 style="margin:0 0 4px">Solid progress. A few gaps stand between you and ready.</h3>
          <p class="m" style="margin:0 0 14px;font-size:14px">Importance-weighted coverage of 8 required skills for Data Scientist.</p>
          <div class="row">
            <button class="btn s" onclick="go('login')">🚀 Continue roadmap</button>
            <button class="btn s o" onclick="go('login')">🎯 Explore skill gaps</button>
          </div>
        </div>
      </div>

      <!-- Weekly Plan & Seniority Readiness -->
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:24px">
        <div class="card">
          <span style="font-size:12px;font-weight:700;color:var(--mu);letter-spacing:0.06em">WEEKLY PLAN</span>
          <div class="big" style="margin:6px 0 2px">4/11</div>
          <p class="m" style="font-size:13.5px;margin-bottom:8px">tasks completed in your roadmap.</p>
          ${bar(36)}
        </div>
        <div class="card">
          <span style="font-size:12px;font-weight:700;color:var(--mu);letter-spacing:0.06em">SENIORITY READINESS</span>
          <div style="margin-top:10px">
            <div class="seniority-row"><span>Junior Data Scientist</span> <span class="chip" style="background:rgba(16,185,129,0.18);color:#10b981;font-weight:700">Ready</span></div>
            <div class="seniority-row"><span>Data Scientist</span> <span class="chip y" style="font-weight:700">Almost</span></div>
            <div class="seniority-row"><span>Senior Data Scientist</span> <span class="chip" style="background:rgba(148,163,184,0.14);color:var(--mu);font-weight:700">Not yet</span></div>
          </div>
        </div>
      </div>

      <!-- 4 Mini Metric Stat Cards -->
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:20px;margin-bottom:24px">
        <div class="card" style="padding:16px 18px">
          <span style="font-size:12px;font-weight:700;color:var(--mu)">🚀 ROADMAP</span>
          <div style="font-size:22px;font-weight:800;margin:6px 0">4/11 <small class="m" style="font-size:13px;font-weight:400">tasks</small></div>
          ${bar(36)}
        </div>
        <div class="card" style="padding:16px 18px">
          <span style="font-size:12px;font-weight:700;color:var(--mu)">🎯 SKILLS</span>
          <div style="font-size:22px;font-weight:800;margin:6px 0">5/8 <small class="m" style="font-size:13px;font-weight:400">ready</small></div>
          ${bar(62)}
        </div>
        <div class="card" style="padding:16px 18px">
          <span style="font-size:12px;font-weight:700;color:var(--mu)">📁 PROJECTS</span>
          <div style="font-size:22px;font-weight:800;margin:6px 0">1/4 <small class="m" style="font-size:13px;font-weight:400">done</small></div>
          ${bar(25)}
        </div>
        <div class="card" style="padding:16px 18px">
          <span style="font-size:12px;font-weight:700;color:var(--mu)">📝 ASSESSMENTS</span>
          <div style="font-size:22px;font-weight:800;margin:6px 0">2/3 <small class="m" style="font-size:13px;font-weight:400">passed</small></div>
          ${bar(67)}
        </div>
      </div>

      <!-- Constellation & Priority Gaps Preview -->
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px">
        <div class="card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
            <span style="font-size:12px;font-weight:700;letter-spacing:0.06em;color:var(--mu);text-transform:uppercase">● SKILL CONSTELLATION</span>
            <span class="chip" style="font-size:11px">8 SKILLS</span>
          </div>
          ${constellation('ds', { Python: 3, Statistics: 1, SQL: 2, Pandas: 2 })}
        </div>
        <div class="card">
          <h3 style="margin-top:0">Priority skill gaps</h3>
          <p class="m" style="font-size:13px;margin-bottom:12px">Identified by mathematical weight and required industry level.</p>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd)">
            <div><b>Statistics</b><div class="m" style="font-size:12px">Critical · you: Beginner · needed: Advanced</div></div>
            <span class="chip r" style="font-weight:700">67% gap</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid var(--bd)">
            <div><b>Machine Learning</b><div class="m" style="font-size:12px">Critical · you: None · needed: Intermediate</div></div>
            <span class="chip r" style="font-weight:700">100% gap</span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0">
            <div><b>Deep Learning</b><div class="m" style="font-size:12px">Nice-to-have · you: None · needed: Beginner</div></div>
            <span class="chip r" style="font-weight:700">100% gap</span>
          </div>
        </div>
      </div>
    </div>
  </div>

  <h2 id="features" style="margin-top:36px">Everything you need to get hired</h2>
  <p class="m" style="margin-bottom:20px">No subscriptions, no vague feedback, and no data tracking.</p>
  <div class="grid">${TOOLS.map(t => `<div class="card"><b>${t[0]}</b><p class="m" style="margin-top:8px;font-size:14px">${t[1]}</p></div>`).join('')}</div>

  <h2 id="careers" style="margin-top:40px">Supported career paths</h2>
  <p class="m" style="margin-bottom:20px">Vetted against live requirements and recruiter keywords.</p>
  <div class="grid">${Object.keys(R).map(k => `
    <div class="card">
      <b style="font-size:17px">${R[k].n}</b>
      <p class="m" style="margin:6px 0 14px;font-size:13.5px">${R[k].s.length} Core competencies · ${PR[k].length} Portfolio projects</p>
      <div style="margin-bottom:14px">${R[k].s.slice(0, 4).map(s => `<span class="chip">${s.n}</span>`).join('')}</div>
      <button class="btn s o" onclick="go('login')">View roadmap →</button>
    </div>
  `).join('')}</div>

  <h2 id="how" style="margin-top:40px">How it works</h2>
  <div class="grid">
    <div class="card">
      <div style="font-size:24px;margin-bottom:8px">1️⃣</div>
      <b>1. Assess Your Profile</b>
      <p class="m" style="font-size:13.5px;margin-top:6px">Select your target career and honestly self-rate your baseline knowledge from Beginner to Expert.</p>
    </div>
    <div class="card">
      <div style="font-size:24px;margin-bottom:8px">2️⃣</div>
      <b>2. Execute Your 6-Month Plan</b>
      <p class="m" style="font-size:13.5px;margin-top:6px">Follow weekly milestone tasks, build 4 portfolio projects, and take 3-minute timed assessments.</p>
    </div>
    <div class="card">
      <div style="font-size:24px;margin-bottom:8px">3️⃣</div>
      <b>3. Optimize & Apply</b>
      <p class="m" style="font-size:13.5px;margin-top:6px">Run your resume through the on-device ATS checker until you reach an 80+ score, then apply confidently.</p>
    </div>
  </div>

  <h2 style="margin-top:40px">Frequently asked questions</h2>
  <details class="card" style="margin-bottom:12px">
    <summary style="cursor:pointer;font-weight:600">Is Bridgeway AI truly 100% free?</summary>
    <p class="m" style="margin-top:10px">Yes. Every single feature—including the ATS resume checker, 6-month roadmap, assessments, and resume builder—is completely free. There are no credit cards, hidden tiers, or usage limits.</p>
  </details>
  <details class="card" style="margin-bottom:12px">
    <summary style="cursor:pointer;font-weight:600">Where is my resume and profile data stored?</summary>
    <p class="m" style="margin-top:10px">All data is processed and stored locally inside your browser's <code>localStorage</code> sandbox. Your resume is never uploaded to any cloud server or database.</p>
  </details>
  <details class="card" style="margin-bottom:12px">
    <summary style="cursor:pointer;font-weight:600">Can I export my resume without watermarks?</summary>
    <p class="m" style="margin-top:10px">Yes. The built-in resume builder generates an ATS-friendly single-column layout that exports directly through your browser print dialog (Save as PDF) with zero watermarks.</p>
  </details>

  <div class="card" style="text-align:center;margin:36px 0 24px;padding:36px 20px;background:radial-gradient(ellipse at center,rgba(16,185,129,0.12),transparent 70%),var(--cd)">
    <h2>Ready to bridge your career gap?</h2>
    <p class="m" style="max-width:540px;margin:8px auto 20px">Take the free career readiness assessment and generate your custom step-by-step roadmap in 2 minutes.</p>
    <button class="btn btn-lg" onclick="go('login')">🚀 Get Started — 100% Free</button>
  </div>
  <footer style="padding:20px 0 24px;text-align:center;border-top:1px solid var(--bd)" class="m">© Bridgeway <span class="brand-ai">AI</span> · Built for tech aspirants</footer>
</div>`}

/* ---------- auth ---------- */
let AM = 'in';
async function sha(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join('') }
const msg = (t, ok) => { $('am').textContent = t; $('am').className = ok ? 'ok' : 'err' };
function login() { return `<div class="ac"><div class="card"><div style="display:flex;justify-content:center;margin-bottom:14px">${LOGO()}</div><div class="row" style="margin:12px 0 16px"><button class="btn ${AM == 'in' ? '' : 'o'} s" onclick="AM='in';route()">Log in</button><button class="btn ${AM == 'up' ? '' : 'o'} s" onclick="AM='up';route()">Create account</button></div><label for="em">Email</label><input id="em" type="email" autocomplete="email"><label for="pw">Password</label><input id="pw" type="password" autocomplete="current-password"><label><input type="checkbox" style="width:auto" onchange="$('pw').type=this.checked?'text':'password'"> Show password</label><p id="am" role="alert"></p><button class="btn" onclick="auth()">${AM == 'in' ? 'Log in' : 'Create account'}</button><button class="btn o" onclick="msg('Google login needs Supabase; this offline demo uses on-device accounts.')">Continue with Google</button><p style="text-align:center"><a onclick="msg('Password reset needs Supabase; in this demo create a new account.')" style="cursor:pointer">Forgot password?</a></p><p class="m" style="font-size:12px;text-align:center">Demo mode: accounts and data are saved only in this browser.</p></div></div>` }
async function auth() {
  const e = $('em').value.trim().toLowerCase(), p = $('pw').value; if (!/^\S+@\S+\.\S+$/.test(e)) return msg('Enter a valid email.'); if (p.length < 6) return msg('Password needs at least 6 characters.');
  let hp; try { hp = await sha(p) } catch (x) { hp = btoa(p) } const us = L('bw_u', {});
  if (AM == 'up') { if (us[e]) return msg('Account already exists. Log in instead.'); us[e] = hp; S('bw_u', us); S('bw_s', e); O = { i: 0, a: {}, s: {} }; go('onboarding') } else { if (us[e] !== hp) return msg('Wrong email or password.'); S('bw_s', e); go(D().p ? 'dashboard' : 'onboarding') }
}
const out = () => { localStorage.removeItem('bw_s'); go('home') };
/* ---------- onboarding ---------- */
let O = { i: 0, a: {}, s: {} };
const OQ = [['role', 'Which career path do you want?', Object.keys(R)], ['edu', 'Your education level?', ['High school', 'Diploma', 'Bachelor’s', 'Master’s', 'Self-taught']], ['field', 'What is your field of study?'], ['exp', 'Your experience level?', ['Complete beginner', 'Some learning', 'Intern or junior', '1-3 years']], ['hrs', 'Hours available per week?', ['3', '5', '10', '15', '20+']], ['country', 'Which country are you in?']];
function onb() {
  const i = O.i; let b; if (i < 6) { const q = OQ[i]; b = `<h2>${q[1]}</h2>` + (q[2] ? q[2].map(o => `<button class="opt ${O.a[q[0]] == o ? 'on' : ''}" onclick="oa('${q[0]}','${o}')">${E(lab(o))}</button>`).join('') : `<input id="ot" aria-label="${q[1]}" value="${E(O.a[q[0]] || '')}">`) + `<div class="row">${i ? '<button class="btn o" onclick="ob(-1)">Back</button>' : ''}<button class="btn" onclick="ob(1)">Next</button></div>` }
  else b = `<h2>Rate your current skills</h2><p class="m">Be honest. This makes your roadmap accurate.</p>` + R[O.a.role].s.map(s => `<label>${s.n} <span class="chip">${IM[s.i]}</span><select onchange="O.s['${s.n}']=+this.value">${LV.map((l, j) => `<option value="${j}" ${(O.s[s.n] || 0) == j ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`).join('') + `<div class="row"><button class="btn o" onclick="ob(-1)">Back</button><button class="btn" onclick="fin()">Build my roadmap</button></div>`;
  return `<div class="ac" style="max-width:520px"><div class="card"><p class="m">Step ${i + 1} of 7</p>${bar((i + 1) / 7 * 100)}${b}</div></div>`
}
const oa = (k, v) => { O.a[k] = v; route() };
function ob(n) { if (n > 0 && O.i < 6 && !OQ[O.i][2]) { O.a[OQ[O.i][0]] = $('ot').value.trim() } if (n > 0 && !O.a[OQ[O.i][0]]) return alert('Please answer to continue.'); if (O.i == 0 && n < 0) return; O.i += n; route() }
function fin() { const d = { p: { ...O.a, name: U().split('@')[0], city: '' }, sk: { ...O.s }, tasks: {}, proj: {}, as: [], ats: [], log: [], trend: [], resumes: [] }; rec(d, 'Built your roadmap'); SD(d); go('dashboard') }

/* ---------- app pages ---------- */
function dash() {
  const d = D(), r = rdy(d), t = tk(d), a = d.ats || [], l = a[a.length - 1], g = cov(d).filter(s => s.c < 1).sort((x, y) => W[y.i] * (1 - y.c) - W[x.i] * (1 - x.c));
  const totalSkills = R[d.p.role].s.length;
  const readySkills = cov(d).filter(s => s.c >= 1).length;
  const totalProjects = PR[d.p.role].length;
  const completedProjects = Object.keys(d.proj || {}).filter(k => k.startsWith(d.p.role) && (d.proj[k] || []).filter(Boolean).length === 5).length;
  const totalAssessments = Object.keys(Q).filter(k => R[d.p.role].s.some(s => s.n === k)).length;
  const passedAssessments = (d.as || []).filter(a => a.ok && R[d.p.role].s.some(s => s.n === a.n)).length;
  const topGap = g.length ? g[0] : null;

  return `
<h1>Hi ${E(d.p.name)} 👋</h1>
<p class="m" style="margin:0 0 20px">Target: <b>${R[d.p.role].n}</b> · ${E(d.p.edu || 'Self-taught')} · ${E(d.p.hrs || 10)} hrs/week</p>

${topGap ? `
  <div class="card" style="margin-bottom:24px;background:linear-gradient(135deg,rgba(16,185,129,0.12),rgba(15,25,43,0.95));border:1px solid rgba(16,185,129,0.38);display:flex;align-items:center;justify-content:space-between;gap:18px;flex-wrap:wrap">
    <div style="display:flex;align-items:center;gap:14px">
      <div style="width:44px;height:44px;border-radius:12px;background:rgba(16,185,129,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">💡</div>
      <div>
        <b style="font-size:16px;color:var(--tx)">Improve ${E(topGap.n)} fundamentals</b>
        <p class="m" style="margin:2px 0 0;font-size:13.5px">${E(topGap.n)} is <b>${IM[topGap.i]}</b> for ${E(R[d.p.role].n)} and your current level (${LV[topGap.y]}) is below required level (${RL[topGap.r]}).</p>
      </div>
    </div>
    <div class="row" style="gap:10px">
      <a class="btn s o" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(topGap.n + ' tutorial for beginners')}">Learn ${E(topGap.n)}</a>
      ${Q[topGap.n] ? `<button class="btn s" onclick="qs('${topGap.n}')">Take assessment</button>` : ''}
      <button class="btn s o" onclick="go('projects')">Build project</button>
    </div>
  </div>
` : ''}

<!-- Top Readiness Hero Card -->
<div class="card" style="margin-bottom:24px;display:flex;align-items:center;gap:24px;flex-wrap:wrap;background:linear-gradient(135deg,rgba(16,185,129,0.06),var(--cd))">
  <div style="text-align:center">${ring(r, 125)}</div>
  <div style="flex:1;min-width:260px">
    <h2 style="margin:0 0 6px">${r >= 85 ? 'Exceptional readiness! Ready for job applications.' : r >= 50 ? 'Solid progress. A few gaps stand between you and ready.' : 'Starting your journey. Build fundamental skills.'}</h2>
    <p class="m" style="margin:0 0 16px;font-size:14px">Importance-weighted coverage of ${totalSkills} required skills for ${R[d.p.role].n}.</p>
    <div class="row">
      <button class="btn s" onclick="go('roadmap')">🚀 Continue roadmap</button>
      <button class="btn s o" onclick="go('gap')">🎯 Explore skill gaps</button>
    </div>
  </div>
</div>

<!-- Middle Row: Weekly Plan & Seniority Readiness -->
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:24px">
  <div class="card">
    <span style="font-size:12px;font-weight:700;color:var(--mu);letter-spacing:0.06em">WEEKLY PLAN</span>
    <div class="big" style="margin:8px 0 4px">${t.done}/${t.all.length}</div>
    <p class="m" style="font-size:13.5px;margin-bottom:10px">tasks completed in your roadmap.</p>
    ${bar(Math.round(t.done / (t.all.length || 1) * 100))}
  </div>
  <div class="card">
    <span style="font-size:12px;font-weight:700;color:var(--mu);letter-spacing:0.06em">SENIORITY READINESS</span>
    <div style="margin-top:10px">
      <div class="seniority-row">
        <span>Junior ${R[d.p.role].n}</span>
        <span class="chip" style="background:${r >= 45 ? 'rgba(16,185,129,0.18);color:#10b981' : 'rgba(245,158,11,0.18);color:#f59e0b'};font-weight:700">${r >= 45 ? 'Ready' : 'Almost'}</span>
      </div>
      <div class="seniority-row">
        <span>${R[d.p.role].n}</span>
        <span class="chip" style="background:${r >= 75 ? 'rgba(16,185,129,0.18);color:#10b981' : r >= 45 ? 'rgba(245,158,11,0.18);color:#f59e0b' : 'rgba(148,163,184,0.14);color:var(--mu)'};font-weight:700">${r >= 75 ? 'Ready' : r >= 45 ? 'Almost' : 'Not yet'}</span>
      </div>
      <div class="seniority-row">
        <span>Senior ${R[d.p.role].n}</span>
        <span class="chip" style="background:${r >= 90 ? 'rgba(16,185,129,0.18);color:#10b981' : r >= 70 ? 'rgba(245,158,11,0.18);color:#f59e0b' : 'rgba(148,163,184,0.14);color:var(--mu)'};font-weight:700">${r >= 90 ? 'Ready' : r >= 70 ? 'Almost' : 'Not yet'}</span>
      </div>
    </div>
  </div>
</div>

<!-- 4 Mini Metric Stat Cards -->
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:24px">
  <div class="card" style="padding:18px 20px">
    <span style="font-size:12px;font-weight:700;color:var(--mu)">🚀 ROADMAP</span>
    <div style="font-size:24px;font-weight:800;margin:6px 0">${t.done}/${t.all.length} <small class="m" style="font-size:13px;font-weight:400">tasks</small></div>
    ${bar(Math.round(t.done / (t.all.length || 1) * 100))}
  </div>
  <div class="card" style="padding:18px 20px">
    <span style="font-size:12px;font-weight:700;color:var(--mu)">🎯 SKILLS</span>
    <div style="font-size:24px;font-weight:800;margin:6px 0">${readySkills}/${totalSkills} <small class="m" style="font-size:13px;font-weight:400">ready</small></div>
    ${bar(Math.round(readySkills / (totalSkills || 1) * 100))}
  </div>
  <div class="card" style="padding:18px 20px">
    <span style="font-size:12px;font-weight:700;color:var(--mu)">📁 PROJECTS</span>
    <div style="font-size:24px;font-weight:800;margin:6px 0">${completedProjects}/${totalProjects} <small class="m" style="font-size:13px;font-weight:400">completed</small></div>
    ${bar(Math.round(completedProjects / (totalProjects || 1) * 100))}
  </div>
  <div class="card" style="padding:18px 20px">
    <span style="font-size:12px;font-weight:700;color:var(--mu)">📝 ASSESSMENTS</span>
    <div style="font-size:24px;font-weight:800;margin:6px 0">${passedAssessments}/${totalAssessments || 1} <small class="m" style="font-size:13px;font-weight:400">passed</small></div>
    ${bar(Math.round(passedAssessments / (totalAssessments || 1) * 100))}
  </div>
</div>

<!-- Quick Actions -->
<div style="margin-bottom:28px">
  <h3 style="margin-bottom:14px;font-size:14px;letter-spacing:0.05em;text-transform:uppercase;color:var(--mu)">Quick actions</h3>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px">
    <div class="qa-card" onclick="go('roadmap')"><span>🚀</span> Continue roadmap</div>
    <div class="qa-card" onclick="go('gap')"><span>🎓</span> Learn a skill</div>
    <div class="qa-card" onclick="go('projects')"><span>📁</span> Build a project</div>
    <div class="qa-card" onclick="go('quiz')"><span>📝</span> Take an assessment</div>
    <div class="qa-card" onclick="go('ats')"><span>💼</span> Check resume (ATS)</div>
  </div>
</div>

<!-- Constellation & Priority Skill Gaps -->
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;margin-bottom:24px">
  <div class="card">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
      <span style="font-size:12px;font-weight:700;letter-spacing:0.06em;color:var(--mu);text-transform:uppercase">● SKILL CONSTELLATION</span>
      <span class="chip" style="font-size:11px">${totalSkills} SKILLS</span>
    </div>
    ${constellation(d.p.role, d.sk)}
  </div>
  <div class="card">
    <h3 style="margin-top:0">Priority skill gaps</h3>
    <p class="m" style="font-size:13px;margin-bottom:14px">Skills with highest weight and gap impact.</p>
    ${g.slice(0, 5).map(s => `
      <div style="display:flex;justify-content:space-between;align-items:center;padding:11px 0;border-bottom:1px solid var(--bd)">
        <div>
          <b style="font-size:14.5px">${E(s.n)}</b>
          <div class="m" style="font-size:12px;margin-top:2px">${IM[s.i]} · you: ${LV[s.y]} · needed: ${RL[s.r]}</div>
        </div>
        <span class="chip r" style="font-weight:700">${Math.round((1 - s.c) * 100)}% gap</span>
      </div>
    `).join('') || '<p class="m">Congratulations! No skill gaps remaining.</p>'}
  </div>
</div>

<!-- Lower Row: Next Up, Assessments, Projects & Latest ATS -->
<div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px">
  <div class="card">
    <h3 style="margin-top:0">Next up</h3>
    <div style="margin:12px 0">
      ${t.next.map(x => `
        <div style="margin:8px 0;font-size:13px;line-height:1.45">
          <b>Month ${x.m}:</b> ${E(x.x)}
        </div>
      `).join('') || '<p class="m">All roadmap tasks completed!</p>'}
    </div>
    <button class="btn s o" style="margin-top:8px" onclick="go('roadmap')">Go to weekly plan</button>
  </div>

  <div class="card">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="font-size:18px">📝</span>
      <h3 style="margin:0">Assessments</h3>
    </div>
    <p class="m" style="font-size:13px">
      ${(d.as || []).length === 0 ? "You haven't attempted an assessment yet." : `${(d.as || []).length} assessment(s) attempted.`}
    </p>
    <p style="font-size:13px;margin:12px 0">
      Recommended next: <b>${g.find(s => Q[s.n]) ? g.find(s => Q[s.n]).n + ' Assessment' : 'All available assessments passed!'}</b>
    </p>
    <button class="btn s o" onclick="go('quiz')">Go to assessments</button>
  </div>

  <div class="card">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
      <span style="font-size:18px">📁</span>
      <h3 style="margin:0">Projects</h3>
    </div>
    <span style="font-size:11px;font-weight:700;color:var(--mu);letter-spacing:0.06em">SUGGESTED FOR YOU</span>
    <div style="margin:6px 0 10px">
      <b style="font-size:14.5px;display:block">${PR[d.p.role][0] ? PR[d.p.role][0][0] : 'Portfolio Project'}</b>
      <span class="m" style="font-size:12px">${PR[d.p.role][0] ? PR[d.p.role][0][1] : 20}h estimated · Milestone</span>
    </div>
    <p class="m" style="font-size:12px;margin-bottom:12px">${completedProjects} of ${totalProjects} completed.</p>
    <button class="btn s" onclick="go('projects')">Continue project</button>
  </div>

  <div class="card" style="text-align:center">
    <h3 style="margin:0 0 10px">Latest ATS score</h3>
    <div style="margin:8px 0">${l ? ring(l.s, 110) : '<p class="m" style="margin:20px 0">No ATS score yet.</p>'}</div>
    <button class="btn s" onclick="go('ats')">Check resume</button>
  </div>
</div>
`;
}
function road() { const d = D(), t = tk(d); return `<h1>6-Month Roadmap</h1>${bar(Math.round(t.done / t.all.length * 100))}<p class="m">${t.done} of ${t.all.length} tasks done</p>` + t.P.map(m => `<div class="card" style="margin:10px 0"><h3>Month ${m.m}: ${m.g}</h3>${m.t.map((x, i) => `<label style="display:block;margin:6px 0"><input type="checkbox" style="width:auto;margin:0 8px 0 0" ${(d.tasks || {})[m.m + '-' + i] ? 'checked' : ''} onchange="tt('${m.m}-${i}',this.checked)">Week ${i + 1}: ${E(x)}</label>`).join('')}</div>`).join('') + `<button class="btn o" onclick="if(confirm('Reset all task checkmarks?')){const d=D();d.tasks={};SD(d);route()}">Regenerate roadmap</button>` }
function tt(id, v) { const d = D(); d.tasks = d.tasks || {}; d.tasks[id] = v; if (v) rec(d, 'Completed roadmap task ' + id); SD(d); route() }
function gapP() { const d = D(); return `<h1>Skill Gap</h1><div style="overflow-x:auto"><table><tr><th>Skill</th><th>Importance</th><th>You</th><th>Required</th><th>Gap</th><th>Status</th><th></th></tr>${cov(d).map(s => `<tr><td>${s.n}</td><td>${IM[s.i]}</td><td>${LV[s.y]}</td><td>${RL[s.r]}</td><td>${Math.round((1 - s.c) * 100)}%</td><td><span class="chip ${s.c >= 1 ? '' : s.y ? 'y' : 'r'}">${s.c >= 1 ? 'Ready' : s.y ? 'In progress' : 'Not started'}</span></td><td><a target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(s.n + ' tutorial for beginners')}">Learn</a>${Q[s.n] ? ` · <a onclick="qs('${s.n}')" style="cursor:pointer">Assess</a>` : ''} · <a href="#projects">Build</a></td></tr>`).join('')}</table></div>` }
let PD = null;
function projP() {
  const d = D(), ps = PR[d.p.role], k = i => d.p.role + i, pc = i => Math.round(((d.proj || {})[k(i)] || []).filter(Boolean).length / 5 * 100);
  if (PD != null) { const p = ps[PD], st = (d.proj || {})[k(PD)] || []; return `<button class="btn o s" onclick="PD=null;route()">← Back</button><h1>${p[0]}</h1><p class="m">Objective: build a portfolio-ready project to prove your skills. Estimated ${p[1]} hours.</p>${bar(pc(PD))}${ST.map((s, j) => `<label style="display:block;margin:8px 0"><input type="checkbox" style="width:auto;margin:0 8px 0 0" ${st[j] ? 'checked' : ''} onchange="pt(${PD},${j},this.checked)">${s}</label>`).join('')}<button class="btn" onclick="pt(${PD},-1,true)">Mark completed</button>` }
  return `<h1>Projects</h1><div class="grid">${ps.map((p, i) => `<div class="card"><b>${p[0]}</b><p class="m">${i < 1 ? 'Beginner' : i < 3 ? 'Intermediate' : 'Advanced'} · ${p[1]} hours</p><p>${R[d.p.role].s.slice(i, i + 3).map(s => `<span class="chip">${s.n}</span>`).join('')}</p>${bar(pc(i))}<button class="btn s" onclick="PD=${i};route()">Open</button></div>`).join('')}</div>`
}
function pt(i, j, v) { const d = D(), k = d.p.role + i; d.proj = d.proj || {}; const a = d.proj[k] || [0, 0, 0, 0, 0]; if (j < 0) a.fill(true); else a[j] = v; d.proj[k] = a; if (a.every(Boolean)) rec(d, 'Completed project ' + PR[d.p.role][i][0]); SD(d); route() }
let QZ = null, T = null;
function quizP() {
  const d = D(), sk = R[d.p.role].s.filter(s => Q[s.n]); if (!QZ) return `<h1>Assessments</h1><p class="m">Score 67%+ to move that skill up a level. Other skills can be re-rated in Settings.</p><div class="grid">${sk.map(s => `<div class="card"><b>${s.n}</b><p class="m">Your level: ${LV[(d.sk || {})[s.n] || 0]}</p><button class="btn s" onclick="qs('${s.n}')">Start · 3 questions · 3 min</button></div>`).join('')}</div>`;
  const q = Q[QZ.n]; if (QZ.res) return `<h1>${QZ.n}: ${QZ.sc}/3</h1><p class="${QZ.sc >= 2 ? 'ok' : 'err'}">${QZ.sc >= 2 ? 'Passed! Skill level upgraded.' : 'Not passed yet. Review and try again.'}</p>${q.map((x, i) => `<div class="card" style="margin:8px 0"><b>${x[0]}</b><p>Your answer: ${QZ.ans[i] >= 0 ? x[1][QZ.ans[i]] : '(none)'} ${QZ.ans[i] == x[2] ? '✔' : '✘'}</p><p class="m">Correct: ${x[1][x[2]]}. ${x[3]}</p></div>`).join('')}<button class="btn" onclick="QZ=null;route()">Done</button>`;
  return `<h1>${QZ.n} quiz</h1><p>Time left: <b id="tm">${QZ.t}</b>s</p>${q.map((x, i) => `<div class="card" style="margin:8px 0"><b>${i + 1}. ${x[0]}</b>${x[1].map((o, j) => `<label style="display:block"><input type="radio" style="width:auto;margin:4px 8px 0 0" name="q${i}" value="${j}">${o}</label>`).join('')}</div>`).join('')}<button class="btn" onclick="qsub()">Submit</button>`
}
function qs(n) { QZ = { n, t: 180 }; go('quiz'); route(); clearInterval(T); T = setInterval(() => { QZ.t--; const e = $('tm'); if (e) e.textContent = QZ.t; if (QZ.t <= 0) qsub() }, 1000) }
function qsub() { clearInterval(T); const q = Q[QZ.n], ans = q.map((x, i) => { const r = document.querySelector('input[name=q' + i + ']:checked'); return r ? +r.value : -1 }), sc = ans.filter((a, i) => a == q[i][2]).length, d = D(); QZ.ans = ans; QZ.sc = sc; QZ.res = 1; d.as = (d.as || []).concat({ n: QZ.n, s: sc, ok: sc >= 2, t: new Date().toLocaleDateString() }); if (sc >= 2) { const c = (d.sk || {})[QZ.n] || 0; d.sk[QZ.n] = Math.min(Math.max(c + 1, c), 4); rec(d, 'Passed ' + QZ.n + ' assessment') } SD(d); route() }
/* ---------- ATS ---------- */
let A = { role: '', text: '', jd: '' };
const VB = 'built,developed,designed,led,created,implemented,improved,reduced,increased,launched,analyzed,managed,automated,optimized,delivered'.split(',');
function atsP() { const d = D(); return `<h1>ATS Score Checker</h1><p class="m">🔒 Your resume is processed in your browser and is not shared.</p><div class="card"><label for="ar">Target role</label><select id="ar">${Object.keys(R).map(k => `<option value="${k}" ${(A.role || d.p.role) == k ? 'selected' : ''}>${R[k].n}</option>`).join('')}</select><label for="at">Paste your resume text (PDF/DOCX upload is not in this demo build)</label><textarea id="at" rows="10">${E(A.text)}</textarea><label for="aj">Optional: paste a job description</label><textarea id="aj" rows="4">${E(A.jd)}</textarea><button class="btn" onclick="ats()">Calculate score</button></div><div id="res"></div>` }
function ats() {
  const t = $('at').value, role = $('ar').value, jd = $('aj').value; A = { role, text: t, jd }; if (t.trim().split(/\s+/).length < 30) return $('res').innerHTML = '<p class="err">Please paste at least 30 words of resume text.</p>';
  const x = t.toLowerCase(), kw = R[role].k, m = kw.filter(k => x.includes(k)), mi = kw.filter(k => !x.includes(k)), wc = x.split(/\s+/).length, em = /\S+@\S+\.\S+/.test(x), ph = /\+?\d[\d\s().-]{8,}/.test(x);
  const se = { Contact: em && ph, Summary: /summary|objective|profile/.test(x), Skills: /skills/.test(x), Education: /education|university|college|degree/.test(x), Experience: /experience|intern|employment/.test(x), Projects: /projects?/.test(x) }, sn = Object.keys(se).filter(k => se[k]).length, bl = (t.match(/^\s*[-•*]/gm) || []).length, nm = (t.match(/\d+%|\$\d+|\b\d{2,}\b/g) || []).length, vb = VB.filter(v => x.includes(v)).length, lk = /linkedin|github/.test(x);
  const b = [['Keyword match', 40 * m.length / kw.length, 40], ['Required sections', 20 * sn / 6, 20], ['Formatting', (wc >= 250 && wc <= 900 ? 7 : wc >= 120 ? 3 : 0) + (bl >= 5 ? 5 : bl >= 2 ? 2 : 0) + (/\|/.test(t) ? 0 : 3), 15], ['Action verbs & results', Math.min(8, vb * 1.6) + Math.min(7, nm * 1.4), 15], ['Contact & links', (em ? 4 : 0) + (ph ? 3 : 0) + (lk ? 3 : 0), 10]], sc = Math.round(b.reduce((s, y) => s + y[1], 0));
  const sg = []; mi.length && sg.push('Add relevant keywords you genuinely have: ' + mi.slice(0, 6).join(', ')); Object.keys(se).filter(k => !se[k]).forEach(k => sg.push('Add a clear "' + k + '" section')); bl < 5 && sg.push('Use bullet points (starting with -) for achievements'); nm < 3 && sg.push('Add measurable results (numbers, %, time saved)'); vb < 5 && sg.push('Start bullets with action verbs like built, improved, reduced'); !lk && sg.push('Add your LinkedIn or GitHub link'); (wc < 250 || wc > 900) && sg.push('Aim for 250–900 words (about 1 page)');
  let jm = ''; if (jd.trim()) { const f = {}; jd.toLowerCase().match(/[a-z+#.]{5,}/g).forEach(w => f[w] = (f[w] || 0) + 1); const sw = 'experience,ability,skills,working,team,years,strong,including,related,knowledge,required,preferred'.split(','); jm = Object.keys(f).filter(w => f[w] > 1 && !sw.includes(w) && !x.includes(w)).slice(0, 10) }
  const d = D(); d.ats = (d.ats || []).concat({ s: sc, r: role, t: new Date().toLocaleDateString() }); d.log = [new Date().toLocaleDateString() + ' — ATS score ' + sc].concat(d.log || []).slice(0, 8); SD(d);
  $('res').innerHTML = `<div class="grid" style="margin-top:14px"><div class="card" style="text-align:center">${ring(sc, 130)}<p><b>ATS score</b></p></div><div class="card"><h3>Breakdown</h3>${b.map(y => `<small>${y[0]} ${Math.round(y[1])}/${y[2]}</small>${bar(Math.round(y[1] / y[2] * 100))}`).join('')}</div></div><div class="card" style="margin-top:14px"><h3>Matched keywords</h3>${m.map(k => `<span class="chip">${k}</span>`).join('') || 'None'}<h3>Missing keywords</h3>${mi.map(k => `<span class="chip r">${k}</span>`).join('') || 'None'}${jm ? `<h3>Missing from job description</h3>${jm.map(k => `<span class="chip r">${k}</span>`).join('')}` : ''}<h3>Improvements (priority order)</h3>${sg.map(s => `<p>• ${E(s)}</p>`).join('') || '<p>Great resume!</p>'}</div><div class="card" style="margin-top:14px"><h3>Score history</h3>${line(d.ats.map(a => a.s))}</div>`
}
/* ---------- resume builder ---------- */
const RFS = [['name', 'Full name', ''], ['title', 'Job title', 'e.g. Junior Data Analyst'], ['email', 'Email', ''], ['phone', 'Phone', ''], ['links', 'Links', 'linkedin.com/in/you, github.com/you'], ['summary', 'Summary', 'Motivated graduate with hands-on projects in SQL and Python...'], ['skills', 'Skills', 'Python, SQL, Excel, Git'], ['education', 'Education', 'B.Tech Computer Science, XYZ University, 2025'], ['experience', 'Experience (start lines with -)', '- Built a dashboard that cut reporting time by 30%'], ['projects', 'Projects (start lines with -)', '- Churn predictor: Python, 85% accuracy'], ['certs', 'Certifications', 'Google Data Analytics (2025)']];
let RF = { t: 't0', c: '#059669', fo: 'Arial' };
function resP() { const d = D(); return `<h1>Free Resume Builder</h1><div class="row"><select id="rl" style="width:auto" onchange="rld(this.value)"><option value="">Load saved resume…</option>${(d.resumes || []).map((r, i) => `<option value="${i}">${E(r.name || 'Untitled')}</option>`).join('')}</select><button class="btn s" onclick="rsv()">Save</button><button class="btn o s" onclick="rdel()">Delete loaded</button><button class="btn s" onclick="window.print()">Download as PDF</button><button class="btn o s" onclick="rats()">Check with ATS Checker</button></div><p class="m" style="font-size:12px">Tip: in the print dialog choose “Save as PDF”. Single column, no images or tables, no watermark.</p><div class="two"><div class="card"><div class="row"><select id="rt" onchange="pv()"><option value="t0">Classic</option><option value="t1">Modern</option><option value="t2">Compact</option></select><select id="rfo" onchange="pv()"><option>Arial</option><option>Georgia</option><option>Verdana</option></select><input id="rc" type="color" value="${RF.c}" style="width:60px" onchange="pv()" aria-label="Accent colour"></div>${RFS.map(f => f[0].length > 5 && f[0] != 'links' && f[0] != 'title' && f[0] != 'email' && f[0] != 'phone' ? `<label>${f[1]}<textarea id="f_${f[0]}" rows="3" placeholder="${E(f[2])}" oninput="pv()">${E(RF[f[0]] || '')}</textarea></label>` : `<label>${f[1]}<input id="f_${f[0]}" placeholder="${E(f[2])}" value="${E(RF[f[0]] || '')}" oninput="pv()"></label>`).join('')}</div><div><div id="pv"></div></div></div>` }
function pv() {
  RFS.forEach(f => { const e = $('f_' + f[0]); if (e) RF[f[0]] = e.value }); RF.t = $('rt').value; RF.c = $('rc').value; RF.fo = $('rfo').value;
  const sec = (t, x) => x && x.trim() ? `<h3 style="color:${RF.c}">${t}</h3>` + E(x).split('\n').map(l => /^\s*[-•]/.test(l) ? `<li>${l.replace(/^\s*[-•]\s*/, '')}</li>` : `<p>${l}</p>`).join('') : '';
  const p = $('pv'); p.className = RF.t; p.style.fontFamily = RF.fo; p.innerHTML = `<h1 style="color:${RF.c}">${E(RF.name) || 'Your Name'}</h1><p>${E(RF.title)}</p><p>${[RF.email, RF.phone, RF.links].filter(Boolean).map(E).join(' | ')}</p>` + sec('Summary', RF.summary) + sec('Skills', RF.skills) + sec('Experience', RF.experience) + sec('Projects', RF.projects) + sec('Education', RF.education) + sec('Certifications', RF.certs)
}
function rsv() { pv(); const d = D(); d.resumes = d.resumes || []; const i = $('rl').value; if (i !== '') d.resumes[+i] = { ...RF }; else d.resumes.push({ ...RF }); SD(d); alert('Resume saved to your account.'); route() }
function rld(i) { if (i === '') return; RF = { ...D().resumes[+i] }; route(); $('rl').value = i }
function rdel() { const i = $('rl').value; if (i === '' || !confirm('Delete this resume?')) return; const d = D(); d.resumes.splice(+i, 1); SD(d); RF = { t: 't0', c: '#059669', fo: 'Arial' }; route() }
function rats() { pv(); A.text = RFS.map(f => RF[f[0]] || '').join('\n'); A.role = D().p.role; go('ats') }
/* ---------- progress & settings ---------- */
function progP() {
  const d = D(), t = tk(d), pj = Object.values(d.proj || {}).filter(a => a.filter(Boolean).length == 5).length, as = (d.as || []).filter(a => a.ok).length;
  return `<h1>Progress</h1><div class="grid"><div class="card"><div class="big">${t.done}</div>tasks completed</div><div class="card"><div class="big">${pj}</div>projects completed</div><div class="card"><div class="big">${as}</div>assessments passed</div></div><div class="grid" style="margin-top:14px"><div class="card"><h3>Readiness trend</h3>${line((d.trend || []).map(x => x.v))}</div><div class="card"><h3>ATS score history</h3>${line((d.ats || []).map(x => x.s))}</div></div><div class="card" style="margin-top:14px"><h3>Recent activity</h3>${(d.log || []).map(l => `<p>• ${E(l)}</p>`).join('') || '<p class="m">Nothing yet. Start your roadmap!</p>'}</div>`
}
function setP() { const d = D(), sk = R[d.p.role].s; return `<h1>Settings</h1><div class="card"><label>Full name<input id="sn" value="${E(d.p.name)}"></label><label>Target role<select id="sr">${Object.keys(R).map(k => `<option value="${k}" ${d.p.role == k ? 'selected' : ''}>${R[k].n}</option>`).join('')}</select></label><label>Hours per week<input id="sh" type="number" min="1" value="${E(d.p.hrs)}"></label><label>Country<input id="sc2" value="${E(d.p.country)}"></label><label>City<input id="sci" value="${E(d.p.city)}"></label><button class="btn" onclick="sset()">Save</button><button class="btn o" onclick="th()">Toggle dark / light</button></div><div class="card" style="margin-top:14px"><h3>Re-rate your skills</h3>${sk.map(s => `<label>${s.n}<select onchange="const d=D();d.sk['${s.n}']=+this.value;rec(d,'Updated ${s.n} level');SD(d)">${LV.map((l, j) => `<option value="${j}" ${((d.sk || {})[s.n] || 0) == j ? 'selected' : ''}>${l}</option>`).join('')}</select></label>`).join('')}</div><div class="card" style="margin-top:14px"><h3>Change password</h3><input id="np" type="password" placeholder="New password (6+ characters)"><button class="btn" onclick="cpw()">Update password</button><h3>Danger zone</h3><button class="btn" style="background:#b91c1c" onclick="if(confirm('Delete your account and all data?')){const u=L('bw_u',{});delete u[U()];S('bw_u',u);localStorage.removeItem('bw:'+U());out()}">Delete account</button></div>` }
function sset() { const d = D(); const nr = $('sr').value; d.p = { ...d.p, name: $('sn').value, role: nr, hrs: $('sh').value, country: $('sc2').value, city: $('sci').value }; d.sk = d.sk || {}; SD(d); alert('Saved.'); route() }
async function cpw() { const p = $('np').value; if (p.length < 6) return alert('Password needs 6+ characters.'); const u = L('bw_u', {}); u[U()] = await sha(p); S('bw_u', u); alert('Password updated.') }
/* ---------- router ---------- */
const PG = { dashboard: dash, roadmap: road, gap: gapP, projects: projP, quiz: quizP, ats: atsP, resume: resP, progress: progP, settings: setP };
function shell(p) { return `<div class="app"><aside class="side"><div style="padding:4px 6px 12px;border-bottom:1px solid var(--bd);margin-bottom:10px">${LOGO()}</div>${NAV.map(n => `<a href="#${n[0]}" class="${p == n[0] ? 'on' : ''}"><span style="font-size:16px">${n[2]}</span> ${n[1]}</a>`).join('')}<a onclick="th()"><span style="font-size:16px">◐</span> Theme</a><a onclick="out()"><span style="font-size:16px">⎋</span> Log out</a></aside><main>${PG[p]()}</main></div>` }
function route() {
  clearInterval(T); let p = location.hash.slice(1) || 'home'; if (!(p in PG) && !['home', 'login', 'onboarding'].includes(p)) p = 'home'; const u = U();
  if (p in PG || p == 'onboarding') { if (!u) return go('login'); if (!D().p && p != 'onboarding') return go('onboarding') } if (p == 'login' && u) return go(D().p ? 'dashboard' : 'onboarding');
  if (p == 'quiz' && QZ && !QZ.res && !QZ.t) QZ = null; if (p != 'quiz' && QZ && QZ.res) QZ = null;
  try { $('app').innerHTML = p == 'home' ? home() : p == 'login' ? login() : p == 'onboarding' ? onb() : shell(p) } catch (e) { console.error(e); $('app').innerHTML = '<div class="ac"><div class="card"><h2>Something went wrong</h2><button class="btn" onclick="localStorage.clear();go(\'home\');location.reload()">Reset demo data</button></div></div>' }
  window.scrollTo(0, 0); if (p == 'resume') { $('rt').value = RF.t; $('rfo').value = RF.fo; pv() }
}
window.addEventListener('hashchange', route); route();
