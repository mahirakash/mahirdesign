/* mahir.design v2 — interactions + hash-routed inner pages */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const HAS_GSAP = !!(window.gsap && window.ScrollTrigger);
const MOTION = HAS_GSAP && !RM;
const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
if (HAS_GSAP) gsap.registerPlugin(ScrollTrigger);
if (MOTION) document.documentElement.classList.add('motion');

/* ---------- settings ---------- */
const CONFIG = {
  whatsapp: '8801843547482',
  // Optional: paste a Web3Forms access key (web3forms.com, free) to receive form submissions by email.
  // Left empty, the form opens WhatsApp with the message pre-filled.
  web3formsKey: ''
};

/* ---------- data: case studies ---------- */
const CASES = {
  skribe: {
    name: 'Skribe', url: 'https://skribe.ai/', domain: 'skribe.ai', img: 'assets/work/skribe.webp',
    title: 'Court reporting, without the <span class="serif">stenographer</span>',
    desc: "Skribe is the non-stenographic alternative to court reporting that gives you the speed, tools, and control today's litigation demands.",
    tags: ['Legaltech', 'Depositions', 'AI', 'Litigation', 'Courtroom'],
    facts: [['Industry', 'Legaltech'], ['Role', 'Product design lead, brand &amp; growth support'], ['Status', 'Ongoing']],
    role: 'I work remotely with the U.S.-based Skribe team, leading product design while supporting brand and growth.'
  },
  vendidit: {
    name: 'Vendidit', url: 'https://vendidit.com/', domain: 'vendidit.com', img: 'assets/work/vendidit.webp',
    title: 'A second chance for <span class="serif">returned</span> stock',
    desc: 'Vendidit is a modern marketplace built for the reverse logistics sector, helping sellers move returned, overstocked, and resold items efficiently, while providing buyers with high-value second-chance products at lower prices.',
    tags: ['Recommerce', 'AI', 'Marketplace', 'Auctions', 'Inventory'],
    facts: [['Industry', 'Recommerce'], ['Role', 'Product design'], ['Status', 'Live']],
    role: 'Product design for the Vendidit marketplace, covering the recommerce, auction and inventory areas of the product.'
  },
  sendwin: {
    name: 'Sendwin', url: 'https://send.win/', domain: 'send.win', img: 'assets/work/sendwin.webp',
    title: 'Many accounts, one browser, no <span class="serif">cross-talk</span>',
    desc: 'Sendwin is a powerful browser-based productivity tool that allows users to manage multiple accounts on the same website within a single browser session, completely isolated and private.',
    tags: ['MultiLogin', 'Isolation', 'Productivity', 'Privacy', 'Proxy'],
    facts: [['Industry', 'Productivity · Privacy'], ['Role', 'Product design'], ['Status', 'Live']],
    role: 'Product design for Sendwin, a multi-account browser built around isolated, private sessions.'
  }
};
const CASE_ORDER = ['skribe', 'vendidit', 'sendwin'];

const DASHES = [
  { name: 'Loopline Transit', cat: 'Fleet &amp; workforce operations admin', img: 'assets/dash/loopline.png',
    context: 'Internal admin for a regional shuttle and ride operator managing drivers, route managers, riders and a rental fleet.',
    problem: "Dispatch and people data lived in separate tools, so simple questions took too long: who's unassigned, which cars are idle, what a rider was charged.",
    solution: 'Headcount, fleet utilisation and recent trip activity in one view. Every metric is paired with its context, like assigned vs. total, so managers read capacity, not just counts.' },
  { name: 'Bidhaus', cat: 'Marketplace &amp; auction analytics console', img: 'assets/dash/bidhaus.png',
    context: 'Operations overview for an online auction and warehouse-lot marketplace, used by sales, pickup and payout teams.',
    problem: 'Auctions, buyer traffic and money were tracked in three different reports, which made it hard to tell a demand problem from a fulfilment problem.',
    solution: 'Pipeline, customer volume and cash movement side by side, with the pickup backlog surfaced as its own metric. One date range drives every panel, so week-over-week reads directly.' },
  { name: 'Vantage', cat: 'Multi-product SaaS admin', img: 'assets/dash/vantage.png',
    context: 'Default admin home for a SaaS platform where different teams care about different numbers.',
    problem: 'One generic dashboard ends up serving no role well.',
    solution: 'Organised in tiers: headline performance, then revenue against budget, then account-level detail. A repeatable card pattern (icon, value, label) keeps a dense screen scannable and lets modules be reordered without breaking.' },
  { name: 'Casewell', cat: 'Legal practice &amp; case management dashboard', img: 'assets/dash/casewell.png',
    context: 'Home screen for a case management tool used by small litigation firms to handle matters, contacts, documents and intake leads.',
    problem: "New firms stalled during setup, and users weren't sure where to add documents, tasks or contacts.",
    solution: "Onboarding becomes an explicit path on the home screen, record creation a row of typed shortcuts, and the day's schedule and lead pipeline stay in view. Three bands separate setup, creating and the day's work." }
];

