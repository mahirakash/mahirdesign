/* SignalDesk interactive demo (fictional data) */
const COS=[{k:'brightnest',n:'BrightNest',full:'BrightNest Cleaning',file:'BrightNest',rev:68014,c:'#0a0a0a'},{k:'metroshine',n:'MetroShine',full:'MetroShine Services',file:'MetroShine',rev:70651,c:'#737373'},{k:'coastal',n:'Coastal',full:'Coastal Facility Care',file:'Coastal',rev:95610,c:'#bdbdbd'}];
const TYPES=[['jobs','Jobs',1],['invoices','Invoices',1],['customers','Customers',1],['employees','Employees',0],['expenses','Expenses',0]];
const FILES=[]; COS.forEach(c=>TYPES.forEach(t=>FILES.push({co:c,name:`${c.file}_${t[0]}_2026.csv`,cat:t[1],mapped:!!t[2],review:t[0]==='employees'})));
const fmt=n=>'$'+n.toLocaleString('en-US');
/* illustrative daily series for the demo chart (sums to the demo's $234,275 total) */
const DAYS=30, rawRev=[...Array(DAYS)].map((_,i)=>1+.28*Math.sin(i*.55)+.12*Math.sin(i*1.7+1)+i*.008), rs=rawRev.reduce((a,b)=>a+b,0);
const REV=rawRev.map(v=>v/rs*234275), TGT=[...Array(DAYS)].map((_,i)=>273795/DAYS*(.96+.08*Math.sin(i*.3)));
const JOBS=[...Array(DAYS)].map((_,i)=>Math.round(739/DAYS*(1+.22*Math.sin(i*.9))));


