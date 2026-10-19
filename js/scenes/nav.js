FD.add({
  id: 'nav',
  title: 'Navigation aids and smart homes',
  tab: 'Sat-Nav · smart home',
  icon: 'nav',
  color: '--c7',
  section: true,
  interactive: true,
  vocab: [
    ['GPS', 'the Global Positioning System that uses radio signals from satellites to show your exact position on the Earth on a special piece of equipment'],
    ['smart', 'the ability of a device to use data from sensors to perform a programmed action independently; smart devices are often also able to connect to the internet'],
  ],
  mount(el) {
    // Street grid: nodes (c, r) with c 0..6, r 0..4. Some streets are closed (no edge).
    const C = 7, R = 5, X = (c) => 40 + c * 72, Y = (r) => 30 + r * 42;
    const closed = new Set(['2,1-3,1', '3,2-3,3', '4,0-4,1', '1,3-2,3', '5,2-5,3', '3,3-4,3']);
    const key = (a, b) => [a, b].sort().join('-');
    const nb = ([c, r]) => [[c + 1, r], [c - 1, r], [c, r + 1], [c, r - 1]].filter(([x, y]) => x >= 0 && y >= 0 && x < C && y < R && !closed.has(key(`${c},${r}`, `${x},${y}`)));
    function bfs(from, to, avoid) {
      const q = [from], prev = { [from]: null };
      while (q.length) {
        const n = q.shift();
        if (n.join() === to.join()) break;
        nb(n).forEach((m) => { if (!(m in prev) && !(avoid && key(n.join(), m.join()) === avoid)) { prev[m] = n; q.push(m); } });
      }
      const path = []; for (let n = to; n; n = prev[n]) path.unshift(n);
      return path;
    }
    const HOME = [
      ['tv', '📺', 'TV', 60, 40], ['radio', '📻', 'Radio', 380, 40], ['heat', '🌡️', 'Heating', 40, 120],
      ['fridge', '🧊', 'Fridge', 400, 120], ['light', '💡', 'Lights', 60, 200], ['wash', '🧺', 'Washing machine', 380, 200],
    ];
    el.innerHTML = `
      <div class="sim nv">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="sat">🚗 Sat-Nav</button><button data-p="gps">🛰️ GPS and orientation</button><button data-p="smart">🏠 Smart home</button>
        </div>

        <div data-panel="sat" class="sim">
          <div class="nv-sat">
            <div class="sim-box">
              <svg viewBox="0 0 520 220" aria-label="A street map with a route from start to destination">
                <g id="streets"></g>
                <path class="nv-route" id="route" d=""/>
                <text class="emo" id="dest" font-size="20">🏁</text>
                <g id="car"><circle r="13" class="nv-me"/><text class="emo" id="carIc" font-size="16">🚗</text></g>
              </svg>
            </div>
            <div class="nv-screen" id="scr"><span class="nv-arrow" id="arr">⬆️</span><b id="instr">Press Start</b><small id="eta"></small></div>
          </div>
          <div class="ctrls">
            <button class="btn primary small-btn" id="drive">▶ Start the journey</button>
            <button class="btn ghost small-btn" id="wrong">↪ Take a wrong turn</button>
            <div class="seg" id="mode"><span class="seg-l">Device</span><button data-v="car">🚗 In-car Sat-Nav</button><button data-v="van">🚚 Delivery van</button><button data-v="walk">🚶 Walker (waterproof, shockproof, audio alerts)</button></div>
          </div>
        </div>

        <div data-panel="gps" class="sim" hidden>
          <div class="nv-gps">
            <div class="sim-box">
              <svg class="nv-gsvg" viewBox="0 0 300 200" aria-label="GPS satellites sending signals to a device on Earth">
                <circle class="nv-earth" cx="150" cy="330" r="190"/>
                <g id="sats">${[0, 1, 2, 3].map((i) => `<g class="nv-sat" data-i="${i}"><line class="nv-sig" x1="0" y1="0" x2="0" y2="0"/><text class="emo" font-size="20">🛰️</text></g>`).join('')}</g>
                <text class="emo" x="150" y="128" font-size="22">📍</text>
                <text class="nv-gt" x="150" y="170" id="gpsT">calculating…</text>
              </svg>
            </div>
            <div class="nv-dev">
              <div class="nv-map" id="map"><span class="nv-north">N</span><span class="nv-pt" id="pt">➤</span></div>
              <label class="rng"><span>Turn the device (orientation sensor) <output id="hdO"></output></span><input type="range" id="hd" min="0" max="359" value="0"></label>
              <label class="tgl"><input type="checkbox" id="net" checked> 🌐 Internet connection</label>
              <ul class="nv-stat" id="stat"></ul>
            </div>
          </div>
        </div>

        <div data-panel="smart" class="sim" hidden>
          <div class="nv-home">
            <div class="sim-box">
              <svg viewBox="0 0 460 250" aria-label="Home automation: devices around a house controlled by a smartphone">
                <path class="nv-house" d="M150 120 L230 60 L310 120 V230 H150 Z"/>
                ${[[165, 135], [255, 135], [165, 180], [255, 180]].map(([x, y]) => `<rect class="nv-win" x="${x}" y="${y}" width="40" height="30" rx="2"/>`).join('')}
                ${HOME.map(([k, e, n, x, y]) => `<line class="nv-dl" data-k="${k}" x1="${x}" y1="${y}" x2="230" y2="160"/><g class="nv-hd" data-k="${k}"><circle cx="${x}" cy="${y}" r="26"/><text class="emo" x="${x}" y="${y - 2}" font-size="22">${e}</text><text class="nv-hs" x="${x}" y="${y + 40}">${n}: off</text></g>`).join('')}
                <g transform="translate(212 130)"><rect class="dv-body" x="0" y="0" width="36" height="62" rx="6"/><rect class="dv-screen" x="4" y="7" width="28" height="44" rx="2"/><text class="emo" x="18" y="29" font-size="14">🏠</text></g>
              </svg>
            </div>
            <div class="nv-app">
              <div class="nv-apphead"><b>🏠 My Home app</b><div class="seg" id="where"><button data-v="home">At home</button><button data-v="away">At school</button></div></div>
              <div id="appT">${HOME.map(([k, e, n]) => `<label class="nv-sw"><span>${e} ${n}</span><input type="checkbox" data-k="${k}"></label>`).join('')}</div>
              <p class="small" id="temp"></p>
              <div class="nv-voice"><b>🗣️ Smart assistant</b>${[['lights', '“Turn on the lights”'], ['heat', '“Make it warmer”'], ['radio', '“Play the radio”'], ['off', '“Switch everything off”']].map(([k, t]) => `<button class="mini-btn" data-v="${k}">${t}</button>`).join('')}</div>
            </div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.nv'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- Sat-Nav ----
    let streets = '';
    for (let c = 0; c < C; c++) for (let r = 0; r < R; r++) nb([c, r]).forEach(([x, y]) => { if (x > c || y > r) streets += `<line class="nv-st" x1="${X(c)}" y1="${Y(r)}" x2="${X(x)}" y2="${Y(y)}"/>`; });
    closed.forEach((k) => { const [a, b] = k.split('-').map((s) => s.split(',').map(Number)); streets += `<line class="nv-closed" x1="${X(a[0])}" y1="${Y(a[1])}" x2="${X(b[0])}" y2="${Y(b[1])}"/>`; });
    $('#streets').innerHTML = streets + Array.from({ length: (C - 1) * (R - 1) }, (_, i) => `<rect class="nv-block" x="${X(i % (C - 1)) + 8}" y="${Y(Math.floor(i / (C - 1))) + 8}" width="56" height="26" rx="4"/>`).join('');
    const START = [0, 4], END = [6, 0];
    $('#dest').setAttribute('x', X(END[0])); $('#dest').setAttribute('y', Y(END[1]) - 14);
    const pts = (p) => p.map(([c, r]) => [X(c), Y(r)]);
    const setCar = ([x, y]) => $('#car').setAttribute('transform', `translate(${x} ${y})`);
    const drawRoute = (p) => $('#route').setAttribute('d', 'M' + pts(p).map((q) => q.join(' ')).join(' L'));
    let mode = 'car', drvId = 0, wrongReq = false;
    function turnText(p, i) {
      if (i >= p.length - 1) return ['🏁', 'You have arrived'];
      const a = p[i], b = p[i + 1], c2 = p[i + 2];
      if (!c2) return ['⬆️', 'Destination ahead'];
      const d1 = [b[0] - a[0], b[1] - a[1]], d2 = [c2[0] - b[0], c2[1] - b[1]];
      if (d1.join() === d2.join()) return ['⬆️', 'Continue straight on'];
      const cross = d1[0] * d2[1] - d1[1] * d2[0];
      return cross > 0 ? ['➡️', 'Turn right ahead'] : ['⬅️', 'Turn left ahead'];
    }
    function setMode(m) { mode = m; FD.segSet($('#mode'), m); $('#carIc').textContent = { car: '🚗', van: '🚚', walk: '🚶' }[m]; }
    $('#mode').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) setMode(b.dataset.v); });
    function say(ic, t, eta) { $('#arr').textContent = ic; $('#instr').textContent = (mode === 'walk' ? '🔊 ' : '') + t; $('#eta').textContent = eta || ''; FD.pulse($('#scr')); }
    async function drive() {
      const id = ++drvId, ok = () => id === drvId && !dead;
      let pos = START, path = bfs(START, END);
      drawRoute(path); setCar(pts([pos])[0]);
      $('#route').classList.remove('recalc');
      say('🧭', 'Best route calculated', `${path.length - 1} blocks`);
      await FD.wait(1000); if (!ok()) return;
      for (let i = 0; i < path.length - 1;) {
        let next = path[i + 1];
        if (wrongReq) {
          wrongReq = false;
          const alt = nb(path[i]).filter((m) => m.join() !== next.join() && (i === 0 || m.join() !== path[i - 1].join()));
          if (alt.length) {
            next = alt[0];
            say('⚠️', 'Route not followed!', '');
            await FD.tween(700, (t) => { if (ok()) setCar(FD.along(pts([path[i], next]), t)); }); if (!ok()) return;
            $('#route').classList.add('recalc'); say('🔄', 'Recalculating…', ''); await FD.wait(1100); if (!ok()) return;
            pos = next; path = bfs(pos, END); i = 0; drawRoute(path); $('#route').classList.remove('recalc');
            say('🧭', 'New route', `${path.length - 1} blocks`); await FD.wait(800); if (!ok()) return;
            continue;
          }
        }
        const [ic, t] = turnText(path, i); say(ic, t, `${path.length - 1 - i} blocks to go`);
        await FD.tween(mode === 'walk' ? 1100 : 650, (k) => { if (ok()) setCar(FD.along(pts([path[i], path[i + 1]]), k)); }); if (!ok()) return;
        i++;
      }
      say('🏁', 'You have arrived', '');
    }
    $('#drive').addEventListener('click', drive);
    $('#wrong').addEventListener('click', () => { wrongReq = true; });
    setMode('car'); drawRoute(bfs(START, END)); setCar(pts([START])[0]);

    // ---- GPS ----
    let raf = 0;
    const t0 = performance.now();
    function orbit(now) {
      if (dead) return;
      if (root.dataset.panel === 'gps') {
        const t = (now - t0) / 1000;
        root.querySelectorAll('.nv-sat').forEach((g, i) => {
          const a = Math.PI * (1.15 + i * .233) + Math.sin(t * .3 + i) * .06, x = 150 + Math.cos(a) * 130, y = 135 + Math.sin(a) * 110;
          g.setAttribute('transform', `translate(${x} ${y})`);
          g.querySelector('line').setAttribute('x2', 150 - x); g.querySelector('line').setAttribute('y2', 128 - y);
        });
        $('#gpsT').textContent = `39.15° N, 0.43° W (±5 m)`;
      }
      raf = requestAnimationFrame(orbit);
    }
    raf = requestAnimationFrame(orbit);
    function heading(v) {
      $('#hd').value = v; $('#hdO').textContent = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'][Math.round(v / 45) % 8];
      $('#pt').style.transform = `translate(-50%, -50%) rotate(${v - 90}deg)`;
    }
    function netStat() {
      const on = $('#net').checked;
      $('#stat').innerHTML = `<li class="y">✓ GPS position: works without the internet</li><li class="y">✓ Maps stored on the device: work</li><li class="${on ? 'y' : 'n'}">${on ? '✓' : '✗'} Download or update map data: ${on ? 'available' : 'needs the internet'}</li>`;
      $('#map').classList.toggle('old', !on);
    }
    $('#hd').addEventListener('input', (e) => heading(+e.target.value));
    $('#net').addEventListener('change', netStat);
    heading(0); netStat();

    // ---- smart home ----
    const st = {};
    let where = 'home', temp = 17;
    function home() {
      HOME.forEach(([k, , n]) => {
        const on = !!st[k];
        root.querySelector(`.nv-hd[data-k="${k}"]`).classList.toggle('on', on);
        root.querySelector(`.nv-dl[data-k="${k}"]`).classList.toggle('on', on);
        root.querySelector(`.nv-hd[data-k="${k}"] .nv-hs`).textContent = `${n}: ${on ? 'on' : 'off'}`;
        root.querySelector(`#appT input[data-k="${k}"]`).checked = on;
      });
      root.querySelector('.nv-house').classList.toggle('lit', !!st.light);
      FD.segSet($('#where'), where);
      $('#temp').innerHTML = `🌡️ Temperature sensor: <b>${temp} °C</b> · controlled ${where === 'home' ? 'over the home Wi-Fi' : 'over the <b>internet</b>'}`;
    }
    $('#appT').addEventListener('change', (e) => { const i = e.target.closest('input[data-k]'); if (i) { st[i.dataset.k] = i.checked; if (i.dataset.k === 'heat') warm(); home(); } });
    $('#where').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { where = b.dataset.v; home(); } });
    let hId = 0;
    async function warm() { const id = ++hId; while (st.heat && temp < 21) { await FD.wait(500); if (id !== hId || dead) return; temp++; home(); } }
    function voice(k) {
      if (k === 'lights') st.light = 1; if (k === 'radio') st.radio = 1; if (k === 'heat') { st.heat = 1; warm(); }
      if (k === 'off') HOME.forEach(([h]) => { st[h] = 0; });
      FD.toast(root.querySelector('.nv-home .sim-box'), `🗣️ ${root.querySelector(`.nv-voice [data-v="${k}"]`).textContent} → ✓ Done`);
      home();
    }
    root.querySelector('.nv-voice').addEventListener('click', (e) => { const b = e.target.closest('[data-v]'); if (b) voice(b.dataset.v); });
    home();

    const show = FD.panels(root);
    show('sat');
    return {
      show, drive, setMode, heading, voice,
      wrong() { wrongReq = true; },
      net(on) { $('#net').checked = on; netStat(); },
      async turn(ctx) { for (let v = 0; v <= 270; v += 15) { heading(v); if (!(await ctx.sleep(80))) return; } },
      async toggles(list, ctx) { for (const k of list) { st[k] = 1; if (k === 'heat') warm(); home(); if (!(await ctx.sleep(600))) return; } },
      reset() { HOME.forEach(([h]) => { st[h] = 0; }); temp = 17; where = 'home'; home(); },
      away() { where = 'away'; home(); },
      destroy() { dead = true; drvId++; hId++; cancelAnimationFrame(raf); },
    };
  },
  steps: [
    {
      title: 'Navigation aids',
      text: `<p><strong>Navigation aids</strong> (such as Sat-Nav) can calculate the <strong>best route</strong> between two or more locations.</p>
             <p>They can provide <strong>updates to the route</strong> if it is not followed accurately.</p>`,
      tip: 'Try it: start the journey, then take a wrong turn.',
      async on(a, ctx) { a.show('sat'); a.setMode('car'); const p = a.drive(); if (!(await ctx.sleep(2600))) return; a.wrong(); await p; },
    },
    {
      title: 'Prompts and alerts',
      text: `<p>Navigation aids are commonly used in <strong>cars, delivery vans and ships</strong>.</p>
             <p>They provide <strong>visual prompts and alerts</strong> to help drivers take the correct route, such as by taking a particular turning.</p>`,
      async on(a) { a.show('sat'); a.setMode('van'); await a.drive(); },
    },
    {
      title: 'Specialist devices',
      text: `<p>Specialist devices with <strong>audio alerts</strong> and <strong>waterproof and shockproof</strong> cases are available for walkers, cyclists and runners.</p>`,
      async on(a) { a.show('sat'); a.setMode('walk'); await a.drive(); },
    },
    {
      title: 'GPS',
      text: `<p>Navigation aids use information from <strong>GPS</strong> satellites to determine the <strong>exact location</strong> of the device on Earth.</p>
             <p>GPS satellites orbit more than 20 km above the Earth and are accurate to within 5 metres.</p>`,
      on: (a) => { a.show('gps'); a.net(true); },
    },
    {
      title: 'Orientation sensors',
      text: `<p>Navigation aids also use <strong>orientation sensors</strong> to know which way the device is pointing.</p>
             <p>The device displays the user’s <strong>position and orientation</strong> on a map.</p>`,
      tip: 'Try it: turn the device and watch the arrow on the map.',
      async on(a, ctx) { a.show('gps'); await a.turn(ctx); },
    },
    {
      title: 'Maps and the internet',
      text: `<p>Maps are either <strong>stored permanently</strong> on the device or <strong>downloaded</strong> from the internet when they are needed.</p>
             <p>GPS does <strong>not</strong> need internet connectivity to work. However, navigation aids need the internet to <strong>update map data</strong>. Smartphones with navigation apps are now replacing specialist in-car navigation aids.</p>`,
      async on(a, ctx) { a.show('gps'); a.net(true); if (!(await ctx.sleep(1000))) return; a.net(false); },
    },
    {
      title: 'Home automation devices',
      text: `<p>Home automation devices are an <strong>emerging technology</strong> used to create <strong>smart homes</strong>.</p>
             <p>They connect a range of digital devices which <strong>sense and control</strong> functions in the home, such as temperature and lighting. These can be controlled from <strong>apps on smartphones or the internet</strong>.</p>`,
      tip: 'Try it: switch devices on in the app, at home and from school.',
      async on(a, ctx) { a.show('smart'); a.reset(); await a.toggles(['heat', 'light', 'tv'], ctx); if (!(await ctx.sleep(600))) return; a.away(); },
    },
    {
      title: 'Smart assistants',
      text: `<p><strong>Smart assistants</strong> let users control home automation devices by speaking to them.</p>
             <p>The assistant turns the spoken request into an action, such as switching on the lights.</p>`,
      async on(a, ctx) { a.show('smart'); a.reset(); for (const k of ['lights', 'radio', 'heat']) { a.voice(k); if (!(await ctx.sleep(1200))) return; } },
    },
  ],
});