const LEAD = [
  { n: 'Mahir Abrar Akash', ph: 'mahir-alt', i: 'MA', role: 'Product Design &amp; Project Lead', bio: 'Leads product design and project direction. Off the clock, he’s listening to music or playing goalkeeper. Married to a lawyer, so he knows a good idea should hold up to a few questions.', yrs: '10+ yrs', li: 'https://www.linkedin.com/in/mahirakash', tag: 'Leadership' },
  { n: 'Md Shohanur Rahman', ph: 'shohan', i: 'SR', role: 'Technical Lead &amp; Engineering Partner', bio: 'Leads technical planning and engineering coordination. A husband, dad to a little boy, and music lover. On the football field, he plays striker—which makes things interesting when Mahir’s in goal.', yrs: '9+ yrs', li: 'https://www.linkedin.com/in/shohan98', tag: 'Leadership' }
];
const AWS = [
  { n: 'Shams Shahriar', ph: 'shams', i: 'SS', role: 'Senior Full Stack Developer', bio: 'Builds across the stack. A former lecturer, husband, and dad to a daughter, with a serious enthusiasm for cameras. If he’s looking up, there’s a good chance he’s checking on his drone.', yrs: '9 yrs', li: 'https://www.linkedin.com/in/shams-shahriar-07234ab6', tag: 'AWS Certified' },
  { n: 'Mahmudul Hasan', ph: '', i: 'MH', role: 'Software Engineer · Java · Spring Boot', bio: 'Builds backend services with Java, Spring Boot, and AWS. Away from the keyboard, he’s a husband and midfielder with a Roberto Carlos&#8209;style kick. We prefer to admire that one from beside the goal.', yrs: '7 yrs', li: 'https://www.linkedin.com/in/mahmudul-hasan-901116109', tag: 'AWS Certified' },
  { n: 'KM Emon Ahmed', ph: 'emon', i: 'EA', role: 'Full Stack Developer', bio: 'Builds web applications across the stack. A husband, a family guy who enjoys a bike ride and a good coffee. His kind of weekend has room for all three.', yrs: '6 yrs', li: 'https://www.linkedin.com/in/kmemonahmed', tag: 'AWS Certified' }
];
const MORE = [
  { n: 'Salman Abir', ph: 'salman', i: 'SA', role: 'Senior Frontend Developer', bio: 'Builds the interfaces people see and use. Dad to a daughter and a son, ukulele player, biker, and gym regular. Somehow, there’s still room in the schedule for that unmistakable smile.', yrs: '9 yrs', li: 'https://www.linkedin.com/in/salman-abir', tag: 'Engineering network' },
  { n: 'Rakibul Islam', ph: 'rakibul', i: 'RI', role: 'Senior Backend Engineer', bio: 'Works on backend systems, APIs, and application architecture. A husband, midfielder, and food enthusiast with a kind heart and a good sense of humour. An excellent person to have on your team—and at your dinner table.', yrs: '8 yrs', li: 'https://www.linkedin.com/in/rakibprince33', tag: 'Engineering network' },
  { n: 'Yeasin Rahman', ph: 'yasin', i: 'YR', role: 'Web3 Developer', bio: 'Builds Web3 applications and enjoys exploring new things beyond work. The most serious face on the team. We’re still gathering evidence of the less serious one.', yrs: '7 yrs', li: 'https://www.linkedin.com/in/iamyr', tag: 'Engineering network' },
  { n: 'Mehedi Hasan Tamim', ph: 'tamim', i: 'MT', role: 'Machine Learning Developer', bio: 'Works on machine learning and intelligent application workflows. A husband, family guy, and gamer. Away from work, you’ll find him spending time with his people or getting into a game.', yrs: '5 yrs', li: 'https://www.linkedin.com/in/meheditamim07', tag: 'Engineering network' }
];

/* ---------- page templates ---------- */
const hero = (crumb, title, lede, extra = '') => `<section class="pg-hero"><div class="wrap">
  <div class="crumb"><a href="#top">Home</a><span>/</span>${crumb}</div>
  <h1 class="pg-title">${title}</h1>${lede ? `<p class="lede">${lede}</p>` : ''}${extra}</div></section>`;

