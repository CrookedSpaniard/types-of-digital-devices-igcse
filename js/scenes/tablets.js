FD.add({
  id: 'tablets',
  title: 'Tablets',
  tab: 'Tablets',
  icon: 'tablets',
  color: '--c1',
  section: true,
  interactive: true,
  vocab: [
    ['Wi-Fi (wireless fidelity)', 'a way of connecting computers or other electronic machines to a network or the internet by using radio signals rather than wires'],
    ['SIM', 'subscriber identity module: identifies the subscriber to a mobile phone network'],
  ],
  mount(el) {
    // Route through town: points of a polyline, and the Wi-Fi zones (x, y, r, name).
    const ROUTE = [[60, 170], [140, 170], [200, 110], [300, 110], [360, 60], [460, 60]];
    const ZONES = [[70, 165, 55, '🏠 Home Wi-Fi'], [300, 110, 42, '☕ Café Wi-Fi'], [455, 62, 55, '🏫 School Wi-Fi']];
    el.innerHTML = `
      <div class="sim tb">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="cmp">📏 Tablet or smartphone?</button><button data-p="trip">🚶 Out of Wi-Fi range</button>
        </div>

        <div data-panel="cmp" class="sim">
          <div class="tb-cmp">
            <div class="sim-box tb-devs">
              <svg viewBox="0 0 300 200" aria-label="A smartphone next to a bigger tablet">
                <g transform="translate(20 50)"><rect class="dv-body" x="0" y="0" width="70" height="140" rx="12"/><rect class="tb-scr" x="6" y="12" width="58" height="112" rx="3"/><text class="svg-sm" x="35" y="-8">smartphone</text></g>
                <g transform="translate(120 10)"><rect class="dv-body" x="0" y="0" width="160" height="186" rx="14"/><rect class="tb-scr" x="10" y="12" width="140" height="160" rx="3"/><text class="tb-news" x="80" y="40" text-anchor="middle">News Online</text>
                  <rect class="tb-img" x="20" y="52" width="120" height="60" rx="3"/><path class="tb-lines" d="M20 124h120M20 136h96M20 148h110M20 160h70"/><circle class="tb-tap" id="tap" cx="100" cy="82" r="10"/></g>
              </svg>
            </div>
            <table class="tbl tb-tbl"><thead><tr><th></th><th>Smartphone</th><th>Tablet</th></tr></thead><tbody>
              <tr data-r="size"><th>Size</th><td>Smaller: fits in a pocket</td><td><b>Bigger</b></td></tr>
              <tr data-r="touch"><th>Touch screen</th><td class="y">✓</td><td class="y">✓</td></tr>
              <tr data-r="apps"><th>Apps</th><td class="y">✓</td><td class="y">✓</td></tr>
              <tr data-r="wifi"><th>Wi-Fi to access the internet</th><td class="y">✓</td><td class="y">✓</td></tr>
              <tr data-r="sim"><th>Mobile phone network (SIM)</th><td class="y">✓ always</td><td><b>Some</b> have a SIM card slot</td></tr></tbody></table>
          </div>
        </div>

        <div data-panel="trip" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 -16 520 244" aria-label="A walk from home to school passing in and out of Wi-Fi zones">
              ${ZONES.map(([x, y, r, n]) => `<circle class="tb-zone" cx="${x}" cy="${y}" r="${r}"/><text class="tb-zl" x="${x}" y="${y - r - 6}">${n}</text>`).join('')}
              <path class="tb-road" d="M${ROUTE.map((p) => p.join(' ')).join(' L')}"/>
              <text class="tb-zl" x="225" y="190">🌳 Park</text><text class="tb-zl" x="390" y="150">🚌 Bus</text>
              <g transform="translate(400 160)"><path class="ph-mast" d="M15 0L5 50h20z"/><text class="svg-sm" x="15" y="62">4G mast</text></g>
              <g id="walker"><circle r="15" class="tb-me"/><text class="emo" font-size="18">🚶</text></g>
            </svg>
          </div>
          <label class="rng"><span>Walk to school <output id="tO"></output></span><input type="range" id="t" min="0" max="100" value="0"></label>
          <div class="tb-two">
            <div class="tb-dev" id="dA"><b>Tablet A</b><small>Wi-Fi only</small><span class="tb-st"></span><span class="tb-vid">🎬 <i></i></span></div>
            <div class="tb-dev" id="dB"><b>Tablet B</b><small>Wi-Fi + SIM card slot</small><span class="tb-st"></span><span class="tb-vid">🎬 <i></i></span></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="go">▶ Walk to school</button></div>
        </div>
      </div>`;
    const root = el.querySelector('.tb'), $ = (s) => root.querySelector(s);
    let dead = false;

    const rows = (list) => root.querySelectorAll('.tb-tbl tbody tr').forEach((r) => r.classList.toggle('hl', list.includes(r.dataset.r)));
    async function tapNews(ctx) { const t = $('#tap'); for (let i = 0; i < 3; i++) { t.classList.remove('on'); void t.getBoundingClientRect(); t.classList.add('on'); if (!(await ctx.sleep(800))) return; } }

    // ---- trip ----
    const prog = [0, 0];
    function at(p) {
      const [x, y] = FD.along(ROUTE, p / 100);
      $('#walker').setAttribute('transform', `translate(${x} ${y})`);
      const zone = ZONES.find(([zx, zy, r]) => Math.hypot(x - zx, y - zy) < r);
      $('#tO').textContent = zone ? zone[3] : 'out of Wi-Fi range';
      const set = (id, online, how) => {
        const d = $(id);
        d.classList.toggle('on', online); d.classList.toggle('off', !online);
        d.querySelector('.tb-st').textContent = online ? `🟢 Online · ${how}` : '🔴 Offline: no Wi-Fi';
      };
      set('#dA', !!zone, 'Wi-Fi');
      set('#dB', true, zone ? 'Wi-Fi' : '4G mobile network');
      $('#t').value = p;
      return !!zone;
    }
    let lastP = 0;
    function video(p) {
      const dp = Math.max(0, p - lastP); lastP = p;
      const zone = at(p);
      if (zone) prog[0] += dp; prog[1] += dp;
      $('#dA .tb-vid i').style.setProperty('--v', Math.min(100, prog[0]) + '%');
      $('#dB .tb-vid i').style.setProperty('--v', Math.min(100, prog[1]) + '%');
    }
    const resetTrip = () => { prog[0] = prog[1] = 0; lastP = 0; video(0); };
    $('#t').addEventListener('input', (e) => video(+e.target.value));
    let walkId = 0;
    async function walk() {
      const id = ++walkId; resetTrip();
      await FD.tween(8000, (t) => { if (id === walkId && !dead) video(t * 100); });
    }
    $('#go').addEventListener('click', walk);
    resetTrip();

    const show = FD.panels(root);
    show('cmp');
    return { show, rows, tapNews, walk, resetTrip, destroy() { dead = true; walkId++; } };
  },
  steps: [
    {
      title: 'Tablets',
      text: `<p><strong>Tablet devices</strong>, or tablets, are <strong>bigger than smartphones</strong>, but have similar features.</p>`,
      on: (a) => { a.show('cmp'); a.rows(['size']); },
    },
    {
      title: 'Similar features to a smartphone',
      text: `<p>For example, a tablet device has a <strong>touch screen</strong>, <strong>apps</strong> and <strong>Wi-Fi connectivity</strong> to provide access to the internet.</p>`,
      async on(a, ctx) { a.show('cmp'); a.rows(['touch', 'apps', 'wifi']); await a.tapNews(ctx); },
    },
    {
      title: 'SIM card slots',
      text: `<p>Some tablet devices have <strong>SIM card slots</strong> to allow internet connectivity using the <strong>mobile phone network</strong>.</p>`,
      on: (a) => { a.show('cmp'); a.rows(['sim']); },
    },
    {
      title: 'Online away from Wi-Fi',
      text: `<p>With a SIM card, a tablet can be <strong>online when it is not within range of a Wi-Fi signal</strong>.</p>
             <p>A Wi-Fi-only tablet goes offline as soon as you leave the Wi-Fi zone.</p>`,
      tip: 'Try it: walk to school and watch which tablet keeps playing the video.',
      async on(a) { a.show('trip'); await a.walk(); },
    },
  ],
});

FD.check({
  section: 'tablets',
  items: [
    { type: 'mcq', q: 'How is a tablet different from a smartphone?', opts: ['It is bigger, but has similar features', 'It has no touch screen', 'It cannot run apps', 'It cannot connect to Wi-Fi'], why: 'Tablets have a touch screen, apps and Wi-Fi connectivity.' },
    { type: 'multi', q: 'Which three features do tablets usually have?', need: 3, opts: [['Touch screen', true], ['Apps', true], ['Wi-Fi connectivity', true], ['A separate keyboard and mouse', false], ['A built-in printer', false]], why: 'The same features as a smartphone.' },
    { type: 'mcq', q: 'Why do some tablets have a SIM card slot?', opts: ['To connect to the internet using the mobile phone network when there is no Wi-Fi', 'To store more photos', 'To make the battery last longer', 'To connect a printer'], why: 'They can be online when they are not within range of a Wi-Fi signal.' },
    { type: 'tf', q: 'A Wi-Fi-only tablet can still access the internet in a park far from any Wi-Fi signal.', a: false, why: 'It needs a SIM card (mobile phone network) to be online away from Wi-Fi.' },
  ],
});
