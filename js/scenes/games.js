FD.add({
  id: 'games',
  title: 'Games consoles and media players',
  tab: 'Consoles · media',
  icon: 'games',
  color: '--c8',
  section: true,
  interactive: true,
  vocab: [
    ['games console', 'an electronic device that is used for playing computerised video games on a screen'],
    ['avatar', 'a figure that represents a person in a computer game or other virtual environment'],
    ['data', 'values that represent information'],
    ['media player', 'an electronic device that can store and play digital music and videos and show digital photographs'],
    ['flash memory', 'a form of storage that stores data as electrical charges held in tiny electrical cells'],
  ],
  mount(el) {
    const PARTS = [
      { k: 'img', n: 'Image quality', full: 40, cut: 12, l: 'Reduced image quality' },
      { k: 'snd', n: 'Sound quality', full: 14, cut: 5, l: 'Reduced sound quality' },
      { k: 'cx', n: 'Game complexity (levels)', full: 20, cut: 9, l: 'Reduced game complexity' },
      { k: 'story', n: 'Storyline (cut scenes)', full: 16, cut: 4, l: 'Limited storyline' },
    ];
    const CAP = 32;
    el.innerHTML = `
      <div class="sim gm">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="con">🎮 Console</button><button data-p="vr">🥽 Motion and VR</button><button data-p="hand">🕹️ Handheld</button><button data-p="media">📦 Media players</button>
        </div>

        <div data-panel="con" class="sim">
          <div class="gm-con">
            <div class="gm-tv" tabindex="0" data-keys aria-label="Game screen: use the arrow keys or the buttons">
              <canvas id="game" width="320" height="180"></canvas>
              <span class="gm-score" id="score">⭐ 0</span>
              <span class="gm-load" id="load" hidden></span>
            </div>
            <div class="gm-pad">
              <div class="gm-ctrl"><span class="gm-wl" title="Wireless controller">📶</span>
                <button data-d="u" aria-label="Up">▲</button><button data-d="l" aria-label="Left">◀</button><button data-d="r" aria-label="Right">▶</button><button data-d="d" aria-label="Down">▼</button></div>
              <div class="chk-btns"><button class="mini-btn" id="fromDisk">💿 Load from disk</button><button class="mini-btn" id="fromNet">⬇️ Download</button></div>
              <div class="gm-multi" id="multi"><span data-m="apps">📲 Apps</span><span data-m="net">🌐 Internet and local networks</span><span data-m="film">🎬 Movies</span><span data-m="music">🎵 Music</span><span data-m="disk">💿 DVD · Blu-ray · 4K UHD Blu-ray</span></div>
            </div>
          </div>
        </div>

        <div data-panel="vr" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 220" aria-label="A player and the avatar that copies the player’s movements">
              <rect class="gm-room" x="0" y="0" width="240" height="220" rx="10"/><text class="gm-rt" x="120" y="16">real world</text>
              <rect class="gm-virtual" x="280" y="0" width="240" height="220" rx="10"/><text class="gm-vt" x="400" y="16">virtual world</text>
              ${[[120, 'pl', 'gm-person'], [400, 'av', 'gm-avatar']].map(([x, id, cls]) => `
                <g id="${id}" class="${cls}" transform="translate(${x} 0)">
                  <g class="gm-body"><circle cx="0" cy="62" r="16"/>${id === 'pl' ? '<rect class="gm-hs" id="hs" x="-14" y="54" width="28" height="12" rx="4"/>' : ''}
                  <path class="gm-limb" d="M0 78v62M0 140l-22 50M0 140l22 50"/>
                  <path class="gm-limb arm" data-a="l" d="M0 92l-34 26"/><path class="gm-limb arm" data-a="r" d="M0 92l34 26"/></g></g>`).join('')}
              <path class="gm-beam" d="M160 60 C 220 40, 300 40, 360 60"/><rect class="gm-sl" x="222" y="26" width="76" height="16" rx="8"/><text class="gm-st" x="260" y="38">motion sensors</text>
            </svg>
          </div>
          <div class="ctrls">
            <label class="rng"><span>Raise your arms <output id="armO"></output></span><input type="range" id="arm" min="0" max="100" value="0"></label>
            <label class="rng"><span>Lean <output id="leanO"></output></span><input type="range" id="lean" min="-20" max="20" value="0"></label>
          </div>
          <div class="ctrls"><button class="mini-btn" data-g="wave">👋 Wave</button><button class="mini-btn" data-g="jump">⬆️ Jump</button><button class="mini-btn" data-g="swing">🎾 Swing</button><label class="tgl"><input type="checkbox" id="vrOn"> 🥽 Wear a VR headset</label></div>
        </div>

        <div data-panel="hand" class="sim" hidden>
          <p class="ui-hint">A full-size game needs <b id="need"></b> GB. The handheld console only has <b>${CAP} GB</b> of storage. Make the game fit.</p>
          <div class="gm-fit">${PARTS.map((p) => `<div class="gm-part" data-k="${p.k}"><b>${p.n}</b><span class="bar"><i></i></span><small></small><label class="tgl"><input type="checkbox" data-cut="${p.k}"> ${p.l}</label></div>`).join('')}</div>
          <div class="meter"><span class="meter-l">Handheld storage</span><span class="bar gm-cap"><i id="cap"></i></span></div>
          <p class="cm-msg" id="fitMsg"></p>
        </div>

        <div data-panel="media" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 200" aria-label="A media player gets content from the internet or local storage and sends it to a TV">
              ${[['web', 30, '🌐 Internet (stream)'], ['nas', 90, '🗄️ NAS on the network'], ['usb', 150, '💾 Local storage']].map(([k, y, n]) => `<g class="gm-src" data-k="${k}"><rect x="10" y="${y - 20}" width="150" height="40" rx="8"/><text x="85" y="${y + 4}" text-anchor="middle">${n}</text></g>`).join('')}
              <path class="gm-wire" id="mWire" d=""/>
              <rect class="dv-body" x="220" y="80" width="80" height="30" rx="8"/><circle class="dv-led" id="mLed" cx="288" cy="95" r="3"/><text class="svg-sm" x="260" y="128">media player</text>
              <path class="gm-wire on" d="M300 95 L 360 95"/>
              <g transform="translate(360 40) scale(2.4)">${FD.dv.tv(0, 0)}</g>
              <text class="gm-tvt" id="mTv" x="432" y="86" text-anchor="middle">📺</text>
              <text class="gm-ctl" id="ctl" x="260" y="175" text-anchor="middle"></text>
            </svg>
          </div>
          <div class="ctrls">
            <div class="seg" id="ctlSeg"><span class="seg-l">Control it with</span><button data-v="remote">🎛️ Remote control</button><button data-v="app">📱 Smartphone app</button></div>
            <label class="tgl"><input type="checkbox" id="k4"> Output in 4K</label>
          </div>
          <div class="gm-pmp">
            <div><p class="strong">🏃 Personal media players: go for a run</p><p class="small">Compact, portable, local storage for media files, long battery life.</p></div>
            <button class="btn primary small-btn" id="run">🏃 Shake it!</button>
            <div class="gm-pl" id="pHdd"><b>Player with a spinning disk</b><span class="gm-wave"></span><small>…</small></div>
            <div class="gm-pl" id="pFlash"><b>Player with flash memory</b><span class="gm-wave"></span><small>…</small></div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.gm'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- console mini-game ----
    const G = { x: 40, y: 90, stars: [], score: 0, ready: true };
    const newStar = () => ({ x: 30 + Math.random() * 260, y: 25 + Math.random() * 130 });
    G.stars = [newStar(), newStar(), newStar()];
    function draw() {
      const c = $('#game').getContext('2d');
      c.fillStyle = '#1b2a4a'; c.fillRect(0, 0, 320, 180);
      c.fillStyle = '#2f9e44'; c.fillRect(0, 160, 320, 20);
      c.font = '20px serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
      G.stars.forEach((s) => c.fillText('⭐', s.x, s.y));
      c.font = '26px serif'; c.fillText('🚀', G.x, G.y);
      $('#score').textContent = '⭐ ' + G.score;
    }
    function move(d) {
      if (!G.ready) return;
      const k = 16;
      if (d === 'l') G.x -= k; if (d === 'r') G.x += k; if (d === 'u') G.y -= k; if (d === 'd') G.y += k;
      G.x = FD.clamp(G.x, 14, 306); G.y = FD.clamp(G.y, 14, 150);
      G.stars = G.stars.map((s) => (Math.hypot(s.x - G.x, s.y - G.y) < 22 ? (G.score++, newStar()) : s));
      draw();
      const b = root.querySelector(`.gm-ctrl [data-d="${d}"]`); if (b) FD.pulse(b);
    }
    root.querySelector('.gm-ctrl').addEventListener('click', (e) => { const b = e.target.closest('[data-d]'); if (b) move(b.dataset.d); });
    root.querySelector('.gm-tv').addEventListener('keydown', (e) => {
      const m = { ArrowLeft: 'l', ArrowRight: 'r', ArrowUp: 'u', ArrowDown: 'd' }[e.key];
      if (m) { e.preventDefault(); e.stopPropagation(); move(m); }
    });
    let loadId = 0;
    async function load(how) {
      const id = ++loadId, L = $('#load');
      G.ready = false; L.hidden = false;
      await FD.tween(how === 'disk' ? 1400 : 2600, (t) => { if (id === loadId && !dead) L.textContent = how === 'disk' ? `💿 Reading the disk… ${Math.round(t * 100)}%` : `⬇️ Downloading from the internet… ${Math.round(t * 100)}%`; });
      if (id !== loadId || dead) return;
      L.hidden = true; G.ready = true; G.score = 0; draw();
    }
    $('#fromDisk').addEventListener('click', () => load('disk'));
    $('#fromNet').addEventListener('click', () => load('net'));
    draw();

    // ---- motion / VR ----
    let pose = { arm: 0, lean: 0, jump: 0 };
    function poseSet() {
      ['#pl', '#av'].forEach((id, i) => {
        const g = $(id), x = i ? 400 : 120, a = pose.arm;
        g.setAttribute('transform', `translate(${x} ${-pose.jump}) rotate(${pose.lean} 0 190)`);
        g.querySelector('[data-a="l"]').setAttribute('d', `M0 92l${-34 + a * .1} ${26 - a * .62}`);
        g.querySelector('[data-a="r"]').setAttribute('d', `M0 92l${34 - a * .1} ${26 - a * .62}`);
      });
      $('#armO').textContent = pose.arm + '%'; $('#leanO').textContent = pose.lean ? (pose.lean < 0 ? 'left' : 'right') : 'straight';
    }
    $('#arm').addEventListener('input', (e) => { pose.arm = +e.target.value; poseSet(); });
    $('#lean').addEventListener('input', (e) => { pose.lean = +e.target.value; poseSet(); });
    let gId = 0;
    async function gesture(g) {
      const id = ++gId;
      const steps = g === 'wave' ? [[90, -8], [90, 8], [90, -8], [90, 8], [0, 0]] : g === 'jump' ? [[60, 0, 30], [0, 0, 0], [60, 0, 30], [0, 0, 0]] : [[40, -15], [100, 15], [20, 0]];
      for (const [a, l, j = 0] of steps) {
        pose = { arm: a, lean: l, jump: j }; $('#arm').value = a; $('#lean').value = l; poseSet();
        await FD.wait(320); if (id !== gId || dead) return;
      }
    }
    root.querySelectorAll('[data-g]').forEach((b) => b.addEventListener('click', () => gesture(b.dataset.g)));
    const vr = (on) => { $('#vrOn').checked = on; root.classList.toggle('vr', on); $('#hs').style.opacity = on ? 1 : 0; };
    $('#vrOn').addEventListener('change', (e) => vr(e.target.checked));
    poseSet(); vr(false);

    // ---- handheld: make the game fit ----
    const cut = new Set();
    function fit() {
      let total = 0;
      PARTS.forEach((p) => {
        const v = cut.has(p.k) ? p.cut : p.full; total += v;
        const d = root.querySelector(`.gm-part[data-k="${p.k}"]`);
        d.querySelector('i').style.setProperty('--v', (v / 40) * 100 + '%');
        d.querySelector('small').textContent = v + ' GB';
        d.classList.toggle('cut', cut.has(p.k));
        d.querySelector('input').checked = cut.has(p.k);
      });
      $('#need').textContent = PARTS.reduce((n, p) => n + p.full, 0);
      $('#cap').style.setProperty('--v', Math.min(100, (total / CAP) * 100) + '%');
      $('#cap').parentElement.classList.toggle('over', total > CAP);
      $('#fitMsg').innerHTML = total > CAP ? `❌ ${total} GB: too big for ${CAP} GB. Reduce the amount of <b>data</b> that needs to be stored.` : `✅ ${total} GB: it fits! But the handheld version has ${[...cut].map((k) => PARTS.find((p) => p.k === k).l.toLowerCase()).join(', ') || 'nothing cut'}.`;
    }
    root.querySelectorAll('[data-cut]').forEach((i) => i.addEventListener('change', () => { i.checked ? cut.add(i.dataset.cut) : cut.delete(i.dataset.cut); fit(); }));
    fit();

    // ---- media players ----
    const SRCY = { web: 30, nas: 90, usb: 150 };
    let src = 'web', ctl = 'remote';
    function media() {
      root.querySelectorAll('.gm-src').forEach((g) => g.classList.toggle('on', g.dataset.k === src));
      $('#mWire').setAttribute('d', `M160 ${SRCY[src]} C 190 ${SRCY[src]}, 195 95, 220 95`);
      $('#mWire').classList.toggle('wl', src !== 'usb');
      $('#mTv').textContent = src === 'web' ? '▶ Streaming' : src === 'nas' ? '▶ From the NAS' : '▶ From USB';
      $('#mTv').textContent += $('#k4').checked ? ' · 4K' : '';
      FD.segSet($('#ctlSeg'), ctl);
      $('#ctl').textContent = ctl === 'remote' ? '🎛️ controlled with a remote control' : '📱 controlled with a smartphone app';
    }
    root.querySelectorAll('.gm-src').forEach((g) => g.addEventListener('click', () => { src = g.dataset.k; media(); }));
    $('#ctlSeg').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { ctl = b.dataset.v; media(); } });
    $('#k4').addEventListener('change', media);
    media();
    let runId = 0;
    async function run() {
      const id = ++runId, a = $('#pHdd'), b = $('#pFlash');
      a.classList.add('shake-on'); b.classList.add('shake-on');
      a.querySelector('small').textContent = '♪ playing…'; b.querySelector('small').textContent = '♪ playing…';
      for (let i = 0; i < 8; i++) {
        await FD.wait(400); if (id !== runId || dead) return;
        const skip = i % 3 === 1;
        a.classList.toggle('skip', skip);
        a.querySelector('small').textContent = skip ? '⚠️ skip! The moving disk was shaken' : '♪ playing…';
      }
      a.classList.remove('shake-on', 'skip'); b.classList.remove('shake-on');
      b.querySelector('small').textContent = '✓ Flash memory is not affected by being moved or shaken';
    }
    $('#run').addEventListener('click', run);

    const show = FD.panels(root);
    show('con');
    return {
      show, load, gesture, vr, run,
      async play(ctx) { for (const d of 'rrrrddrruurrrdd') { move(d); if (!(await ctx.sleep(160))) return; } },
      multi(list) { root.querySelectorAll('#multi span').forEach((s) => s.classList.toggle('on', list.includes(s.dataset.m))); },
      async cutAll(ctx) { cut.clear(); fit(); for (const p of PARTS) { if (!(await ctx.sleep(900))) return; cut.add(p.k); fit(); } },
      async sources(ctx) { for (const [s, c, k] of [['web', 'remote', false], ['nas', 'app', false], ['usb', 'app', true]]) { src = s; ctl = c; $('#k4').checked = k; media(); if (!(await ctx.sleep(1300))) return; } },
      destroy() { dead = true; loadId++; gId++; runId++; },
    };
  },
  steps: [
    {
      title: 'Games consoles',
      text: `<p><strong>Games consoles</strong> are designed to enable users to play video games on a television screen.</p>
             <p>Games are provided on <strong>disks</strong> or as <strong>downloads</strong> from the internet.</p>`,
      tip: 'Try it: load the game, then collect the stars.',
      async on(a) { a.show('con'); a.multi([]); await a.load('disk'); },
    },
    {
      title: 'Controllers',
      text: `<p>Consoles use <strong>controllers</strong>, which are often <strong>wireless</strong>, to control the characters, vehicles and/or objects in the game.</p>`,
      tip: 'Try it: click the game screen and use the arrow keys, or press the controller buttons.',
      async on(a, ctx) { a.show('con'); await a.play(ctx); },
    },
    {
      title: 'Motion sensors',
      text: `<p>Some consoles use <strong>motion sensors</strong> to allow the player to control the game with <strong>gestures and body movements</strong>.</p>`,
      tip: 'Try it: wave, jump, swing, or move the sliders.',
      async on(a, ctx) { a.show('vr'); a.vr(false); await a.gesture('wave'); if (!(await ctx.sleep(300))) return; await a.gesture('swing'); },
    },
    {
      title: 'Virtual reality and avatars',
      text: `<p>Other games use <strong>virtual reality</strong> controllers and headsets to immerse the player in a realistic gaming experience.</p>
             <p>The player’s movements in the real world are replicated by an <strong>avatar</strong> in the virtual world of the game.</p>`,
      async on(a) { a.show('vr'); a.vr(true); await a.gesture('jump'); },
    },
    {
      title: 'Consoles are multifunctional',
      text: `<p>Modern games consoles are <strong>multifunctional</strong>. They may have <strong>apps</strong> and connectivity to local networks and the internet, and can play <strong>movies and music</strong>.</p>
             <p>Some have disk drives to play DVD, Blu-ray or 4K Ultra HD Blu-ray media.</p>`,
      async on(a, ctx) { a.show('con'); const all = ['apps', 'net', 'film', 'music', 'disk']; for (let i = 1; i <= all.length; i++) { a.multi(all.slice(0, i)); if (!(await ctx.sleep(500))) return; } },
    },
    {
      title: 'Handheld consoles',
      text: `<p><strong>Handheld</strong> consoles provide mobile gaming. They have a <strong>built-in screen</strong> and <strong>less storage</strong> than a full-size console.</p>
             <p>So their games often have reduced image and sound quality, reduced game complexity and limited storylines, to reduce the amount of <strong>data</strong> that needs to be stored.</p>`,
      tip: 'Try it: make the game fit on the handheld.',
      async on(a, ctx) { a.show('hand'); await a.cutAll(ctx); },
    },
    {
      title: 'Media players',
      text: `<p><strong>Media players</strong> provide video and audio content to a television, <strong>streamed</strong> from the internet or from networked or local storage.</p>
             <p>They connect to the TV directly or via a wired or wireless network, and are controlled with a <strong>remote control</strong> or a <strong>smartphone app</strong>. Some offer output in <strong>4K</strong>.</p>`,
      async on(a, ctx) { a.show('media'); await a.sources(ctx); },
    },
    {
      title: 'Personal media players',
      text: `<p><strong>Personal media players</strong> are compact, portable devices with local storage for media files. They are useful when travelling or exercising because of their small size and long battery life.</p>
             <p>They often use solid state <strong>flash memory</strong>, which is <strong>not affected by being moved or shaken</strong>.</p>`,
      async on(a) { a.show('media'); await a.run(); },
    },
  ],
});

FD.activities({
  section: 'games',
  items: [
    {
      id: 'agerating',
      title: 'Video games',
      task: '<p>Discuss the <b>age ratings</b> of popular games. Do you think these age ratings are appropriate? Do you think age ratings are necessary? Explain the reasons for your answer.</p>',
      fields: ['A popular game and its age rating', 'Is the rating appropriate? Why?'],
      lines: 4,
      hint: 'Are age ratings necessary? My reasons…',
    },
    {
      id: 'smarttv',
      title: 'Smart televisions',
      task: '<p>Smart televisions have the streaming and networking functions of a media player built in. Do you think smart televisions are going to <b>replace</b> media players? Discuss your reasons.</p>',
      fields: ['Reasons they will replace media players', 'Reasons they may not'],
      lines: 3,
      hint: 'My conclusion…',
    },
  ],
});

FD.check({
  section: 'games',
  items: [
    { type: 'multi', q: 'How are games provided for consoles? Choose two.', need: 2, opts: [['On disks', true], ['As downloads from the internet', true], ['On SIM cards', false], ['By Bluetooth from a TV', false]], why: 'Games are provided on disks or as downloads.' },
    { type: 'mcq', q: 'What is an avatar?', opts: ['A figure that represents a person in a game or other virtual environment', 'A wireless games controller', 'A type of VR headset', 'A game downloaded from the internet'], why: 'In VR, the avatar replicates the player’s real movements.' },
    { type: 'mcq', q: 'Why do handheld games often have reduced image and sound quality?', opts: ['Handhelds have less storage, so the amount of data must be reduced', 'Handheld screens cannot show colours', 'Handhelds have no speakers', 'Handheld games are always free'], why: 'Also reduced complexity and limited storylines.' },
    { type: 'mcq', q: 'Which statement about media players is correct?', opts: ['They provide video and audio content to a TV, streamed or from networked or local storage', 'They record broadcast TV to watch later', 'They can only play CDs', 'They must always be connected with a cable'], why: 'They can be connected directly or via a wired or wireless network.' },
    { type: 'mcq', q: 'Why are personal media players suitable for jogging?', opts: ['They are small, have long battery life and use flash memory that is not affected by shaking', 'They have very large screens', 'They need a mains connection', 'They use spinning disks'], why: 'Flash memory stores data as electrical charges in tiny cells.' },
    { type: 'tf', q: 'Modern games consoles can only play games.', a: false, why: 'They are multifunctional: apps, networks, movies, music and disk drives.' },
  ],
});