FD.check({
  section: 'nav',
  items: [
    { type: 'mcq', q: 'What happens when a driver does not follow the Sat-Nav route accurately?', opts: ['The navigation aid updates (recalculates) the route', 'The car stops automatically', 'The map is deleted', 'GPS stops working'], why: 'Navigation aids provide updates to the route.' },
    { type: 'mcq', q: 'Where does a navigation aid get its exact location from?', opts: ['GPS satellites', 'The mobile phone SIM card', 'A Bluetooth speaker', 'The image processor'], why: 'GPS uses radio signals from satellites.' },
    { type: 'mcq', q: 'What does the orientation sensor tell the navigation aid?', opts: ['Which way the device is pointing', 'How fast the internet is', 'How much battery is left', 'The temperature outside'], why: 'The position and orientation are shown on the map.' },
    { type: 'tf', q: 'GPS needs an internet connection to find the position of the device.', a: false, why: 'GPS works without the internet; only map updates need it.' },
    { type: 'multi', q: 'Which two features are typical of specialist navigation devices for walkers and runners?', need: 2, opts: [['Audio alerts', true], ['Waterproof and shockproof cases', true], ['A built-in printer', false], ['A Blu-ray drive', false]], why: 'Book page 14.' },
    { type: 'mcq', q: 'What do home automation devices do?', opts: ['Sense and control functions in the home, such as temperature and lighting', 'Record TV programmes', 'Calculate the best route to school', 'Print photos'], why: 'They can be controlled from apps on smartphones or the internet.' },
  ],
});