function pCase(k) {
  const c = CASES[k], i = CASE_ORDER.indexOf(k), nk = CASE_ORDER[(i + 1) % CASE_ORDER.length], nx = CASES[nk];
  return hero(`<a href="#work">Work</a><span>/</span><span>${c.name}</span>`, `${c.title}`, '',
    `<dl class="facts"><div><dt>Client</dt><dd>${c.name}</dd></div>${c.facts.map(f => `<div><dt>${f[0]}</dt><dd>${f[1]}</dd></div>`).join('')}</dl>`) +
  `<section><div class="wrap"><div class="cover">
    <div class="cover__img rv"><img src="${c.img}" alt="${c.name} cover" width="500" height="702"></div>
    <div class="cover__side rv"><span class="label">( Overview )</span><p class="h-md">${c.desc}</p>
      <div style="display:flex;flex-direction:column;gap:20px"><div class="tags">${c.tags.map(t => `<span class="pill">${t}</span>`).join('')}</div>
      <a class="ulink" href="${c.url}" target="_blank" rel="noopener" style="align-self:flex-start">Visit ${c.domain} ↗</a></div></div>
  </div></div></section>
  <section style="margin-top:clamp(50px,7vw,110px)"><div class="wrap">
    <div class="cs rv"><div><span class="label">( 01 )</span><h2>My role</h2></div><div class="cs__body"><p>${c.role}</p></div></div>
    <div class="cs rv"><div><span class="label">( 02 )</span><h2>See the work</h2></div><div class="cs__body"><p>Full case study coming soon. Screens are shared privately, so I walk you through them on a call.</p>
      <div class="pg-cta" style="margin-top:4px"><a href="https://cal.com/mahirakash/15min" target="_blank" rel="noopener" class="btn btn--ink">Book a walkthrough <span class="arr">→</span></a><a href="${c.url}" target="_blank" rel="noopener" class="btn btn--line">Visit ${c.domain} ↗</a></div></div></div>
  </div></section>
  <a href="#case-${nk}" class="nextcase" data-cursor="Next"><div class="wrap"><span class="label">( Next case study )</span><div class="nextcase__name">${nx.name} <span class="arr">→</span></div></div></a>`;
}

function pDash() {
  return hero('<span>Dashboards</span>', 'Dashboard &amp; admin <span class="serif">systems</span>',
    'Selected product interfaces built to bring clarity to complex workflows. Each one starts with a real operational question and ends with a screen that answers it at a glance.') +
  `<section><div class="wrap">${DASHES.map((d, i) => `
    <article class="dash"><div class="dash__copy rv">
      <div><div class="dash__no mono muted"><span>Project 0${i + 1}</span><span>0${i + 1} / 0${DASHES.length}</span></div><h3>${d.name}</h3><p class="dash__cat">${d.cat}</p></div>
      <dl><div><dt>Context</dt><dd>${d.context}</dd></div><div><dt>Problem</dt><dd>${d.problem}</dd></div><div><dt>Solution</dt><dd>${d.solution}</dd></div></dl>
    </div><figure class="dash__vis rv"><img src="${d.img}" alt="${d.name} dashboard design" loading="lazy"><figcaption>Concept design · fictional data</figcaption></figure></article>`).join('')}
  </div></section>`;
}