function sdInit(){
  const root=document.getElementById('sd'); if(!root) return;
  const body=document.getElementById('sdBody'), crumb=document.getElementById('sdCrumb');
  let view='home', co='all';
  const cur=()=>COS.find(c=>c.k===co);
  const files=()=>co==='all'?FILES:FILES.filter(f=>f.co.k===co);
  const head=(eb,h,p)=>`<div class="sd-h"><div><div class="sd-eyebrow">${eb}</div><h3>${h}</h3><p>${p}</p></div><span class="sd-btn">↑ Upload data</span></div>
    <div class="sd-meta"><span class="sd-chip">${co==='all'?'All companies':cur().full}</span><span>● Updated Sep 9, 2026 <span class="sd-tag">Demo data</span></span></div>`;
  const row=f=>`<tr><td>${f.name}<small>CSV · ${f.mapped?'Used in dashboard':'Not mapped'}</small></td><td>${f.co.n}<small>${f.cat}</small></td><td><span class="sd-st${f.review?' rev':''}">${f.review?'Needs review':'Ready'}</span></td><td>Sep 9, 2026</td></tr>`;
  function home(){
    const fs=files(), rev=co==='all'?234275:cur().rev;
    return head('A LITTLE LESS SCATTERED.','Good morning, Alex ✳','Your files, your companies, and a clearer place to start.')+
    `<div class="sd-kpis"><div class="sd-card"><small>Total files</small><strong>${fs.length}</strong><em>All your business files</em></div><div class="sd-card"><small>Datasets ready</small><strong>${fs.length}</strong><em>Structured and previewable</em></div><div class="sd-card"><small>Records processed</small><strong>${co==='all'?'24,896':'—'}</strong><em>${co==='all'?'Across your data library':'Shown for all companies'}</em></div><div class="sd-card"><small>Needs attention</small><strong class="sd-warn">${fs.filter(f=>f.review).length}</strong><em>A few details to check</em></div></div>
    <div class="sd-grid2"><div class="sd-panel"><h4>Recent uploads</h4><p>Your latest files, ready for a closer look</p><div class="sd-scroll"><table class="sd-table"><thead><tr><th>File name</th><th>Company / Category</th><th>Status</th><th>Uploaded</th></tr></thead><tbody>${fs.slice(0,5).map(row).join('')}</tbody></table></div></div>
      <div style="display:flex;flex-direction:column;gap:12px"><div class="sd-panel"><h4>Data health</h4><div class="sd-health"><strong>80% ready</strong><div class="sd-track"><i style="width:80%"></i><i style="width:20%"></i></div><span>12 files ready · 3 need review</span><span>3 files have missing or invalid values</span></div></div>
      <div class="sd-panel"><h4>A small business snapshot</h4><p>Last 30 days · Mapped datasets only</p><div class="sd-act"><div>Revenue <b style="margin-left:auto">${fmt(rev)}</b></div><div>Completed jobs <b style="margin-left:auto">${co==='all'?'739':'—'}</b></div><div>Outstanding invoices <b style="margin-left:auto">${co==='all'?'$78,875':'—'}</b></div></div></div></div></div>
    <div class="sd-panel"><h4>Recent activity</h4><p>What changed in your workspace</p><div class="sd-act">
      <div><i></i><span>BrightNest job and invoice records refreshed<small>BrightNest Cleaning · Sep 9, 2026</small></span></div>
      <div><i class="w"></i><span>Employee file flagged: one missing email address<small>BrightNest Cleaning · Sep 9, 2026</small></span></div>
      <div><i></i><span>MetroShine job and invoice records refreshed<small>MetroShine Services · Sep 9, 2026</small></span></div></div></div>`;
  }
  function library(){
    const fs=files();
    return head('EVERYTHING IN ONE PLACE','Data Library',`${fs.length} files · ${fs.filter(f=>f.mapped).length} used in the dashboard`)+
    `<div class="sd-panel"><div class="sd-scroll"><table class="sd-table"><thead><tr><th>File name</th><th>Company / Category</th><th>Status</th><th>Uploaded</th></tr></thead><tbody>${fs.map(row).join('')}</tbody></table></div></div>`;
  }
  function dash(){
    const W=600,H=200,P=28,max=12000;
    const x=i=>P+i*(W-P*2)/(DAYS-1), y=v=>H-P-v/max*(H-P*2);
    const line=a=>a.map((v,i)=>`${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    const grid=[0,4000,8000,12000].map(v=>`<line x1="${P}" x2="${W-P}" y1="${y(v)}" y2="${y(v)}" stroke="#efefed"/><text x="${P-6}" y="${y(v)+3}" text-anchor="end" font-size="9" fill="#8a8a8a">${v/1000}k</text>`).join('');
    const ticks=['Aug 11','Aug 16','Aug 21','Aug 26','Aug 31','Sep 5'].map((t,i)=>`<text x="${x(i*5)}" y="${H-8}" text-anchor="middle" font-size="9" fill="#8a8a8a">${t}</text>`).join('');
    const jb=JOBS.map((v,i)=>{ const bw=(W-P*2)/DAYS*.6, h=v/40*(H-P*2); return `<rect x="${x(i)-bw/2}" y="${H-P-h}" width="${bw}" height="${h}" rx="2" fill="#0a0a0a"/><rect x="${x(i)-bw/2}" y="${H-P-h/0.923}" width="${bw}" height="${h/0.923-h}" rx="2" fill="#e2e2e0"/>`; }).join('');
    const pct=85.6, C=2*Math.PI*44;
    const kp=[['Total revenue',co==='all'?'$234,275':fmt(cur().rev),'3.2%'],['Completed jobs','739','6.1%'],['Active customers','873','9.1%'],['Outstanding invoices','$78,875','5.4%'],['Completion rate','92.3%','1.6%'],['Avg. revenue per job','$317','3.1%']];
    return head('THE BIG PICTURE','Executive Dashboard','The essentials, calculated from your mapped business records.')+
    `<div class="sd-meta"><span><span class="sd-chip">Last 30 days</span> <span class="sd-chip">All services</span></span><span>2026-08-11 — 2026-09-09</span></div>
    <div class="sd-kpis six">${kp.map((k,i)=>`<div class="sd-card"><small>${k[0]}${i===0&&co!=='all'?' · '+cur().n:''}</small><strong>${k[1]}</strong><em><span class="sd-up">▲ ${k[2]}</span> vs previous period</em><em>3 mapped files · Updated 09-09</em></div>`).join('')}</div>
    <div class="sd-grid2"><div class="sd-panel"><h4>Revenue over time</h4><p>Actual revenue and the plan behind it</p><svg class="sd-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Daily revenue against target">${grid}${ticks}<polyline points="${line(TGT.map(v=>v/1))}" fill="none" stroke="#b5b5b5" stroke-width="1.5" stroke-dasharray="5 4"/><polygon points="${x(0)},${y(0)} ${line(REV)} ${x(DAYS-1)},${y(0)}" fill="rgba(47,182,124,.12)"/><polyline points="${line(REV)}" fill="none" stroke="#0a0a0a" stroke-width="2.4"/><circle cx="${x(DAYS-1)}" cy="${y(REV[DAYS-1])}" r="4" fill="#0a0a0a"/></svg><div class="sd-legend"><span style="--c:#0a0a0a">Revenue</span><span style="--c:#b5b5b5">Target</span></div></div>
      <div class="sd-panel"><h4>Revenue versus target</h4><p>A practical view of progress</p><div class="sd-ring"><svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="44" fill="none" stroke="#efefed" stroke-width="12"/><circle cx="55" cy="55" r="44" fill="none" stroke="#0a0a0a" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C*pct/100} ${C}" transform="rotate(-90 55 55)"/><text x="55" y="60" text-anchor="middle" font-size="17" font-weight="600" fill="#0a0a0a">${pct}%</text></svg><div class="sd-act"><div>Actual <b style="margin-left:auto">$234,275</b></div><div>Target <b style="margin-left:auto">$273,795</b></div><small>Target = planned job value × 1.08 plus non-job sales × 1.10.</small></div></div></div></div>
    <div class="sd-grid2"><div class="sd-panel"><h4>Jobs scheduled vs. completed</h4><p>Completion, in context</p><svg class="sd-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="Daily jobs scheduled and completed">${[0,10,20,30,40].map(v=>{const yy=H-P-v/40*(H-P*2);return `<line x1="${P}" x2="${W-P}" y1="${yy}" y2="${yy}" stroke="#efefed"/><text x="${P-6}" y="${yy+3}" text-anchor="end" font-size="9" fill="#8a8a8a">${v}</text>`}).join('')}${jb}${ticks}</svg><div class="sd-legend"><span style="--c:#0a0a0a">Completed</span><span style="--c:#e2e2e0">Scheduled</span></div></div>
      <div class="sd-panel"><h4>Revenue by company</h4><p>Every company, part of the same picture</p>${COS.map(c=>`<div class="sd-cobar${co!=='all'&&co!==c.k?' dim':''}"><span>${c.full}</span><div class="sd-track"><i style="width:${c.rev/95610*100}%;background:${c.c}"></i></div><b>${fmt(c.rev)}</b></div>`).join('')}
        <h4 style="margin-top:8px">Invoice / payment status</h4><div class="sd-split"><i style="width:66.3%;background:#0a0a0a"></i><i style="width:33.7%;background:#d9a43a"></i></div><div class="sd-legend"><span style="--c:#0a0a0a">Paid · 491 invoices · $155,400</span><span style="--c:#d9a43a">Unpaid · 248 invoices · $78,875</span></div></div></div>`;
  }
  function render(){
    body.innerHTML=view==='home'?home():view==='library'?library():dash();
    crumb.textContent=view==='home'?'Home':view==='library'?'Data Library':'Executive Dashboard';
    root.querySelectorAll('.sd-nav').forEach(b=>b.setAttribute('aria-current',String(b.dataset.v===view)));
    root.querySelectorAll('.sd-co').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.co===co)));
    if(window.gsap&&!matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.fromTo(body.children,{y:10,opacity:0},{y:0,opacity:1,duration:.4,stagger:.04,ease:'power2.out',clearProps:'all'});
  }
  root.addEventListener('click',e=>{ const n=e.target.closest('.sd-nav'), c=e.target.closest('.sd-co'); if(n){ view=n.dataset.v; render(); } else if(c){ co=c.dataset.co; render(); } });
  render();
}
window.sdInit=sdInit;
window.COS=COS;
