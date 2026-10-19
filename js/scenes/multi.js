FD.add({
  id: 'multi',
  title: 'Multifunctional devices and convergence',
  tab: 'Convergence',
  icon: 'multi',
  color: '--c9',
  section: true,
  interactive: true,
  vocab: [
    ['multifunctional device', 'a device that can perform a range of different functions'],
    ['convergence', 'when the designs of devices change so that they become similar to one another'],
  ],
  mount(el) {
    const FN = [
      ['cam', '📷', 'Camera', 'Take a photo', '📸'],
      ['nav', '🧭', 'Navigation aid', 'Turn left in 200 m', '🗺️'],
      ['fit', '⌚', 'Fitness tracker', '8,412 steps today', '🏃'],
      ['music', '🎵', 'Music player', 'Now playing…', '🎧'],
      ['game', '🎮', 'Handheld games console', 'Level 3', '👾'],
    ];
    el.innerHTML = `
      <div class="sim mu">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="multi">📱 Multifunctional</button><button data-p="conv">🔀 Convergence</button><button data-p="flip">🔄 2-in-1 devices</button>
        </div>

        <div data-panel="multi" class="sim">
          <div class="mu-multi">
            <div class="mu-ring">
              ${FN.map(([k, e, n], i) => `<button class="mu-fn" data-k="${k}" style="--a:${i * 72 - 90}deg"><span>${e}</span><small>${n}</small></button>`).join('')}
              <div class="mu-phone"><div class="mu-scr" id="muScr"><span>📞</span><b>Phone</b><small>primary function</small></div></div>
            </div>
            <div class="mu-side">
              <p class="mu-count" id="muCount"></p>
              <button class="mini-btn" id="muCall">📞 Back to the primary function: make a call</button>
              <p class="small">A smartphone is a type of mobile phone, so its <b>primary function</b> is to make phone calls. Tap the other functions around it.</p>
            </div>
          </div>
        </div>

        <div data-panel="conv" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 230" aria-label="As devices develop, their features converge (Figure 1.24)">
              <defs><marker id="muArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" class="mu-ah"/></marker></defs>
              <g class="mu-st" data-s="0"><text class="emo" x="70" y="40" font-size="30">📷</text><text class="emo" x="250" y="30" font-size="30">🎵</text><text class="emo" x="330" y="40" font-size="30">🎮</text></g>
              <g class="mu-st" data-s="1"><g transform="translate(20 110)"><rect class="mu-old" x="0" y="0" width="44" height="90" rx="10"/><rect class="dv-screen" x="7" y="10" width="30" height="24" rx="2"/>${[0, 1, 2, 3].map((r) => [0, 1, 2].map((c) => `<rect class="mu-key" x="${8 + c * 10}" y="${42 + r * 11}" width="8" height="8" rx="2"/>`).join('')).join('')}</g><text class="svg-sm" x="42" y="218">Mobile phone</text></g>
              <g class="mu-st" data-s="2"><g transform="translate(190 120)"><rect class="dv-body" x="0" y="0" width="44" height="80" rx="7"/><rect class="dv-screen" x="4" y="8" width="36" height="62" rx="2"/></g><text class="svg-sm" x="212" y="218">Smartphone</text>
                <g transform="translate(250 60)"><rect class="dv-body" x="0" y="0" width="100" height="140" rx="9"/><rect class="dv-screen" x="7" y="10" width="86" height="118" rx="2"/></g><text class="svg-sm" x="300" y="218">Tablet</text></g>
              <g class="mu-st" data-s="3"><g transform="translate(430 90)"><rect class="dv-body" x="0" y="0" width="64" height="112" rx="9"/><rect class="dv-screen" x="5" y="9" width="54" height="92" rx="2"/></g><text class="svg-sm" x="462" y="218">Phablet</text></g>
              <g class="mu-st" data-s="1"><path class="mu-arw" d="M70 60 C 60 80, 50 90, 44 105" marker-end="url(#muArr)"/></g>
              <g class="mu-st" data-s="2"><path class="mu-arw" d="M72 160 L 180 160" marker-end="url(#muArr)"/><path class="mu-arw" d="M90 45 L 240 100" marker-end="url(#muArr)"/><path class="mu-arw" d="M252 45 L 262 55" marker-end="url(#muArr)"/><path class="mu-arw" d="M320 55 L 300 60" marker-end="url(#muArr)"/></g>
              <g class="mu-st" data-s="3"><path class="mu-arw" d="M362 140 L 422 140" marker-end="url(#muArr)"/></g>
            </svg>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="convGo">▶ Watch the devices converge</button>
            <label class="rng"><span>Screen size <output id="szO"></output></span><input type="range" id="sz" min="3.5" max="12" step=".1" value="5"></label></div>
          <div class="mu-cls" id="cls"></div>
        </div>

        <div data-panel="flip" class="sim" hidden>
          <div class="mu-two">
            <div class="sim-box">
              <svg viewBox="0 0 240 170" aria-label="A laptop whose touch screen flips 360 degrees">
                <rect class="mu-base" x="40" y="120" width="140" height="10" rx="3"/>
                <g id="lid"><rect class="mu-lid" x="-140" y="-10" width="140" height="8" rx="3"/><rect class="mu-glass" x="-136" y="-3" width="132" height="3" rx="1"/></g>
                <circle class="mu-hinge" cx="180" cy="122" r="4"/>
                <text class="mu-mode" id="modeT" x="120" y="158" text-anchor="middle"></text>
              </svg>
              <label class="rng"><span>Flip the screen <output id="angO"></output></span><input type="range" id="ang" min="0" max="360" value="110"></label>
            </div>
            <div class="sim-box">
              <svg viewBox="0 0 240 170" aria-label="A tablet with an attachable keyboard">
                <g id="kb" class="mu-kb"><rect x="30" y="128" width="170" height="12" rx="3"/>${Array.from({ length: 12 }, (_, i) => `<rect class="mu-k" x="${38 + i * 13}" y="131" width="10" height="5" rx="1"/>`).join('')}</g>
                <g id="tab" class="mu-tab"><rect class="dv-body" x="60" y="20" width="120" height="100" rx="8"/><rect class="dv-screen" x="67" y="27" width="106" height="86" rx="2"/></g>
                <text class="mu-mode" id="tabT" x="120" y="160" text-anchor="middle"></text>
              </svg>
              <label class="tgl"><input type="checkbox" id="att"> ⌨️ Attach the keyboard</label>
            </div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.mu'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- multifunctional ----
    const used = new Set();
    function fn(k) {
      const f = FN.find((x) => x[0] === k);
      if (!f) { $('#muScr').innerHTML = '<span>📞</span><b>Phone</b><small>primary function</small>'; root.querySelectorAll('.mu-fn').forEach((b) => b.classList.remove('on')); return; }
      used.add(k);
      $('#muScr').innerHTML = `<span>${f[4]}</span><b>${f[2]}</b><small>${f[3]}</small>`;
      FD.pulse($('#muScr'));
      root.querySelectorAll('.mu-fn').forEach((b) => { b.classList.toggle('on', b.dataset.k === k); b.classList.toggle('used', used.has(b.dataset.k)); });
      $('#muCount').innerHTML = `One device doing the job of <b>${used.size + 1}</b> device${used.size ? 's' : ''}: a <b>multifunctional device</b>.`;
    }
    root.querySelectorAll('.mu-fn').forEach((b) => b.addEventListener('click', () => fn(b.dataset.k)));
    $('#muCall').addEventListener('click', () => fn(null));
    $('#muCount').innerHTML = 'One device doing the job of <b>1</b> device.';

    // ---- convergence ----
    const stage = (n) => root.querySelectorAll('.mu-st').forEach((g) => g.classList.toggle('on', +g.dataset.s <= n));
    let cvId = 0;
    async function converge() { const id = ++cvId; for (let s = 0; s <= 3; s++) { stage(s); await FD.wait(1100); if (id !== cvId || dead) return; } }
    $('#convGo').addEventListener('click', converge);
    function size(v) {
      $('#sz').value = v; $('#szO').textContent = (+v).toFixed(1) + '″';
      const [n, d] = v < 5 ? ['Smartphone', 'Has mobile phone network connectivity and is smaller than a tablet.'] : v < 7 ? ['Phablet', 'A smartphone that has grown to look more like a tablet.'] : ['Tablet', 'Bigger; many tablets can now also connect to mobile phone networks.'];
      $('#cls').innerHTML = `<b>${n}</b><span>${d}</span><span class="mu-blur">Where is the line? Convergence <b>blurs the distinction</b> between types of device.</span>`;
    }
    $('#sz').addEventListener('input', (e) => size(+e.target.value));
    stage(3); size(5);

    // ---- flip and attach ----
    function angle(a) {
      $('#ang').value = a; $('#angO').textContent = a + '°';
      $('#lid').setAttribute('transform', `translate(180 122) rotate(${a})`);
      $('#modeT').textContent = a < 10 ? 'Closed' : a < 190 ? 'Laptop mode' : a < 330 ? 'Tent / stand mode' : 'Tablet mode ✓';
    }
    $('#ang').addEventListener('input', (e) => angle(+e.target.value));
    function attach(on) { $('#att').checked = on; $('#kb').classList.toggle('on', on); $('#tab').classList.toggle('on', on); $('#tabT').textContent = on ? 'Works as a laptop ✓' : 'Tablet'; }
    $('#att').addEventListener('change', (e) => attach(e.target.checked));
    angle(110); attach(false);

    const show = FD.panels(root);
    show('multi');
    return {
      show, fn, converge, stage, size, angle, attach,
      async allFn(ctx) { for (const [k] of FN) { fn(k); if (!(await ctx.sleep(900))) return; } },
      async flip(ctx) { for (let a = 110; a <= 360; a += 10) { angle(a); if (!(await ctx.sleep(60))) return; } if (!(await ctx.sleep(600))) return; attach(true); },
      async grow(ctx) { for (let v = 4; v <= 10; v += .25) { size(v); if (!(await ctx.sleep(110))) return; } },
      destroy() { dead = true; cvId++; },
    };
  },
  steps: [
    {
      title: 'The primary function',
      text: `<p>A smartphone is a type of mobile phone, which means that its <strong>primary function</strong> is to <strong>make phone calls</strong>.</p>`,
      on: (a) => { a.show('multi'); a.fn(null); },
    },
    {
      title: 'Multifunctional devices',
      text: `<p>A smartphone can also take photographs or function as a <strong>navigation aid, fitness tracker, music player or handheld games console</strong>.</p>
             <p>Because it can perform a range of different functions, it is classed as a <strong>multifunctional device</strong>.</p>`,
      tip: 'Activity: identify another multifunctional device. What is its primary function?',
      async on(a, ctx) { a.show('multi'); await a.allFn(ctx); },
    },
    {
      title: 'Convergence',
      text: `<p>As they develop, devices like smartphones often <strong>adopt technologies and features from other types of device</strong>.</p>
             <p>This is called <strong>convergence</strong>: the designs of devices change so that they become similar to one another (Figure 1.24).</p>`,
      async on(a) { a.show('conv'); await a.converge(); },
    },
    {
      title: '2-in-1 devices',
      text: `<p>Some laptops now have <strong>touch screens that can flip 360 degrees</strong>, allowing them to operate as tablet devices.</p>
             <p>Some tablet devices come with <strong>attachable keyboards</strong>, allowing them to operate as laptop computers.</p>`,
      tip: 'Try it: flip the screen and attach the keyboard.',
      async on(a, ctx) { a.show('flip'); a.attach(false); await a.flip(ctx); },
    },
    {
      title: 'Convergence blurs the distinction',
      text: `<p>Smartphones and tablets are very similar. A smartphone has mobile phone network connectivity and is smaller than a tablet.</p>
             <p>However, newer smartphones are getting bigger to look more like tablets (<strong>‘phablets’</strong>), while tablets can now connect to mobile phone networks.</p>`,
      tip: 'Try it: change the screen size. Where does a smartphone become a tablet?',
      async on(a, ctx) { a.show('conv'); a.stage(3); await a.grow(ctx); },
    },
    {
      title: 'Cameras converge too',
      text: `<p>Similarly, most smartphones have <strong>digital cameras</strong>, while some digital cameras have <strong>Wi-Fi and mobile phone network</strong> connectivity.</p>`,
      on: (a) => { a.show('multi'); a.fn('cam'); },
    },
  ],
});

FD.activities({
  section: 'multi',
  items: [
    {
      id: 'multidev',
      title: 'Multifunctional devices',
      task: '<p>Identify another example of a multifunctional device. What is its <b>primary function</b>? What else can it do?</p>',
      fields: ['Device', 'Primary function'],
      lines: 4,
      hint: 'It can also…',
    },
  ],
});

FD.check({
  section: 'multi',
  items: [
    { type: 'mcq', q: 'What is the primary function of a smartphone?', opts: ['To make phone calls', 'To take photographs', 'To play games', 'To navigate'], why: 'A smartphone is a type of mobile phone.' },
    { type: 'mcq', q: 'What is a multifunctional device?', opts: ['A device that can perform a range of different functions', 'A device with more than one screen', 'A device that needs several batteries', 'A device used by many people at the same time'], why: 'E.g. a smartphone that is also a camera, music player and navigation aid.' },
    { type: 'mcq', q: 'What is convergence?', opts: ['When the designs of devices change so that they become similar to one another', 'When two devices are connected by Bluetooth', 'When a device gets smaller', 'When a phone loses its signal'], why: 'Devices adopt technologies and features from other types of device.' },
    {
      type: 'sort',
      q: 'Which device is described?',
      bins: ['Phablet', '2-in-1 laptop', 'Tablet with keyboard'],
      rows: [['A smartphone that has grown to look like a tablet', 0], ['A laptop whose touch screen flips 360°', 1], ['A tablet that can operate as a laptop', 2]],
      why: 'All are examples of convergence.',
    },
    { type: 'tf', q: 'Convergence makes it easier to tell the difference between types of device.', a: false, why: 'Convergence blurs the distinction between different types of device.' },
  ],
});
