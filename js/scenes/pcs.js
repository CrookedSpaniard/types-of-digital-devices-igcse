FD.add({
  id: 'pcs',
  title: 'Personal computers',
  tab: 'PCs',
  icon: 'pcs',
  color: '--c2',
  section: true,
  interactive: true,
  vocab: [
    ['upgrade', 'to make a computer better and able to do more things'],
    ['peripheral device', 'equipment that is connected to a computer and used with it'],
    ['portable', 'easy to carry or move'],
    ['embedded computing', 'computing hardware that is fixed into position and carries out a specialist task'],
    ['physical computing', 'interactive systems that can sense and respond to the world around them'],
  ],
  mount(el) {
    const UP = [
      { k: 'ram', n: '+ More memory (RAM)', p: 18, y: 40, c: '#51cf66', l: 'RAM' },
      { k: 'gpu', n: '+ Graphics card', p: 22, y: 80, c: '#ff922b', l: 'GPU' },
      { k: 'ssd', n: '+ Bigger SSD', p: 12, y: 120, c: '#4dabf7', l: 'SSD' },
    ];
    const PER = [['monitor', '🖥️ Monitor'], ['keyboard', '⌨️ Keyboard'], ['mouse', '🖱️ Mouse'], ['printer', '🖨️ Printer']];
    el.innerHTML = `
      <div class="sim pc">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="desk">🖥️ Desktop</button><button data-p="aio">🧩 All-in-one</button><button data-p="lap">💻 Laptops</button><button data-p="sbc">🍓 Single-board</button>
        </div>

        <div data-panel="desk" class="sim">
          <div class="sim-box">
            <svg viewBox="0 0 520 230" aria-label="A desktop computer with peripheral devices">
              <rect class="pc-desk" x="0" y="196" width="520" height="12" rx="3"/>
              <g data-per="monitor" class="pc-per"><path class="pc-cable" d="M200 150 C 260 190, 320 190, 352 150"/><rect class="dv-body" x="120" y="40" width="160" height="104" rx="6"/><rect class="pc-scr" id="scr" x="128" y="48" width="144" height="88" rx="2"/><text class="pc-scrt" id="scrT" x="200" y="96" text-anchor="middle"></text><rect class="dv-body" x="190" y="144" width="20" height="40"/><rect class="dv-body" x="160" y="182" width="80" height="12" rx="4"/></g>
              <g data-per="keyboard" class="pc-per"><path class="pc-cable" d="M200 188 C 260 205, 320 205, 352 180"/><rect class="dv-body" x="120" y="186" width="120" height="10" rx="3"/></g>
              <g data-per="mouse" class="pc-per"><path class="pc-cable" d="M270 188 C 300 205, 330 205, 352 185"/><ellipse class="dv-body" cx="262" cy="190" rx="9" ry="6"/></g>
              <g data-per="printer" class="pc-per"><path class="pc-cable" d="M460 160 C 450 190, 430 190, 410 175"/>${FD.dv.printer(436, 140)}</g>
              <g id="tower">
                <rect class="dv-body" x="340" y="34" width="72" height="162" rx="6"/>
                <rect class="pc-inside" x="348" y="42" width="56" height="146" rx="3"/>
                ${UP.map((u) => `<rect class="pc-slot" x="354" y="${u.y + 4}" width="44" height="22" rx="3"/><g class="pc-part" data-up="${u.k}"><rect x="354" y="${u.y + 4}" width="44" height="22" rx="3" fill="${u.c}"/><text x="376" y="${u.y + 19}" text-anchor="middle">${u.l}</text></g>`).join('')}
                <circle class="dv-led" cx="376" cy="178" r="3"/>
              </g>
            </svg>
          </div>
          <div class="ctrls">
            <div class="seg" id="per"><span class="seg-l">Peripheral devices (tap to connect / disconnect)</span>${PER.map(([k, n]) => `<button data-v="${k}" class="on" aria-pressed="true">${n}</button>`).join('')}</div>
          </div>
          <div class="ctrls">
            <div class="seg" id="up"><span class="seg-l">Upgrade the desktop</span>${UP.map((u) => `<button data-v="${u.k}">${u.n}</button>`).join('')}<button data-v="reset">↺</button></div>
            <div class="meter" style="flex:1;min-width:14rem"><span class="meter-l">Performance</span><span class="bar"><i id="perf"></i></span></div>
          </div>
          <p class="small" id="perMsg"></p>
        </div>

        <div data-panel="aio" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 220" aria-label="A separate tower and monitor combining into an all-in-one">
              <rect class="pc-desk" x="0" y="196" width="520" height="12" rx="3"/>
              <g id="aioMon"><rect class="dv-body" x="130" y="30" width="200" height="124" rx="8"/><rect class="pc-scr on" x="140" y="40" width="180" height="104" rx="2"/><text class="pc-scrt" x="230" y="98" text-anchor="middle">Monitor</text><rect class="dv-body" x="220" y="154" width="20" height="30"/><rect class="dv-body" x="190" y="182" width="80" height="12" rx="4"/></g>
              <g id="aioTower"><rect class="dv-body" x="380" y="40" width="64" height="156" rx="6"/><path class="dv-detail" d="M392 60h40v4h-40zM392 72h40v4h-40z"/><circle class="dv-led" cx="412" cy="180" r="3"/><text class="svg-sm" x="412" y="30">PC hardware</text></g>
              <path class="pc-cable" id="aioCable" d="M330 120 C 355 120, 360 100, 380 100"/>
            </svg>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="aioGo">🧩 Combine into an all-in-one</button><button class="btn ghost small-btn" id="aioBack">↺ Separate again</button></div>
          <div class="cards3"><div class="mini"><h5>🖥️ + 🗄️ = one unit</h5><p>The PC hardware is built into the back of the monitor.</p></div><div class="mini"><h5>🔌 Fewer cables</h5><p>It takes up less space on the desk.</p></div><div class="mini"><h5>🔧 Still a desktop</h5><p>It stays on the desk and plugs into the mains.</p></div></div>
        </div>

        <div data-panel="lap" class="sim" hidden>
          <div class="pc-two">
            <div class="sim-box pc-unit" id="uDesk"><svg viewBox="0 0 200 150" aria-label="Desktop computer">${'<g transform="translate(20 10) scale(2.2)">' + FD.dv.desktop(0, 0) + '</g>'}<text class="pc-off" x="86" y="58" text-anchor="middle">No power</text></svg><b>Desktop</b><span class="pill" id="dState">🔌 on mains</span></div>
            <div class="sim-box pc-unit" id="uLap"><svg viewBox="0 0 200 150" aria-label="Laptop computer"><g transform="translate(20 20) scale(2.6)" data-zone="lap">${FD.dv.laptop(0, 0)}</g>
              <g class="pc-lbl" data-l="screen"><circle cx="100" cy="50" r="4"/><text x="100" y="40">screen</text></g>
              <g class="pc-lbl" data-l="keys"><circle cx="70" cy="110" r="4"/><text x="58" y="138">keyboard</text></g>
              <g class="pc-lbl" data-l="pad"><circle cx="100" cy="116" r="4"/><text x="118" y="138">track pad</text></g>
              <g class="pc-lbl" data-l="bat"><circle cx="150" cy="114" r="4"/><text x="166" y="102">battery</text></g></svg>
              <b>Laptop</b><span class="pill" id="lState">🔌 on mains</span></div>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="unplug">🔌 Unplug and carry them to the library</button><div class="meter" style="flex:1;min-width:12rem"><span class="meter-l">Laptop battery</span><span class="bar"><i id="bat" style="--v:100%"></i></span></div></div>
          <div class="tbl-wrap"><table class="tbl pc-cmp"><thead><tr><th></th><th>Standard laptop</th><th>Desktop replacement</th></tr></thead><tbody>
            <tr><th>Size and weight</th><td>Smaller, lighter</td><td><b>Larger</b>, heavier</td></tr>
            <tr><th>Screen</th><td>Smaller</td><td><b>Bigger, better-quality</b></td></tr>
            <tr><th>Performance</th><td>Good</td><td><b>Higher</b></td></tr>
            <tr><th>Portable?</th><td>✓ Very</td><td>✓ But less easy to carry</td></tr></tbody></table></div>
        </div>

        <div data-panel="sbc" class="sim" hidden>
          <div class="pc-sbc">
            <div class="sim-box">
              <svg viewBox="0 0 300 190" aria-label="A Raspberry Pi Zero, a microSD card, a button and an LED">
                <rect class="pc-board" x="20" y="40" width="200" height="80" rx="8"/>
                ${Array.from({ length: 20 }, (_, i) => `<circle class="pc-pin" cx="${34 + i * 9}" cy="50" r="2.4"/><circle class="pc-pin" cx="${34 + i * 9}" cy="58" r="2.4"/>`).join('')}
                <rect class="pc-soc" x="96" y="72" width="34" height="34" rx="3"/><text x="113" y="93" class="ty-chipt" text-anchor="middle">CPU</text>
                <rect class="pc-sd" id="sd" x="6" y="86" width="26" height="20" rx="2"/><text x="26" y="134" class="svg-sm">microSD</text>
                <rect class="pc-port" x="160" y="112" width="16" height="10" rx="2"/><rect class="pc-port" x="186" y="112" width="16" height="10" rx="2"/>
                <path class="pc-wire" d="M52 50 C 52 10, 250 10, 250 60"/><path class="pc-wire b" d="M70 50 C 70 20, 270 40, 270 120"/>
                <circle class="pc-led" id="led" cx="250" cy="72" r="12"/><text class="svg-sm" x="250" y="100">LED</text>
                <rect class="pc-btn" id="pbtn" x="252" y="122" width="36" height="24" rx="5"/><text class="svg-sm" x="270" y="162">button</text>
              </svg>
            </div>
            <div class="pc-code">
              <p class="strong">Physical computing: the program</p>
              <pre class="pc-pre"><span id="c1">while True:</span>
<span id="c2">    if button.is_pressed:</span>
<span id="c3">        led.on()</span>
<span id="c4">    else:</span>
<span id="c5">        led.off()</span></pre>
              <button class="btn primary small-btn" id="press">👆 Hold the button</button>
              <p class="small">The SBC <b>senses</b> the button (input) and <b>responds</b> by switching on the LED (output).</p>
            </div>
          </div>
          <div class="cards3">
            <div class="mini"><h5>💷 Affordable</h5><p>The unit itself costs very little.</p></div>
            <div class="mini"><h5>💾 Cheap storage</h5><p>A microSD card holds the operating system and files.</p></div>
            <div class="mini"><h5>🏫 Education</h5><p>Used in schools to learn programming and electronics.</p></div>
            <div class="mini"><h5>📌 Embedded computing</h5><p>Fixed in position for one specialist task, e.g. a weather station.</p></div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.pc'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- desktop ----
    const per = { monitor: 1, keyboard: 1, mouse: 1, printer: 1 }, up = {};
    function drawDesk() {
      Object.keys(per).forEach((k) => { root.querySelector(`[data-per="${k}"]`).classList.toggle('off', !per[k]); });
      root.querySelectorAll('#per button').forEach((b) => { b.classList.toggle('on', !!per[b.dataset.v]); b.setAttribute('aria-pressed', !!per[b.dataset.v]); });
      UP.forEach((u) => root.querySelector(`.pc-part[data-up="${u.k}"]`).classList.toggle('in', !!up[u.k]));
      root.querySelectorAll('#up button[data-v]').forEach((b) => b.classList.toggle('on', !!up[b.dataset.v]));
      const p = 40 + UP.reduce((n, u) => n + (up[u.k] ? u.p : 0), 0);
      $('#perf').style.setProperty('--v', p + '%');
      $('#scrT').textContent = p > 90 ? '🎮 4K game: smooth' : p > 60 ? '🎬 Video editing' : 'Documents';
      const missing = PER.filter(([k]) => !per[k]).map(([, n]) => n.split(' ')[1].toLowerCase());
      $('#perMsg').innerHTML = missing.length ? `Without its <b>${missing.join(', ')}</b> the desktop cannot ${missing.includes('monitor') ? 'show you anything' : missing.includes('keyboard') || missing.includes('mouse') ? 'easily be controlled' : 'print'}. A desktop usually <b>needs</b> peripheral devices connected to it.` : 'All the peripherals are connected. The desktop is ready to use.';
    }
    $('#per').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { per[b.dataset.v] = !per[b.dataset.v]; drawDesk(); } });
    $('#up').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-v]'); if (!b) return;
      if (b.dataset.v === 'reset') Object.keys(up).forEach((k) => delete up[k]); else up[b.dataset.v] = 1;
      drawDesk();
    });
    drawDesk();

    // ---- all-in-one ----
    let aioId = 0;
    async function combine(on) {
      const id = ++aioId, t0 = $('#aioTower');
      $('#aioCable').style.opacity = on ? 0 : 1;
      t0.style.transform = on ? 'translate(-210px, -10px) scale(.7)' : '';
      t0.style.opacity = on ? 0 : 1;
      await FD.wait(900);
      if (id !== aioId || dead) return;
      root.querySelector('#aioMon text').textContent = on ? 'All-in-one: PC inside!' : 'Monitor';
    }
    $('#aioGo').addEventListener('click', () => combine(true));
    $('#aioBack').addEventListener('click', () => combine(false));

    // ---- laptops ----
    let lapId = 0;
    const lbl = (l) => root.querySelectorAll('.pc-lbl').forEach((g) => g.classList.toggle('on', !l || l.includes(g.dataset.l)));
    async function unplug() {
      const id = ++lapId;
      $('#uDesk').classList.add('dead'); $('#dState').textContent = '❌ off: no battery';
      $('#lState').textContent = '🔋 on battery';
      $('#uDesk').classList.remove('move'); $('#uLap').classList.add('move');
      await FD.tween(4000, (t) => { if (id === lapId && !dead) $('#bat').style.setProperty('--v', (100 - t * 22) + '%'); });
      if (id !== lapId || dead) return;
      $('#lState').textContent = '🔋 78% · still working in the library';
    }
    function plugIn() { lapId++; $('#uDesk').classList.remove('dead'); $('#uLap').classList.remove('move'); $('#dState').textContent = '🔌 on mains'; $('#lState').textContent = '🔌 on mains'; $('#bat').style.setProperty('--v', '100%'); }
    $('#unplug').addEventListener('click', () => ($('#uDesk').classList.contains('dead') ? plugIn() : unplug()));
    lbl(null);

    // ---- single-board computer ----
    const setLed = (on) => { $('#led').classList.toggle('on', on); $('#pbtn').classList.toggle('on', on); ['c2', 'c3'].forEach((c) => $('#' + c).classList.toggle('hl', on)); ['c4', 'c5'].forEach((c) => $('#' + c).classList.toggle('hl', !on)); };
    const pb = $('#press');
    pb.addEventListener('pointerdown', () => setLed(true));
    ['pointerup', 'pointerleave'].forEach((ev) => pb.addEventListener(ev, () => setLed(false)));
    $('#pbtn').addEventListener('pointerdown', () => setLed(true));
    $('#pbtn').addEventListener('pointerup', () => setLed(false));
    setLed(false);

    const show = FD.panels(root);
    show('desk');
    return {
      show, combine, unplug, plugIn, lbl, setLed,
      per(list) { Object.keys(per).forEach((k) => { per[k] = list.includes(k) ? 1 : 0; }); drawDesk(); },
      async upgrade(ctx) { for (const u of UP) { up[u.k] = 1; drawDesk(); if (!(await ctx.sleep(900))) return; } },
      noUp() { Object.keys(up).forEach((k) => delete up[k]); drawDesk(); },
      async sd(ctx) { const s = $('#sd'); s.classList.remove('in'); if (!(await ctx.sleep(400))) return; s.classList.add('in'); },
      async blink(ctx) { for (let i = 0; i < 3; i++) { setLed(true); if (!(await ctx.sleep(600))) return; setLed(false); if (!(await ctx.sleep(500))) return; } },
      destroy() { dead = true; aioId++; lapId++; },
    };
  },
  steps: [
    {
      title: 'Personal computers',
      text: `<p><strong>Personal computers (PCs)</strong> are common in homes and offices.</p>
             <p>They come in many different shapes and sizes, such as <strong>desktops</strong> and <strong>laptops</strong>.</p>`,
      on: (a) => { a.show('desk'); a.per(['monitor', 'keyboard', 'mouse', 'printer']); a.noUp(); },
    },
    {
      title: 'Desktops can be upgraded',
      text: `<p>Desktops have <strong>more space for components</strong> than laptops.</p>
             <p>They often give users the option to <strong>upgrade</strong> them (make them better and able to do more things) or add additional components.</p>`,
      tip: 'Try it: add memory, a graphics card or a bigger drive and watch the performance.',
      async on(a, ctx) { a.show('desk'); a.noUp(); if (!(await ctx.sleep(600))) return; await a.upgrade(ctx); },
    },
    {
      title: 'Desktops need peripheral devices',
      text: `<p>A desktop computer usually needs <strong>peripheral devices</strong> connected to it, such as a <strong>monitor, a printer, a mouse and a keyboard</strong>.</p>
             <p>A peripheral device is equipment that is connected to a computer and used with it.</p>`,
      tip: 'Try it: disconnect the monitor. What happens?',
      async on(a, ctx) { a.show('desk'); a.per([]); for (const k of ['monitor', 'keyboard', 'mouse', 'printer']) { if (!(await ctx.sleep(700))) return; a.per(['monitor', 'keyboard', 'mouse', 'printer'].slice(0, ['monitor', 'keyboard', 'mouse', 'printer'].indexOf(k) + 1)); } },
    },
    {
      title: 'All-in-one desktops',
      text: `<p>Some desktops are <strong>‘all-in-one’</strong>.</p>
             <p>This means that they <strong>combine the monitor with the PC hardware</strong> in a single unit.</p>`,
      async on(a, ctx) { a.show('aio'); await a.combine(false); if (!(await ctx.sleep(700))) return; await a.combine(true); },
    },
    {
      title: 'Laptops are portable',
      text: `<p>Laptops include a <strong>keyboard</strong>, a <strong>screen</strong>, a <strong>track pad</strong> and a <strong>rechargeable battery</strong>.</p>
             <p>Having these features means they can be taken away from the desk, which makes them an example of a <strong>portable</strong> device.</p>`,
      tip: 'Try it: unplug both computers and carry them to the library.',
      async on(a, ctx) { a.show('lap'); a.plugIn(); for (const l of ['screen', 'keys', 'pad', 'bat']) { a.lbl([l]); if (!(await ctx.sleep(700))) return; } a.lbl(null); await a.unplug(); },
    },
    {
      title: 'Desktop replacements',
      text: `<p>Some laptops are called <strong>‘desktop replacements’</strong>.</p>
             <p>They tend to be <strong>larger</strong> than other laptops, with a <strong>bigger and better-quality screen</strong> and <strong>higher performance</strong> levels.</p>`,
      on: (a) => { a.show('lap'); a.lbl(null); },
    },
    {
      title: 'Single-board computers',
      text: `<p><strong>Single-board computers (SBCs)</strong> are <strong>affordable</strong> computers used in education, embedded computing projects and physical computing projects.</p>
             <p>The <strong>Raspberry Pi Zero</strong> is an example. It costs very little and uses a cheap <strong>microSD card</strong> as its storage.</p>`,
      async on(a, ctx) { a.show('sbc'); await a.sd(ctx); },
    },
    {
      title: 'Embedded and physical computing',
      text: `<p><strong>Embedded computing</strong>: hardware that is fixed into position and carries out a specialist task.</p>
             <p><strong>Physical computing</strong>: interactive systems that can <strong>sense and respond</strong> to the world around them, like this button and LED.</p>`,
      tip: 'Try it: hold the button and watch which lines of the program run.',
      async on(a, ctx) { a.show('sbc'); await a.blink(ctx); },
    },
  ],
});

FD.check({
  section: 'pcs',
  items: [
    { type: 'mcq', q: 'Why are desktops easier to upgrade than laptops?', opts: ['They have more space for components', 'They have a rechargeable battery', 'They have a built-in track pad', 'They use a microSD card for storage'], why: 'Users can upgrade them or add additional components.' },
    { type: 'multi', q: 'Which three features make a laptop portable?', need: 3, opts: [['Built-in keyboard and screen', true], ['Track pad', true], ['Rechargeable battery', true], ['Separate monitor', false], ['Must be plugged into the mains', false]], why: 'They can be taken away from the desk.' },
    { type: 'mcq', q: 'What is an all-in-one computer?', opts: ['A desktop that combines the monitor with the PC hardware', 'A laptop with a touch screen', 'A phone that can make calls and take photos', 'A computer with no peripherals'], why: 'Figure 1.4.' },
    { type: 'mcq', q: 'Which of these describes a ‘desktop replacement’?', opts: ['A larger laptop with a bigger, better-quality screen and higher performance', 'A tablet with a keyboard', 'A desktop with no monitor', 'A cheap single-board computer'], why: 'They tend to be larger than other laptops.' },
    {
      type: 'sort',
      q: 'Match each term to its meaning.',
      bins: ['Peripheral device', 'Embedded computing', 'Physical computing', 'Upgrade'],
      rows: [['Equipment connected to a computer and used with it', 0], ['Hardware fixed into position for a specialist task', 1], ['Systems that sense and respond to the world around them', 2], ['Make a computer better and able to do more things', 3]],
      why: 'All four are subject vocabulary from pages 5–7.',
    },
    { type: 'tf', q: 'A Raspberry Pi Zero uses a cheap microSD card as its storage.', a: true, why: 'SBCs are affordable: the unit itself costs very little.' },
  ],
});
