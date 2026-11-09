/* Portfolio logic: renders everything from data.js, plus the decoration. No dependencies. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(pointer: fine)').matches;
  const U = GITHUB_USER;
  const repoUrl = (r) => `https://github.com/${U}/${r}`;
  const liveUrl = (r) => `https://${U}.github.io/${r}/`;

  /* ---------- theme ---------- */
  const root = document.documentElement;
  const themeBtn = $('#theme');
  function paintTheme() {
    const day = root.dataset.theme === 'day';
    themeBtn.textContent = day ? '☀' : '☾';
    themeBtn.setAttribute('aria-pressed', String(day));
    $('meta[name="theme-color"]').content = day ? '#fff1e0' : '#120d24';
    sky.colors();
  }
  themeBtn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'day' ? 'night' : 'day';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
    paintTheme();
  });

  /* ---------- star field canvas ---------- */
  const sky = (() => {
    const cv = $('#sky'), cx = cv.getContext('2d');
    let W, H, stars = [], shoot = null, starRGB = '246,239,226', lineRGB = '242,196,109', P = 0;
    function colors() {
      const day = root.dataset.theme === 'day';
      starRGB = day ? '217,137,43' : '246,239,226';
      lineRGB = day ? '217,137,43' : '242,196,109';
    }
    function resize() {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      cx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(W < 700 ? 55 : 130, (W * H) / 11000));
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H, z: Math.random() * 0.9 + 0.1,
        r: Math.random() * 1.3 + 0.35, t: Math.random() * 6.28,
        vx: (Math.random() - 0.5) * 0.06, vy: (Math.random() - 0.5) * 0.06
      }));
      if (reduce) frame(0);
    }
    function frame(time) {
      cx.clearRect(0, 0, W, H);
      const sy = scrollY, dens = 0.7 + 0.3 * P, pts = [];
      for (const s of stars) {
        if (!reduce) { s.x += s.vx; s.y += s.vy; }
        if (s.x < 0) s.x = W; if (s.x > W) s.x = 0;
        if (s.y < 0) s.y = H; if (s.y > H) s.y = 0;
        const y = (((s.y - sy * s.z * 0.08) % H) + H) % H;
        const a = (0.35 + 0.65 * Math.abs(Math.sin(time / 1300 + s.t))) * (0.4 + 0.6 * s.z) * dens;
        cx.fillStyle = `rgba(${starRGB},${a})`;
        cx.beginPath(); cx.arc(s.x, y, s.r, 0, 6.283); cx.fill();
        pts.push([s.x, y]);
      }
      cx.lineWidth = 0.6;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i][0] - pts[j][0], dy = pts[i][1] - pts[j][1], d = dx * dx + dy * dy;
          if (d < 9000) {
            cx.strokeStyle = `rgba(${lineRGB},${(1 - d / 9000) * 0.22})`;
            cx.beginPath(); cx.moveTo(pts[i][0], pts[i][1]); cx.lineTo(pts[j][0], pts[j][1]); cx.stroke();
          }
        }
      }
      if (!reduce) {
        if (!shoot && Math.random() < 0.0012) shoot = { x: Math.random() * W, y: Math.random() * H * 0.4, l: 0 };
        if (shoot) {
          shoot.x += 11; shoot.y += 5; shoot.l += 1;
          const g = cx.createLinearGradient(shoot.x, shoot.y, shoot.x - 120, shoot.y - 55);
          g.addColorStop(0, `rgba(${lineRGB},.95)`); g.addColorStop(1, `rgba(${lineRGB},0)`);
          cx.strokeStyle = g; cx.lineWidth = 2;
          cx.beginPath(); cx.moveTo(shoot.x, shoot.y); cx.lineTo(shoot.x - 120, shoot.y - 55); cx.stroke();
          if (shoot.l > 90) shoot = null;
        }
      }
    }
    function loop(t) { if (!document.hidden) frame(t); requestAnimationFrame(loop); }
    addEventListener('resize', resize);
    resize(); colors();
    if (!reduce) requestAnimationFrame(loop);
    return { colors, setP: (v) => { P = v; } };
  })();

  /* ---------- scroll progress, scrollspy, cursor glow ---------- */
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(1, scrollY / max) : 0;
      root.style.setProperty('--p', p.toFixed(3)); sky.setP(p);
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  const spyTargets = $$('[data-spy]').map((a) => [a, document.getElementById(a.dataset.spy)]).filter((x) => x[1]);
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        spyTargets.forEach(([a, el]) => a.classList.toggle('on', el === e.target));
        const on = $('.dock a.on'); if (on) on.scrollIntoView({ inline: 'center', block: 'nearest' });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  spyTargets.forEach(([, el]) => spy.observe(el));

  if (fine && !reduce) {
    const glow = $('.glow'); let gx = -200, gy = -200, tx = -200, ty = -200;
    addEventListener('pointermove', (e) => { tx = e.clientX - 170; ty = e.clientY - 170; });
    (function move() { gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12; glow.style.translate = `${gx}px ${gy}px`; requestAnimationFrame(move); })();
  }

  /* ---------- typewriter ---------- */
  function typer(el, words, speed = 70, hold = 1500) {
    if (reduce) { el.textContent = words[0]; return; }
    let w = 0, i = 0, del = false;
    (function t() {
      const word = words[w]; el.textContent = word.slice(0, i);
      if (!del && i === word.length) { del = true; return setTimeout(t, hold); }
      if (del && i === 0) { del = false; w = (w + 1) % words.length; return setTimeout(t, 300); }
      i += del ? -1 : 1; setTimeout(t, del ? 35 : speed);
    })();
  }

  /* ---------- hero ---------- */
  document.title = `${PROFILE.name} · Portfolio`;
  const parts = PROFILE.name.trim().split(/\s+/);
  $('#name').innerHTML = parts.length > 1
    ? `${esc(parts[0])}<br><em>${esc(parts.slice(1).join(' '))}</em>` : esc(PROFILE.name);
  typer($('#log'), [PROFILE.log], 60, 1e9);
  typer($('#role'), PROFILE.roles);
  $('#tagline').textContent = PROFILE.tagline;
  $('#dl-resume').href = $('#dl-resume2').href = PROFILE.resume;
  $('#stk1').textContent = PROFILE.stickers[0]; $('#stk2').textContent = PROFILE.stickers[1];
  const photo = $('#photo');
  photo.onerror = () => {
    photo.onerror = null;
    const ini = parts.map((p) => p[0]).join('').slice(0, 2).toUpperCase();
    photo.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 380"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4b2a8a"/><stop offset="1" stop-color="#8a2f6a"/></linearGradient></defs><rect width="280" height="380" fill="url(#g)"/><text x="140" y="215" font-family="Georgia,serif" font-size="96" fill="#f2c46d" text-anchor="middle">${esc(ini)}</text></svg>`);
  };

  /* stats (repo count comes from the GitHub API) */
  const statDefs = [
    { id: 'classes', n: CLASSES.list.length, l: 'classes this term' },
    { id: 'hw', n: HOMEWORK.length, l: 'homework repositories' },
    { id: 'proj', n: PROJECTS.length, l: 'projects built' },
    { id: 'repos', n: null, l: 'public GitHub repos' }
  ];
  $('#stats').innerHTML = statDefs.map((s) =>
    `<li class="rv"><b data-stat="${s.id}" ${s.n != null ? `data-target="${s.n}"` : ''}>${s.n != null ? 0 : '—'}</b><span>${esc(s.l)}</span></li>`).join('');
  function countUp(el) {
    const to = +el.dataset.target; if (isNaN(to)) return;
    if (reduce || to === 0) { el.textContent = to; return; }
    const t0 = performance.now();
    (function s(t) { const k = Math.min(1, (t - t0) / 1100); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(s); })(t0);
  }
  function setStat(id, n) {
    const el = $(`[data-stat="${id}"]`); if (!el) return;
    el.dataset.target = n; if (el.dataset.seen) countUp(el);
  }
  const statObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.dataset.seen = 1; countUp(e.target); statObs.unobserve(e.target); }
  }));
  $$('[data-stat]').forEach((el) => statObs.observe(el));

  /* marquee */
  const names = SKILLS.map((s) => s.name);
  const strip = names.map((n) => `<span>${esc(n)}</span>`).join('');
  $('#marquee').innerHTML = strip + strip + strip + strip;

  /* ---------- about ---------- */
  $('#about-title').textContent = ABOUT.title;
  $('#about-text').innerHTML = ABOUT.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  $('#console-title').textContent = `${(parts[0] || 'me').toLowerCase()}@portfolio ~`;
  const cmdNames = Object.keys(CONSOLE);
  $('#console-cmds').innerHTML = cmdNames.map((c) => `<button type="button" data-cmd="${esc(c)}">${esc(c)}</button>`).join('');
  const screen = $('#console-out'); let run = 0;
  function runCmd(cmd) {
    const id = ++run;
    $$('#console-cmds button').forEach((b) => b.classList.toggle('on', b.dataset.cmd === cmd));
    screen.innerHTML = `<div class="ln"><span class="pr">$</span> <b>${esc(cmd)}</b></div><div class="out"></div>`;
    const out = $('.out', screen), lines = CONSOLE[cmd];
    if (reduce) { out.textContent = lines.join('\n'); return; }
    let i = 0, j = 0;
    (function tick() {
      if (id !== run || i >= lines.length) return;
      const line = lines[i];
      out.textContent = lines.slice(0, i).join('\n') + (i ? '\n' : '') + line.slice(0, ++j);
      if (j >= line.length) { i++; j = 0; }
      setTimeout(tick, 14);
    })();
  }
  $('#console-cmds').addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) runCmd(b.dataset.cmd); });
  runCmd(cmdNames[0]);
  $('#timeline').innerHTML = TIMELINE.map((t) =>
    `<li class="rv"><span class="when">${esc(t.when)}</span><div><h4>${esc(t.title)}</h4><p>${esc(t.text)}</p></div></li>`).join('');

  /* ---------- studying ---------- */
  $('#study-sub').textContent = CLASSES.sub;
  $('#classes').innerHTML = CLASSES.list.map((c) => `
    <article class="card class rv" data-tilt>
      <span class="code">${esc(c.code)} · ${esc(c.term)}</span>
      <h4>${esc(c.name)}</h4><p>${esc(c.what)}</p>
      <div class="bar2" role="img" aria-label="${c.progress}% through the class"><i data-w="${c.progress}"></i></div>
      <div class="mini"><span>progress</span><span>${c.progress}%</span></div>
    </article>`).join('');
  const barObs = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + '%'; barObs.unobserve(e.target); }
  }));
  $$('.bar2 i').forEach((i) => barObs.observe(i));

  const cats = ['All', ...new Set(SKILLS.map((s) => s.cat))];
  let cat = 'All', sel = SKILLS[0].name;
  function paintSkills() {
    $('#skill-filters').innerHTML = cats.map((c) => `<button type="button" class="pill ${c === cat ? 'on' : ''}" aria-pressed="${c === cat}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
    $('#skill-chips').innerHTML = SKILLS.map((s) =>
      `<button type="button" class="skill ${s.name === sel ? 'sel' : ''} ${cat !== 'All' && s.cat !== cat ? 'dim' : ''}" aria-pressed="${s.name === sel}" data-skill="${esc(s.name)}">${esc(s.name)}</button>`).join('');
    const s = SKILLS.find((x) => x.name === sel);
    $('#skill-detail').innerHTML = `<h4>${esc(s.name)}</h4><p>${esc(s.note)}</p><div class="used">USED IN</div>
      <div class="tags">${s.usedIn.map((id) => { const p = PROJECTS.find((x) => x.id === id); return p ? `<a class="tag" href="#proj-${esc(id)}">${esc(p.title)}</a>` : ''; }).join('')}</div>`;
    $$('.proj').forEach((el) => el.classList.toggle('lit', s.usedIn.includes(el.dataset.id)));
  }
  $('#skill-filters').addEventListener('click', (e) => { const b = e.target.closest('[data-cat]'); if (b) { cat = b.dataset.cat; paintSkills(); } });
  $('#skill-chips').addEventListener('click', (e) => { const b = e.target.closest('[data-skill]'); if (b) { sel = b.dataset.skill; paintSkills(); } });

  /* ---------- work ---------- */
  function constellation(seed) {
    let r = seed * 9301 + 49297; const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    const n = 6, p = Array.from({ length: n }, (_, i) => [20 + (i / (n - 1)) * 260 + rnd() * 14, 14 + rnd() * 62]);
    return `<svg viewBox="0 0 300 90" aria-hidden="true">${p.slice(1).map((q, i) => `<line x1="${p[i][0]}" y1="${p[i][1]}" x2="${q[0]}" y2="${q[1]}"/>`).join('')}${p.map((q) => `<circle cx="${q[0]}" cy="${q[1]}" r="${(2 + rnd() * 2).toFixed(1)}"/>`).join('')}</svg>`;
  }
  $('#projects').innerHTML = PROJECTS.map((p, i) => `
    <article class="card proj rv ${p.big ? 'big' : ''}" id="proj-${esc(p.id)}" data-id="${esc(p.id)}" data-tilt>
      ${constellation(i + 3)}
      <h4>${esc(p.title)}</h4><p>${esc(p.text)}</p>
      <div class="tags">${p.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join('')}</div>
      <div class="row"><a class="btn small" href="${liveUrl(p.repo)}" target="_blank" rel="noopener">Live site</a>
      <a class="btn small" href="${repoUrl(p.repo)}" target="_blank" rel="noopener">Repository</a></div>
    </article>`).join('');
  paintSkills();

  /* ---------- resume ---------- */
  const R = RESUME;
  const items = (a) => a.map((x) => `<div class="item"><b>${esc(x.what)}</b><span>${esc(x.when)}</span>${x.more ? `<p>${esc(x.more)}</p>` : ''}</div>`).join('');
  $('#paper').innerHTML = `
    <h3>${esc(PROFILE.name)}</h3>
    <div class="head">${esc(R.headline)} · ${esc(PROFILE.email)} · ${esc(PROFILE.location)} · github.com/${esc(U)}</div>
    <p>${esc(R.summary)}</p>
    <h4>Education</h4>${items(R.education)}
    <h4>Experience &amp; projects</h4>${items(R.experience)}
    <h4>Skills</h4><div class="skl">${SKILLS.map((s) => `<span>${esc(s.name)}</span>`).join('')}</div>
    ${R.certs.length ? `<h4>Certifications</h4>${R.certs.map((c) => `<div class="item"><b>${esc(c.title)} · ${esc(c.issuer)}</b><span>${esc(c.when)}</span></div>`).join('')}` : ''}`;
  $('#print').addEventListener('click', () => print());

  /* ---------- homework + GitHub data ---------- */
  $('#hw-list').innerHTML = HOMEWORK.map((h) => `
    <article class="hw rv" data-repo="${esc(h.repo)}">
      <h4>${esc(h.title)}</h4><p>${h.desc}</p>
      <div class="row">
        <a class="b" href="${liveUrl(h.repo)}" target="_blank" rel="noopener">Live site</a>
        <a class="b" href="${repoUrl(h.repo)}" target="_blank" rel="noopener">Repository</a>
        <a class="b" data-commits href="${repoUrl(h.repo)}/commits" target="_blank" rel="noopener">Commits</a>
      </div>
      <div class="latest" data-latest></div>
    </article>`).join('');

  async function gh(url) {
    const key = 'gh:' + url;
    try { const c = sessionStorage.getItem(key); if (c) return JSON.parse(c); } catch (e) {}
    const r = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!r.ok) throw new Error(r.status);
    const out = { data: await r.json(), link: r.headers.get('link') || '' };
    try { sessionStorage.setItem(key, JSON.stringify(out)); } catch (e) {}
    return out;
  }
  const ago = (d) => {
    const s = (Date.now() - new Date(d)) / 1000;
    if (s < 3600) return Math.max(1, Math.round(s / 60)) + ' min ago';
    if (s < 86400) return Math.round(s / 3600) + ' h ago';
    return Math.round(s / 86400) + ' d ago';
  };
  if (U && U !== 'YOUR-GITHUB-USERNAME') {
    gh(`https://api.github.com/users/${U}`).then(({ data }) => setStat('repos', data.public_repos)).catch(() => {});
    HOMEWORK.forEach(async (h) => {
      const card = $(`.hw[data-repo="${CSS.escape(h.repo)}"]`);
      try {
        const { data, link } = await gh(`https://api.github.com/repos/${U}/${h.repo}/commits?per_page=1`);
        const m = link.match(/[?&]page=(\d+)>;\s*rel="last"/);
        const n = m ? +m[1] : data.length;
        $('[data-commits]', card).textContent = `${n} commit${n === 1 ? '' : 's'}`;
        if (data[0]) $('[data-latest]', card).textContent = `latest: “${data[0].commit.message.split('\n')[0]}” · ${ago(data[0].commit.author.date)}`;
      } catch (e) { /* keep plain "Commits" label */ }
    });
    gh(`https://api.github.com/repos/${U}/${PROFILE.mainRepo}/commits?per_page=8`).then(({ data }) => {
      $('#feed').innerHTML = `<ul>${data.map((c) => `
        <li><a href="${esc(c.html_url)}" target="_blank" rel="noopener">${esc(c.sha.slice(0, 7))}</a>
        <span class="msg">${esc(c.commit.message.split('\n')[0])}</span><time datetime="${esc(c.commit.author.date)}">${ago(c.commit.author.date)}</time></li>`).join('')}</ul>`;
    }).catch(() => { $('#feed').innerHTML = `<p class="mini">Couldn't load commits right now. <a href="${repoUrl(PROFILE.mainRepo)}/commits" target="_blank" rel="noopener">Open them on GitHub →</a></p>`; });
  } else {
    $('#feed').innerHTML = '<p class="mini">Set GITHUB_USER in data.js to show live commit counts and the latest commits here.</p>';
  }

  /* ---------- contact ---------- */
  const links = [
    ['Email', PROFILE.email, `mailto:${PROFILE.email}`],
    ['GitHub', `github.com/${U}`, `https://github.com/${U}`],
    PROFILE.linkedin ? ['LinkedIn', 'profile', PROFILE.linkedin] : null,
    ['Resume', 'PDF', PROFILE.resume]
  ].filter(Boolean);
  $('#links').innerHTML = links.map(([a, b, h]) => `<a href="${esc(h)}" target="_blank" rel="noopener">${esc(a)}<span>${esc(b)}</span></a>`).join('');
  $('#form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const f = e.target, msg = $('#form-msg');
    if (f.website.value) return;                                   // honeypot
    if (!f.name.value.trim() || !/^\S+@\S+\.\S+$/.test(f.email.value) || !f.message.value.trim()) { msg.textContent = 'Please fill in all fields with a valid email.'; return; }
    if (PROFILE.formEndpoint) {
      try {
        const r = await fetch(PROFILE.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(f) });
        msg.textContent = r.ok ? 'Signal received. Thank you! ✦' : 'Something went wrong. Please email me instead.';
        if (r.ok) f.reset();
      } catch (err) { msg.textContent = 'Network error. Please email me instead.'; }
      return;
    }
    location.href = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Portfolio message from ' + f.name.value)}&body=${encodeURIComponent(f.message.value + '\n\n' + f.name.value + ' (' + f.email.value + ')')}`;
    msg.textContent = 'Opening your email app…';
  });
  $('#foot-text').textContent = `© ${new Date().getFullYear()} ${PROFILE.name}. ${PROFILE.footer}`;

  /* ---------- reveal on scroll + tilt ---------- */
  const rv = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); }
  }), { threshold: 0.12 });
  $$('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; rv.observe(el); });

  if (fine && !reduce) {
    document.addEventListener('pointermove', (e) => {
      const c = e.target.closest && e.target.closest('[data-tilt]');
      $$('[data-tilt]').forEach((el) => { if (el !== c) el.style.transform = ''; });
      if (!c) return;
      const b = c.getBoundingClientRect(), x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
      c.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`;
    });
  }

  paintTheme();
})();
