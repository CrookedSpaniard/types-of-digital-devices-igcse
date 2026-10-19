FD.add({
  id: 'types',
  title: 'Types of digital devices',
  tab: 'Types',
  icon: 'types',
  color: '--c4',
  section: true,
  interactive: true,
  vocab: [
    ['mainframe computer', 'a large, powerful computer that can do a lot of complicated jobs quickly and can be used by a lot of people at the same time'],
    ['microprocessor', 'the device that controls what a computer does; it takes data as input, does something with it and provides output'],
  ],
  mount(el) {
    const D = [
      { e: '🔲', n: 'Microprocessor', size: 'Smaller than a fingernail', who: 'Built into household appliances', job: 'Controls a washing machine, a television or a microwave', users: 'The person using the appliance', p: 6 },
      { e: '🍓', n: 'Single-board computer', size: 'About the size of a credit card', who: 'Schools, hobbyists, makers', job: 'Embedded and physical computing projects', users: '1', p: 14 },
      { e: '📱', n: 'Smartphone', size: 'Fits in a pocket', who: 'Almost everyone', job: 'Calls, internet, photos, apps', users: '1', p: 26 },
      { e: '💻', n: 'Laptop', size: 'Fits in a bag', who: 'Students and office workers', job: 'Documents, browsing, video calls on the move', users: '1', p: 38 },
      { e: '🖥️', n: 'Desktop computer', size: 'Sits on a desk', who: 'Homes and offices', job: 'Documents, design, games; can be upgraded', users: '1', p: 46 },
      { e: '🗄️', n: 'Server', size: 'A cabinet or a rack', who: 'Schools, businesses, websites', job: 'Provides files, emails or web pages to other computers on a network', users: 'Many, over a network', p: 64 },
      { e: '🏢', n: 'Mainframe computer', size: 'Fills a large room', who: 'Large organisations: banks, governments, airlines', job: 'Complex processing: statistical analysis and bulk data processing', users: 'Thousands at the same time', p: 84 },
      { e: '🚀', n: 'Supercomputer', size: 'Fills a hall', who: 'Scientists and weather services', job: 'Huge calculations, e.g. weather forecasts or climate models', users: 'A few research teams', p: 100 },
    ];
    const HOME = [
      ['🧺', 'Washing machine', 1, 'Controls the programme, water temperature and spin speed.'],
      ['📺', 'Television', 1, 'Decodes the picture and runs the menus and apps.'],
      ['🪑', 'Wooden chair', 0, 'No electronics at all.'],
      ['🍲', 'Microwave', 1, 'Runs the timer, power level and display.'],
      ['⏰', 'Digital alarm clock', 1, 'Counts time and sounds the alarm.'],
      ['📚', 'Bookshelf', 0, 'Just wood and books.'],
      ['🎮', 'Games console', 1, 'A powerful processor runs the games.'],
      ['☂️', 'Umbrella', 0, 'Purely mechanical.'],
      ['🌡️', 'Central-heating thermostat', 1, 'Compares the temperature with the setting and switches the boiler.'],
      ['✂️', 'Scissors', 0, 'Purely mechanical.'],
      ['🚗', 'Car', 1, 'Dozens of microprocessors: engine, brakes (ABS), airbags.'],
      ['🛋️', 'Sofa', 0, 'No electronics (unless it reclines electrically!).'],
    ];
    const PROG = { cotton: ['Cotton 40 °C', 40, 1200, 'Normal'], wool: ['Wool 30 °C', 30, 600, 'Gentle'], quick: ['Quick 20 °C', 20, 800, 'Short'] };
    el.innerHTML = `
      <div class="sim ty">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="range">📏 The range of devices</button><button data-p="main">🏢 Mainframe</button><button data-p="micro">🔲 Microprocessor</button><button data-p="hunt">🔍 Find them at home</button>
        </div>

        <div data-panel="range" class="sim">
          <div class="ty-scale">
            <div class="ty-row" id="row">${D.map((d, i) => `<button class="ty-dev" data-i="${i}" data-zone="d${i}" aria-pressed="false"><span>${d.e}</span><small>${d.n}</small></button>`).join('')}</div>
            <div class="ty-bar"><i id="pow"></i><span>less powerful</span><span>more powerful</span></div>
          </div>
          <label class="rng"><span>Move along the range <output id="rngOut"></output></span><input type="range" id="rng" min="0" max="${D.length - 1}" value="0"></label>
          <div class="ty-card" id="info"></div>
        </div>

        <div data-panel="main" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 250" aria-label="Many users connected to one mainframe at the same time">
              <g id="mfLinks"></g>
              <g transform="translate(205 70)">
                ${[0, 1, 2, 3, 4].map((k) => `<rect class="ty-rack" x="${k * 22}" y="0" width="20" height="110" rx="2"/>${[0, 1, 2, 3, 4, 5, 6].map((r) => `<rect class="ty-blink" style="animation-delay:${((k * 7 + r) % 9) * .17}s" x="${k * 22 + 4}" y="${8 + r * 14}" width="12" height="4" rx="1"/>`).join('')}`).join('')}
                <text class="svg-sm" x="55" y="128" text-anchor="middle">mainframe</text>
              </g>
              <g id="mfUsers"></g>
              <g id="mfDots"></g>
            </svg>
          </div>
          <div class="ctrls">
            <button class="btn primary small-btn" id="mfRun">▶ Run the bank’s night job</button>
            <span class="pill">👥 Users at the same time: <b id="mfUsersN">0</b></span>
            <span class="pill">📄 Statements produced: <b id="mfN">0</b></span>
          </div>
          <div class="meter"><span class="meter-l">Bulk job</span><span class="bar"><i id="mfBar"></i></span></div>
          <div class="cards3">
            <div class="mini" data-b="many"><h5>👥 Many users at once</h5><p>Cash machines, bank staff and online banking all use it at the same time.</p></div>
            <div class="mini" data-b="bulk"><h5>📦 Bulk data processing</h5><p>Millions of records processed in one go, e.g. every customer’s monthly statement.</p></div>
            <div class="mini" data-b="stats"><h5>📊 Statistical analysis</h5><p>Complex calculations on huge amounts of data, e.g. a census.</p></div>
          </div>
        </div>

        <div data-panel="micro" class="sim" hidden>
          <div class="ty-wm">
            <div class="sim-box ty-wmbox">
              <svg viewBox="0 0 220 240" aria-label="A washing machine controlled by a microprocessor">
                <rect class="ty-wmbody" x="20" y="10" width="180" height="220" rx="12"/>
                <rect class="ty-wmpanel" x="30" y="20" width="160" height="40" rx="6"/>
                <text class="ty-lcd" id="lcd" x="110" y="46" text-anchor="middle">Ready</text>
                <circle class="ty-door" cx="110" cy="140" r="62"/>
                <g id="drum"><circle class="ty-drum" cx="110" cy="140" r="48"/><path class="ty-fin" d="M110 92v14M110 174v14M62 140h14M144 140h14"/><circle class="ty-cloth" cx="96" cy="128" r="9"/><circle class="ty-cloth b" cx="124" cy="152" r="8"/></g>
                <rect class="ty-chip" id="chip" x="160" y="26" width="22" height="22" rx="3"/><text x="171" y="41" class="ty-chipt" text-anchor="middle">μP</text>
              </svg>
            </div>
            <div class="ty-ipo">
              <div class="seg" id="prog"><span class="seg-l">1 · Choose a programme</span>${Object.entries(PROG).map(([k, v]) => `<button data-v="${k}">${v[0]}</button>`).join('')}</div>
              <button class="btn primary small-btn" id="wmGo">▶ Start</button>
              <ol class="ty-flow">
                <li data-s="in"><b>Input</b><span id="fIn">Programme dial, door sensor, water-level sensor, temperature sensor</span></li>
                <li data-s="pro"><b>Process</b><span id="fPro">The microprocessor follows the program for the chosen wash</span></li>
                <li data-s="out"><b>Output</b><span id="fOut">Heater, water valve, drum motor, pump, display</span></li>
              </ol>
            </div>
          </div>
        </div>

        <div data-panel="hunt" class="sim" hidden>
          <p class="ui-hint">Tap every object that has a <b>microprocessor</b> inside. <b id="huntN">0</b> / ${HOME.filter((h) => h[2]).length} found.</p>
          <div class="ty-hunt">${HOME.map(([e, n], i) => `<button class="ty-obj" data-i="${i}"><span>${e}</span><b>${n}</b><small></small></button>`).join('')}</div>
        </div>
      </div>`;
    const root = el.querySelector('.ty'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- range ----
    function pick(i) {
      const d = D[i];
      $('#rng').value = i;
      $('#rngOut').textContent = d.n;
      $('#pow').style.width = d.p + '%';
      root.querySelectorAll('.ty-dev').forEach((b) => { const on = +b.dataset.i === i; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
      $('#info').innerHTML = `<span class="ty-big">${d.e}</span><div><h4>${d.n}</h4><dl>
        <dt>Size</dt><dd>${d.size}</dd><dt>Used by</dt><dd>${d.who}</dd><dt>Typical job</dt><dd>${d.job}</dd><dt>Users at the same time</dt><dd>${d.users}</dd></dl></div>`;
      FD.pulse($('#info'));
    }
    $('#rng').addEventListener('input', (e) => pick(+e.target.value));
    $('#row').addEventListener('click', (e) => { const b = e.target.closest('.ty-dev'); if (b) pick(+b.dataset.i); });
    pick(0);

    // ---- mainframe ----
    const U = [['🏧', 40, 30], ['🏧', 40, 125], ['🏧', 40, 220], ['👩‍💼', 130, 20], ['👨‍💼', 130, 230], ['💻', 400, 20], ['📱', 400, 230], ['💻', 480, 40], ['📱', 480, 125], ['🏪', 480, 215], ['👩‍💼', 300, 20], ['📱', 300, 232]];
    $('#mfUsers').innerHTML = U.map(([e, x, y], i) => `<g class="ty-user" data-u="${i}"><circle cx="${x}" cy="${y}" r="17"/><text class="emo" x="${x}" y="${y + 1}" font-size="18">${e}</text></g>`).join('');
    $('#mfLinks').innerHTML = U.map(([, x, y], i) => `<line class="ty-link" data-u="${i}" x1="${x}" y1="${y}" x2="260" y2="125"/>`).join('');
    let mfId = 0;
    async function mainframe() {
      const id = ++mfId;
      $('#mfDots').innerHTML = '';
      root.querySelectorAll('.ty-user, .ty-link').forEach((u) => u.classList.remove('on'));
      for (let i = 0; i < U.length; i++) {
        if (id !== mfId || dead) return;
        root.querySelectorAll(`[data-u="${i}"]`).forEach((u) => u.classList.add('on'));
        $('#mfUsersN').textContent = i + 1;
        await FD.wait(90);
      }
      const total = 250000;
      const dots = U.map(() => { const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle'); c.setAttribute('r', 4); c.setAttribute('class', 'ty-job'); $('#mfDots').appendChild(c); return c; });
      await FD.tween(5200, (t) => {
        if (id !== mfId || dead) return;
        U.forEach(([, x, y], i) => {
          const k = (t * 6 + i / U.length) % 1;
          dots[i].setAttribute('cx', x + (260 - x) * k);
          dots[i].setAttribute('cy', y + (125 - y) * k);
        });
        $('#mfN').textContent = FD.fmt(total * t);
        $('#mfBar').style.setProperty('--v', (t * 100) + '%');
      });
      if (id !== mfId || dead) return;
      $('#mfDots').innerHTML = '';
      FD.toast(root.querySelector('[data-panel="main"] .sim-box'), '✅ 250,000 statements in one night, while 12 users kept working.');
    }
    $('#mfRun').addEventListener('click', mainframe);

    // ---- microprocessor in a washing machine ----
    let prog = 'cotton', wmId = 0;
    FD.segSet($('#prog'), prog);
    $('#prog').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { prog = b.dataset.v; FD.segSet($('#prog'), prog); $('#lcd').textContent = PROG[prog][0]; } });
    const flow = (s) => root.querySelectorAll('.ty-flow li').forEach((li) => li.classList.toggle('on', li.dataset.s === s));
    async function wash() {
      const id = ++wmId, [name, temp, rpm, kind] = PROG[prog], ok = () => id === wmId && !dead;
      const drum = $('#drum');
      flow('in'); $('#fIn').innerHTML = `Dial: <b>${name}</b> · door sensor: <b>closed</b> · water level: <b>low</b> · temperature: <b>12 °C</b>`;
      $('#lcd').textContent = name; $('#chip').classList.add('on');
      await FD.wait(1300); if (!ok()) return;
      flow('pro'); $('#fPro').innerHTML = `IF water is low THEN open valve · IF temperature &lt; ${temp} °C THEN heat · spin at <b>${rpm} rpm</b> (${kind})`;
      await FD.wait(1300); if (!ok()) return;
      flow('out');
      for (let t = 12; t <= temp; t += 2) { $('#lcd').textContent = `Heating ${t} °C`; $('#fOut').innerHTML = `Valve <b>open</b> → heater <b>on</b> (${t} °C)`; await FD.wait(60); if (!ok()) return; }
      $('#fOut').innerHTML = `Heater <b>off</b> · motor <b>${rpm} rpm</b> · display <b>“Washing”</b>`;
      $('#lcd').textContent = 'Washing…';
      let a = 0;
      await FD.tween(2600, (t) => { if (!ok()) return; a += rpm / 120; drum.setAttribute('transform', `rotate(${a} 110 140)`); });
      if (!ok()) return;
      $('#lcd').textContent = 'Finished ✓'; $('#chip').classList.remove('on'); flow('');
    }
    $('#wmGo').addEventListener('click', wash);

    // ---- hunt ----
    let found = 0;
    root.querySelectorAll('.ty-obj').forEach((b) => b.addEventListener('click', () => {
      if (b.classList.contains('done')) return;
      const [, , has, why] = HOME[+b.dataset.i];
      b.classList.add('done', has ? 'yes' : 'no');
      b.querySelector('small').textContent = (has ? '✓ ' : '✗ ') + why;
      if (has) { found++; $('#huntN').textContent = found; } else FD.shake(b);
    }));

    const show = FD.panels(root);
    show('range');
    return {
      show, pick, mainframe, wash,
      ben(list) { root.querySelectorAll('[data-panel="main"] .mini').forEach((m) => m.classList.toggle('hot', list.includes(m.dataset.b))); },
      async sweep(from, to, ctx) { for (let i = from; i <= to; i++) { pick(i); if (!(await ctx.sleep(650))) return false; } return true; },
      reveal(n) { [...root.querySelectorAll('.ty-obj')].filter((b) => HOME[+b.dataset.i][2]).slice(0, n).forEach((b) => b.click()); },
      destroy() { dead = true; mfId++; wmId++; },
    };
  },
  steps: [
    {
      title: 'There are many types of digital device',
      text: `<p>Digital devices range from very powerful <strong>mainframe computers</strong> to tiny <strong>microprocessors</strong>.</p>
             <p>Along the way you find single-board computers, smartphones, laptops, desktops and servers.</p>`,
      tip: 'Try it: move the slider or tap a device to compare size, users and jobs.',
      async on(a, ctx) { a.show('range'); a.pick(0); if (!(await ctx.sleep(500))) return; await a.sweep(1, 7, ctx); },
    },
    {
      title: 'Mainframe computers',
      text: `<p>A <strong>mainframe computer</strong> is a large, powerful computer that can do a lot of complicated jobs quickly.</p>
             <p>It can be used by <strong>a lot of people at the same time</strong>.</p>`,
      async on(a) { a.show('main'); a.ben(['many']); await a.mainframe(); },
    },
    {
      title: 'What mainframes are used for',
      text: `<p>Mainframes are used by <strong>large organisations</strong> for complex processing tasks such as:</p>
             <ul><li><strong>statistical analysis</strong></li><li><strong>bulk data processing</strong>, e.g. producing every customer’s bank statement overnight.</li></ul>`,
      tip: 'Activity: research the difference between a mainframe, a server and a supercomputer.',
      on: (a) => { a.show('main'); a.ben(['bulk', 'stats']); },
    },
    {
      title: 'Microprocessors',
      text: `<p>A <strong>microprocessor</strong> is the device that controls what a computer does.</p>
             <p>It takes data as <strong>input</strong>, does something with it (<strong>process</strong>) and provides <strong>output</strong>.</p>
             <p>Microprocessors control washing machines, televisions and other household appliances.</p>`,
      tip: 'Try it: choose a programme and press Start. Watch input → process → output.',
      async on(a) { a.show('micro'); await a.wash(); },
    },
    {
      title: 'Microprocessors are everywhere',
      text: `<p>Most electrical appliances in your home contain at least one microprocessor, even if they do not look like computers.</p>`,
      tip: 'Try it: find all the objects with a microprocessor inside.',
      async on(a, ctx) { a.show('hunt'); if (!(await ctx.sleep(900))) return; a.reveal(2); },
    },
    {
      title: 'Devices in this lesson',
      text: `<p>You will look at personal computers, mobile phones and smartphones, tablets, digital cameras, home entertainment systems, games consoles, media players, navigation aids and smart homes.</p>
             <p>At the end you will see why devices are becoming <strong>multifunctional</strong>.</p>`,
      async on(a, ctx) { a.show('range'); await a.sweep(1, 4, ctx); },
    },
  ],
});

FD.activities({
  section: 'types',
  items: [
    {
      id: 'mainserver',
      title: 'Digital devices (1)',
      task: '<p>Research the difference between a <b>mainframe computer</b>, a <b>server</b> and a <b>supercomputer</b>.</p>',
      fields: ['Mainframe computer', 'Server', 'Supercomputer'],
      lines: 3,
      hint: 'The main difference between them is…',
    },
    {
      id: 'homemicro',
      title: 'Digital devices (2)',
      task: '<p>Create a list of the digital devices in <b>your home</b> that use microprocessors.</p>',
      sim: ['types', 'Find them at home (simulation)'],
      lines: 6,
      hint: 'Kitchen: … Living room: … Bedroom: …',
    },
  ],
});

FD.check({
  section: 'types',
  items: [
    { type: 'mcq', q: 'What is a mainframe computer?', opts: ['A large, powerful computer that can do complicated jobs quickly and be used by many people at the same time', 'A tiny chip that controls a washing machine', 'A laptop with a large screen', 'A computer used only for games'], why: 'Mainframes are used by large organisations.' },
    { type: 'mcq', q: 'A microprocessor…', opts: ['takes data as input, does something with it and provides output', 'is only found in mainframe computers', 'stores films and music', 'connects a phone to the mobile network'], why: 'It is the device that controls what a computer does.' },
    { type: 'multi', q: 'Which two tasks are typical of a mainframe computer?', need: 2, opts: [['Statistical analysis', true], ['Bulk data processing', true], ['Controlling a microwave oven', false], ['Taking photos', false]], why: 'Complex processing tasks for large organisations.' },
    {
      type: 'sort',
      q: 'Mainframe or microprocessor?',
      bins: ['Mainframe', 'Microprocessor'],
      rows: [['Processes the monthly statements of a large bank', 0], ['Controls the spin speed of a washing machine', 1], ['Is used by thousands of people at the same time', 0], ['Is built into a television', 1]],
      why: 'Mainframes are huge and shared; microprocessors are tiny and built into appliances.',
    },
    { type: 'tf', q: 'Only computers that look like a PC contain a microprocessor.', a: false, why: 'Washing machines, televisions, microwaves and cars contain microprocessors.' },
  ],
});