function member(m) {
  return `<article class="mem rv"><div class="mem__ph"><span class="yrs">${m.yrs}</span>${m.ph ? `<img src="assets/team/${m.ph}.webp" alt="${m.n}" loading="lazy">` : `<b>${m.i}</b>`}</div>
  <div><h4>${m.n}</h4><div class="mem__role">${m.role}</div><p class="mem__bio">${m.bio}</p></div>
  <div class="mem__foot"><span class="mono muted">${m.tag}</span><a class="ulink" href="${m.li}" target="_blank" rel="noopener">LinkedIn ↗</a></div></article>`;
}
function pTeam() {
  return hero('<span>Team</span>', 'Design-led. <span class="serif">Engineering-powered.</span>',
    'Independent thinking. Collective expertise. I lead digital product experiences and work with a trusted network of engineers and technical specialists to take ideas from concept to launch.') +
  `<section><div class="wrap">
    <div class="tgroup"><div class="tgroup__head"><h3>Project leadership</h3><p>A clear point of contact for product direction, backed by dedicated technical leadership for engineering.</p></div><div class="tgrid lead">${LEAD.map(member).join('')}</div></div>
    <div class="tgroup"><div class="tgroup__head"><h3>AWS-certified specialists</h3><p>Experienced independent professionals, ordered by years of experience. Engaged based on project needs and availability.</p></div><div class="tgrid three">${AWS.map(member).join('')}</div></div>
    <div class="tgroup"><div class="tgroup__head"><h3>Additional specialists</h3><p>Collaborating specialists from my engineering network.</p></div><div class="tgrid four">${MORE.map(member).join('')}</div></div>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sechead"><h2 class="h-lg">One connected <span class="serif" style="font-weight:400">workflow</span></h2><div class="sechead__r"><p class="lede">From early product thinking to technical execution, scoped around what each project needs.</p></div></div>
    <div class="deliver">${['Product Design &amp; UX', 'Modern Websites', 'Custom Web Applications', 'AI &amp; Machine Learning', 'API &amp; Backend Systems', 'Cloud &amp; Infrastructure'].map((s, i) => `<div class="rv"><span>0${i + 1}</span>${s}</div>`).join('')}</div>
    <div class="sechead" style="margin-top:clamp(80px,10vw,150px)"><h2 class="h-lg">Focused from start to <span class="serif" style="font-weight:400">finish</span></h2><div class="sechead__r"><p class="lede">The same four stages on every project, with the right specialists brought in at the right time.</p></div></div>
    <div class="steps4">${[['01 / Define', 'Discover', 'Clarify the problem, priorities, scope and success criteria.'], ['02 / Shape', 'Design', 'Turn goals into clear flows, interfaces and product decisions.'], ['03 / Engineer', 'Build', 'Plan the implementation and coordinate the specialists it needs.'], ['04 / Launch', 'Deliver', 'Review quality, refine the experience and support handoff.']].map(s => `<article class="step rv"><span class="mono muted">${s[0]}</span><div><h3>${s[1]}</h3><p>${s[2]}</p></div></article>`).join('')}</div>
    <p class="mono muted" style="margin-top:28px">Specialists are engaged according to scope and availability.</p>
  </div></section>`;
}

function pDemo() {
  const SD = 'https://signaldesk.mahir.design';
  return hero('<a href="#more">Products</a><span>/</span><span>SignalDesk</span>', 'SignalDesk. <span class="serif">Your business, in focus.</span>',
    'An operations workspace for service businesses running more than one company. Bring in the files you already have and see the essentials in one calm place.',
    `<div class="pg-cta"><a href="${SD}" target="_blank" rel="noopener" class="btn btn--ink">Open live demo <span class="arr">→</span></a><a href="https://cal.com/mahirakash/15min" target="_blank" rel="noopener" class="btn btn--line">Book a walkthrough</a></div>`) +
  `<section id="sd-try"><div class="wrap">
    <div class="sd-tabs" role="group" aria-label="Demo view">
      <button aria-pressed="true" data-view="home" data-img="assets/sd/home.webp">Home</button>
      <button aria-pressed="false" data-view="library" data-img="assets/sd/library.webp">Data Library</button>
      <button aria-pressed="false" data-view="dashboard" data-img="assets/sd/dashboard.webp">Executive Dashboard</button>
    </div>
    <div class="browser rv">
      <div class="browser__bar"><i></i><i></i><i></i><span class="browser__url" id="sdUrl">signaldesk.mahir.design</span><a class="browser__open ulink" id="sdOpen" href="${SD}" target="_blank" rel="noopener">Full screen ↗</a></div>
      <div class="browser__view" id="sdView"><img id="sdImg" src="assets/sd/home.webp" alt="SignalDesk home screen"></div>
    </div>
    <p class="mono muted sd-live-note">Live product with demo data · click around, nothing you do changes real records</p>
  </div></section>
  <section class="sec"><div class="wrap">
    <div class="sechead"><h2 class="h-lg">How it <span class="serif" style="font-weight:400">works</span></h2><div class="sechead__r"><p class="lede">Up and running with the files you already have.</p></div></div>
    <div class="steps3">
      <div class="rv"><span class="mono muted">01</span><h4>Bring your files</h4><p>Job schedules, invoices, customer lists. CSV or PDF, from every company you run.</p></div>
      <div class="rv"><span class="mono muted">02</span><h4>Map once</h4><p>Each file is checked and mapped, with missing or invalid values flagged before they skew anything.</p></div>
      <div class="rv"><span class="mono muted">03</span><h4>See the picture</h4><p>Revenue, jobs, customers and invoices in one dashboard, per company or all together.</p></div>
    </div>
  </div></section>
  <section class="sec" style="padding-top:0"><div class="wrap">
    <div class="sechead"><h2 class="h-lg">What you <span class="serif" style="font-weight:400">get</span></h2><div class="sechead__r"><p class="lede">Built for owners and operators who need answers, not another spreadsheet.</p></div></div>
    <div class="feat">
      <div class="rv"><svg viewBox="0 0 24 24"><path d="M4 4h10l6 6v10H4z"/><path d="M14 4v6h6"/></svg><h4>One data library</h4><p>Every file in one place, with what's ready, mapped, or needs a second look.</p></div>
      <div class="rv"><svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg><h4>Executive dashboard</h4><p>Revenue, completed jobs, active customers, outstanding invoices and completion rate.</p></div>
      <div class="rv"><svg viewBox="0 0 24 24"><circle cx="7" cy="12" r="3"/><circle cx="17" cy="7" r="3"/><circle cx="17" cy="17" r="3"/></svg><h4>Every company, one view</h4><p>Switch between companies or see the whole group together.</p></div>
      <div class="rv"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16v1"/></svg><h4>Data health</h4><p>Missing or invalid values are flagged before they reach the numbers.</p></div>
      <div class="rv"><svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0"/><path d="M12 3v18M3 12h18"/></svg><h4>Revenue vs. target</h4><p>Actual revenue against the plan, so progress reads as a percentage.</p></div>
      <div class="rv"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><h4>Private by design</h4><p>Your files stay yours. No cloud accounts needed to get started.</p></div>
    </div>
  </div></section>
  <section class="endcta"><div class="wrap"><span class="label" style="justify-content:center">( See it with your data )</span><h2 class="h-lg">Want SignalDesk for <span class="serif" style="font-weight:400">your business?</span></h2><a href="https://cal.com/mahirakash/15min" target="_blank" rel="noopener" class="btn btn--ink">Book a demo call <span class="arr">→</span></a></div></section>`;
}
function sdInit() {
  const SD = 'https://signaldesk.mahir.design';
  const view = $('#sdView'); if (!view) return;
  const live = matchMedia('(min-width: 900px)').matches;
  let frame = null;
  const fitFrame = () => { if (frame) frame.style.transform = `scale(${view.clientWidth / 1456})`; };
  const show = btn => {
    $$('.sd-tabs button').forEach(b => b.setAttribute('aria-pressed', String(b === btn)));
    const v = btn.dataset.view, url = v === 'home' ? SD + '/' : `${SD}/demo?view=${v}`;
    $('#sdUrl').textContent = url.replace('https://', '');
    $('#sdOpen').href = url;
    if (live) {
      if (!frame) { frame = document.createElement('iframe'); frame.title = 'SignalDesk live demo'; frame.loading = 'lazy'; view.innerHTML = ''; view.append(frame); fitFrame(); }
      frame.src = url;
    } else { const img = $('#sdImg'); img.src = btn.dataset.img; img.alt = `SignalDesk ${btn.textContent} screen`; }
  };
  $$('.sd-tabs button').forEach(b => b.addEventListener('click', () => show(b)));
  if (live) { show($('.sd-tabs button')); new ResizeObserver(fitFrame).observe(view); }
}
window.sdInit = sdInit;

/* ---------- smooth scroll ---------- */
let lenis = null;
if (window.Lenis && !RM) {
  lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  if (HAS_GSAP) { lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); }
  else { const raf = t => { lenis.raf(t); requestAnimationFrame(raf); }; requestAnimationFrame(raf); }
}
const scrollToEl = (el, immediate) => {
  const y = el === 0 ? 0 : Math.max(0, el.getBoundingClientRect().top + window.scrollY - 70);
  if (lenis) { if (immediate) { lenis.resize(); lenis.scrollTo(y, { immediate: true, force: true }); } else lenis.scrollTo(y, { duration: 1.4 }); }
  window.scrollTo({ top: y, behavior: immediate ? 'instant' : 'smooth' });
};

/* ---------- fit text ---------- */
function fit(el, ratio = 1) {
  if (!el) return;
  el.style.transition = 'none'; el.style.fontSize = '100px'; el.style.width = 'max-content';
  const w = el.getBoundingClientRect().width; el.style.width = '';
  const avail = el.parentElement.clientWidth;
  el.style.fontSize = (100 * avail / w * ratio) + 'px';
}
function fitAll() {
  const mob = innerWidth <= 720;
  fit($('#heroName'), mob ? .96 : .94);
  fit($('#footBig'), .97);
}

/* ---------- split hero name ---------- */
const nameEl = $('#heroName');
nameEl.innerHTML = [...nameEl.textContent].map(c => `<span class="chm" aria-hidden="true"><span class="ch">${c}</span></span>`).join('');
fitAll();
addEventListener('resize', () => { fitAll(); });
document.fonts && document.fonts.ready.then(() => { fitAll(); HAS_GSAP && ScrollTrigger.refresh(); });

/* ---------- clocks ---------- */
const fmtT = (tz, opts = {}) => new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', timeZone: tz, ...opts }).format(new Date());
function tick() {
  const dk = fmtT('Asia/Dhaka');
  ['tDhaka', 'tMine', 'tFoot'].forEach(id => { const e = document.getElementById(id); if (e) e.textContent = dk; });
  const ny = $('#tNY'); if (ny) ny.textContent = fmtT('America/New_York');
  const yours = $('#tYours'); if (yours) yours.textContent = fmtT(undefined);
  const h = +new Intl.DateTimeFormat('en-US', { hour: 'numeric', hourCycle: 'h23', timeZone: 'Asia/Dhaka' }).format(new Date());
  const on = h >= 18 || h < 7;
  const st = $('#status'); if (st) { st.classList.toggle('on', on); st.lastElementChild.textContent = on ? 'Working now' : 'Resting · back tonight'; }
  try { if (Intl.DateTimeFormat().resolvedOptions().timeZone === 'Asia/Dhaka') { const w = $('#tYoursWrap'); if (w) w.style.display = 'none'; } } catch (e) { }
}
tick(); setInterval(tick, 15000);

/* ---------- menu ---------- */
const sheet = $('#sheet'), menuBtn = $('#menuBtn');
const setMenu = open => { sheet.classList.toggle('open', open); sheet.setAttribute('aria-hidden', String(!open)); menuBtn.setAttribute('aria-expanded', String(open)); open ? lenis && lenis.stop() : lenis && lenis.start(); };
menuBtn.addEventListener('click', () => setMenu(true));
$('#menuClose').addEventListener('click', () => setMenu(false));

/* ---------- cursor ---------- */
const cur = $('#cursor'), lbl = $('#cursorLbl');
if (FINE) {
  let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
  addEventListener('pointermove', e => { x = e.clientX; y = e.clientY; cur.classList.add('on'); }, { passive: true });
  document.addEventListener('pointerleave', () => cur.classList.remove('on'));
  const loop = () => { cx += (x - cx) * .22; cy += (y - cy) * .22; cur.style.transform = `translate(${cx}px,${cy}px)`; lbl.style.left = x + 'px'; lbl.style.top = y + 'px'; requestAnimationFrame(loop); };
  loop();
  document.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-cursor]'); const a = e.target.closest('a,button,label.chip,.ba');
    if (t) { lbl.textContent = t.dataset.cursor; lbl.classList.add('on'); cur.style.opacity = 0; }
    else { lbl.classList.remove('on'); cur.style.opacity = ''; }
    cur.classList.toggle('big', !!a && !t);
  });
}

/* ---------- work hover preview ---------- */
const prev = $('#preview'), prevIn = $('#previewIn');
if (FINE && prev) {
  let px = 0, py = 0, tx = 0, ty = 0, raf = null;
  const items = [...prevIn.children];
  const move = () => { px += (tx - px) * .14; py += (ty - py) * .14; prev.style.left = px + 'px'; prev.style.top = py + 'px'; raf = requestAnimationFrame(move); };
  $$('#workList .wrow').forEach(r => {
    r.addEventListener('pointerenter', e => {
      items.forEach((it, i) => it.classList.toggle('on', i === +r.dataset.prev));
      if (!prev.classList.contains('on')) { px = tx = e.clientX; py = ty = e.clientY; }
      prev.classList.add('on'); if (!raf) move();
    });
    r.addEventListener('pointermove', e => { tx = e.clientX + 40; ty = e.clientY; });
  });
  $('#workList').addEventListener('pointerleave', () => { prev.classList.remove('on'); cancelAnimationFrame(raf); raf = null; });
}

/* ---------- services accordion ---------- */
$$('#svc .svc__btn').forEach(b => b.addEventListener('click', () => {
  const row = b.parentElement, open = !row.classList.contains('open');
  $$('#svc .svc__row').forEach(r => { r.classList.remove('open'); r.firstElementChild.setAttribute('aria-expanded', 'false'); });
  if (open) { row.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  setTimeout(() => HAS_GSAP && ScrollTrigger.refresh(), 650);
}));

/* ---------- before / after ---------- */
(() => { const ba = $('#ba'), r = $('#baRange'); if (!ba || !r) return; const set = () => ba.style.setProperty('--p', r.value + '%'); r.addEventListener('input', set); set(); })();

/* ---------- form ---------- */
$('#form').addEventListener('submit', async e => {
  e.preventDefault();
  const f = e.target, msg = $('#formMsg'), d = Object.fromEntries(new FormData(f));
  if (!d.name || !d.email || !/^\S+@\S+\.\S+$/.test(d.email) || !d.message) { msg.className = 'form__msg err'; msg.textContent = 'Please add your name, a valid email and a few lines about the project.'; return; }
  const text = `Hi Mahir, I'm ${d.name} (${d.email}).\nI'm a ${d.role}, looking for: ${d.service}. Budget: ${d.budget}.\n\n${d.message}`;
  if (CONFIG.web3formsKey) {
    msg.className = 'form__msg'; msg.textContent = 'Sending…';
    try {
      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: CONFIG.web3formsKey, subject: `New project enquiry from ${d.name}`, from_name: 'mahir.design', ...d }) });
      const j = await res.json();
      if (j.success) { f.reset(); msg.className = 'form__msg ok'; msg.textContent = 'Thank you! Your submission has been received!'; return; }
      throw new Error();
    } catch (_) { msg.className = 'form__msg err'; msg.textContent = 'Oops! Something went wrong while submitting the form. Opening WhatsApp instead…'; }
  }
  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(text)}`;
  const w = window.open(url, '_blank', 'noopener');
  msg.className = 'form__msg ok';
  msg.innerHTML = w ? 'WhatsApp opened with your message ready to send.' : `Almost there: <a class="ulink" href="${url}" target="_blank" rel="noopener">send it on WhatsApp ↗</a>`;
});

/* ---------- motion ---------- */
let homeTriggers = [];
function homeMotion() {
  if (!MOTION) return;
  // hero parallax
  // hero: zoom into the name until the photo fills the screen
  const heroEl = $('#hero');
  const htl = gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom bottom', scrub: 0.6, onUpdate: st => heroEl.classList.toggle('is-photo', st.progress > .88) } });
  htl.to('#heroName', { scale: 38, ease: 'power3.in', duration: 1 }, 0)
     .fromTo('#hxImg img', { scale: 1.18 }, { scale: 1, ease: 'none', duration: 1 }, 0)
     .to('#hxMask', { opacity: 0, duration: .12, ease: 'none' }, .86)
     .to('#hxShade', { opacity: 1, duration: .14, ease: 'none' }, .86);
  homeTriggers.push(htl.scrollTrigger);
  // about word reveal
  const big = $('#aboutBig');
  if (big && !big.dataset.split) {
    big.dataset.split = 1;
    const walk = node => { [...node.childNodes].forEach(n => { if (n.nodeType === 3) { const frag = document.createDocumentFragment(); n.textContent.split(/(\s+)/).forEach(p => { if (/^\s+$/.test(p) || !p) frag.append(p); else { const s = document.createElement('span'); s.className = 'w'; s.textContent = p; frag.append(s); } }); n.replaceWith(frag); } else walk(n); }); };
    walk(big);
  }
  homeTriggers.push(gsap.to('#aboutBig .w', { opacity: 1, stagger: .08, ease: 'none', scrollTrigger: { trigger: '#aboutBig', start: 'top 82%', end: 'bottom 45%', scrub: true } }).scrollTrigger);
  homeTriggers.push(gsap.fromTo('#aboutImg', { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: '#aboutImg', start: 'top bottom', end: 'bottom top', scrub: true } }).scrollTrigger);
  // work rows
  homeTriggers.push(...ScrollTrigger.batch('#workList .wrow', { start: 'top 92%', once: true, onEnter: els => gsap.fromTo(els, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: .08, ease: 'expo.out' }) }));
}
function reveals(scope) {
  if (!MOTION) return [];
  return ScrollTrigger.batch(scope.querySelectorAll('.rv'), { start: 'top 90%', once: true, onEnter: els => gsap.to(els, { y: 0, opacity: 1, duration: 1.1, stagger: .08, ease: 'expo.out', overwrite: true }) });
}
reveals(document);
if (MOTION) {
  ScrollTrigger.create({ trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true, animation: gsap.fromTo('#footBig', { yPercent: 40 }, { yPercent: 0, ease: 'none' }) });
}

/* ---------- intro ---------- */
function intro() {
  const chars = $$('#heroName .ch');
  if (!MOTION) return;
  const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  tl.fromTo(chars, { yPercent: 110 }, { yPercent: 0, duration: 1.4, stagger: .06 })
    .fromTo('#hxImg img', { scale: 1.35 }, { scale: 1.18, duration: 2 }, 0)
    .fromTo('.hx__top > *, .hx__bot > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .06 }, '<.5')
    .fromTo('.nav', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '<');
}
function runLoader() {
  const ld = $('#loader');
  if (document.documentElement.classList.contains('no-loader') || !MOTION) { ld.remove(); intro(); return; }
  try { sessionStorage.setItem('md-seen', '1'); } catch (e) { }
  lenis && lenis.stop();
  const num = $('#loaderNum'), o = { v: 0 };
  gsap.timeline()
    .to(o, { v: 100, duration: 1.5, ease: 'power3.inOut', onUpdate: () => { num.textContent = Math.round(o.v); } })
    .to('#loaderBar', { scaleX: 1, duration: 1.5, ease: 'power3.inOut' }, 0)
    .to(ld, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut', onComplete: () => { ld.remove(); lenis && lenis.start(); } })
    .add(intro, '-=.55');
}

/* ---------- router ---------- */
const home = $('#top'), page = $('#page');
const HOME_TITLE = document.title;
let current = '', pageTriggers = [];
const isPage = h => h === 'dashboards' || h === 'team' || h === 'signaldesk' || (h.startsWith('case-') && CASES[h.slice(5)]);
const titleOf = h => h === 'dashboards' ? 'Dashboards' : h === 'team' ? 'Team' : h === 'signaldesk' ? 'SignalDesk' : CASES[h.slice(5)].name;
function setActive(h) { $$('.nav__links a').forEach(a => { const t = a.getAttribute('href').slice(1); a.classList.toggle('is-active', t === h || ((h.startsWith('case-') || h === 'dashboards' || h === 'signaldesk') && t === 'work')); }); }
function showPage(h) {
  if (current !== h) {
    pageTriggers.forEach(t => t.kill()); pageTriggers = [];
    page.innerHTML = h === 'dashboards' ? pDash() : h === 'team' ? pTeam() : h === 'signaldesk' ? pDemo() : pCase(h.slice(5));
    home.hidden = true; page.hidden = false; current = h;
    document.title = `${titleOf(h)} — Mahir Abrar Akash`;
    scrollToEl(0, true);
    if (h === 'signaldesk' && window.sdInit) window.sdInit();
    if (MOTION) {
      gsap.fromTo(page.querySelectorAll('.crumb,.pg-title,.pg-hero .lede,.facts,.pg-cta'), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, stagger: .07, ease: 'expo.out' });
      ScrollTrigger.refresh(); pageTriggers = reveals(page);
    }
  }
  setActive(h);
}
function showHome(anchor, smooth) {
  const fromPage = !page.hidden;
  if (fromPage) {
    pageTriggers.forEach(t => t.kill()); pageTriggers = [];
    page.hidden = true; page.innerHTML = ''; home.hidden = false; current = ''; document.title = HOME_TITLE;
    scrollToEl(0, true); fitAll(); HAS_GSAP && ScrollTrigger.refresh();
  }
  setActive(anchor || '');
  const el = anchor && anchor !== 'top' ? document.getElementById(anchor) : null;
  if (el) requestAnimationFrame(() => requestAnimationFrame(() => scrollToEl(el, fromPage || !smooth)));
  else if (anchor === 'top') scrollToEl(0, fromPage);
}
function route(smooth) { const ph = location.pathname.replace(/^\/+|\/+$/g, ''); const h = decodeURIComponent((location.hash || '').slice(1)) || (isPage(ph) ? ph : ''); if (isPage(h)) showPage(h); else showHome(h, smooth); }
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]'); if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
  const h = a.getAttribute('href'); if (h === '#') return;
  e.preventDefault(); setMenu(false);
  if (h === '#sd-try') { const el = $('#sd-try'); el && scrollToEl(el); return; }
  if (h === '#contact') { const el = $('#contact'); el && scrollToEl(el); setActive('contact'); return; }
  if (location.hash !== h) history.pushState(null, '', h);
  route(true);
});
addEventListener('popstate', () => route(false));
addEventListener('hashchange', () => route(false));

homeMotion();
if (location.hash || location.pathname.length > 1) route(false);
runLoader();
})();
