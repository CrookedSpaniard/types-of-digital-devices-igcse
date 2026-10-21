FD.add({
  id: 'home',
  title: 'Home entertainment systems',
  tab: 'Home entertainment',
  icon: 'home',
  color: '--c5',
  section: true,
  interactive: true,
  vocab: [
    ['resolution', 'the number of pixels used by a screen to display an image'],
    ['stream', 'play a file on your computer while it is being downloaded from the internet, rather than saving it as a file and then playing it'],
    ['smart', 'the ability of a device to use data from sensors to perform a programmed action independently; smart devices are often also able to connect to the internet'],
    ['media player', 'an electronic device that can store and play digital music and videos and show digital photographs'],
    ['USB (Universal Serial Bus)', 'a standard for wired connectivity that can also supply electric power'],
    ['Bluetooth', 'wireless connectivity that allows devices to connect over short distances'],
    ['set-top box (STB)', 'a device that sends video and audio received from a broadcaster to a television'],
  ],
  mount(el) {
    // Figure 1.14 (largest first so smaller ones sit on top).
    const RES = [
      ['8k', '8K UHD', 7680, 4320, '#4dc0f0', 'Ultra High Definition'],
      ['4k', '4K DCI', 4096, 2160, '#e03131', 'Ultra High Definition'],
      ['2k', '2K DCI', 2048, 1080, '#f08c00', 'cinema'],
      ['1080', 'ATSC/DVB 1080p', 1920, 1080, '#fcc419', 'High Definition (HD)'],
      ['720', 'ATSC/DVB 720p', 1280, 720, '#2f9e44', 'High Definition (HD)'],
      ['pal', 'PAL', 720, 576, '#9c36b5', 'standard definition'],
      ['ntsc', 'NTSC', 720, 480, '#e64980', 'standard definition'],
    ];
    const SRC = [
      ['cd', '💿 CD', 'built-in CD player'], ['local', '💾 Local storage', 'built-in storage'],
      ['phone', '📱 Smartphone', 'Bluetooth'], ['mp', '🎵 Media player', 'USB cable'],
      ['tab', '📲 Tablet', 'Bluetooth'], ['net', '🏠 Local network', 'Wi-Fi'], ['web', '🌐 Music online', 'the internet'],
    ];
    const SHOWS = [['18:00', 'News at Six', 18], ['19:00', 'Nature: Life in the Ocean', 19], ['20:00', 'Football: Cup Final', 20], ['21:30', 'Film: Space Rescue', 21.5]];
    const PLAY = { dvd: { dvd: 'Standard definition film' }, bd: { dvd: 'DVD film', bd: 'HD film' }, uhd: { dvd: 'DVD film', bd: 'HD film', uhd: '4K film' } };
    el.innerHTML = `
      <div class="sim hm">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="res">📺 TV resolution</button><button data-p="snd">🔊 Sound systems</button><button data-p="pvr">⏺ PVR and set-top box</button><button data-p="disc">💿 Blu-ray and DVD</button>
        </div>

        <div data-panel="res" class="sim">
          <div class="hm-res">
            <div class="sim-box">
              <svg viewBox="0 0 480 270" id="fig" aria-label="Comparison chart of screen resolutions">${RES.map(([k, n, w, h, c]) => `<g class="hm-r" data-k="${k}"><rect x="0" y="${270 - h / 16}" width="${w / 16}" height="${h / 16}" fill="${c}"/></g>`).join('')}</svg>
            </div>
            <div class="hm-rside">
              <div class="seg" id="resSeg">${RES.slice().reverse().map(([k, n]) => `<button data-v="${k}">${n}</button>`).join('')}</div>
              <div class="hm-info" id="resInfo"></div>
            </div>
          </div>
          <div class="hm-close">
            <canvas id="near" width="200" height="140" aria-label="Close-up of the screen"></canvas>
            <div>
              <label class="rng"><span>How far you sit from the TV <output id="dO"></output></span><input type="range" id="dist" min="0.5" max="4" step="0.1" value="3"></label>
              <p class="small" id="dMsg"></p>
            </div>
          </div>
        </div>

        <div data-panel="snd" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 220" aria-label="Devices connected to a sound system">
              ${FD.dv.tv(20, 70).replace('translate(20 70)', 'translate(20 60) scale(1.6)')}
              <rect class="hm-tvspk" x="30" y="128" width="20" height="4"/><rect class="hm-tvspk" x="96" y="128" width="20" height="4"/>
              <g id="ext" class="hm-ext"><rect class="dv-body" x="150" y="80" width="34" height="80" rx="5"/><circle class="hm-cone" cx="167" cy="105" r="10"/><circle class="hm-cone" cx="167" cy="138" r="13"/>
                <rect class="dv-body" x="200" y="120" width="90" height="40" rx="5"/><text class="hm-amp" x="245" y="144" text-anchor="middle">AMP</text><path class="pc-cable" d="M122 120 C 135 125, 140 130, 150 128"/></g>
              <g id="srcs">${SRC.map(([k, n], i) => `<g class="hm-src" data-k="${k}" transform="translate(${318 + (i % 2) * 102} ${18 + Math.floor(i / 2) * 50})"><rect x="0" y="0" width="98" height="38" rx="8"/><text x="49" y="24" text-anchor="middle">${n}</text></g>`).join('')}</g>
              <path class="hm-link" id="link" d=""/><text class="hm-lt" id="lt" x="245" y="180" text-anchor="middle"></text>
              <g id="notes"></g>
            </svg>
          </div>
          <div class="ctrls">
            <label class="tgl"><input type="checkbox" id="extOn"> 🔊 Connect an external sound system</label>
            <div class="meter" style="flex:1;min-width:13rem"><span class="meter-l">Sound quality</span><span class="bar"><i id="sq"></i></span></div>
          </div>
          <p class="small" id="sMsg">Tap a source on the right to play music through the sound system.</p>
        </div>

        <div data-panel="pvr" class="sim" hidden>
          <div class="hm-pvr">
            <div>
              <p class="strong">📅 Tonight on TV <span class="pill" id="clock">17:30</span></p>
              <ul class="hm-epg" id="epg">${SHOWS.map(([t, n], i) => `<li data-i="${i}"><b>${t}</b><span>${n}</span><button class="mini-btn" data-rec="${i}">⏺ Record</button></li>`).join('')}</ul>
              <div class="ctrls"><button class="btn primary small-btn" id="night">▶ Fast-forward the evening</button></div>
            </div>
            <div>
              <div class="hm-chain"><span>📡 Broadcaster</span><i>→</i><span class="hm-box"><b>Set-top box</b><small>+ PVR</small></span><i>→</i><span>📺 TV</span></div>
              <p class="strong mt0">💾 Recordings (watch later)</p>
              <ul class="hm-recs" id="recs"><li class="muted">Nothing recorded yet.</li></ul>
              <div class="hm-smart"><b>📺 Smart TV</b><span>Apps can download and <b>stream</b> content from the internet.</span><button class="mini-btn" id="streamBtn">▶ Stream a film</button><span class="bar"><i id="buf"></i></span></div>
            </div>
          </div>
        </div>

        <div data-panel="disc" class="sim" hidden>
          <div class="hm-disc">
            <div class="seg" id="disc"><span class="seg-l">1 · Choose a disc</span><button data-v="dvd">💿 DVD</button><button data-v="bd">🔵 Blu-ray</button><button data-v="uhd">🟣 4K Ultra HD Blu-ray</button></div>
            <div class="seg" id="player"><span class="seg-l">2 · Choose a player</span><button data-v="dvd">DVD player</button><button data-v="bd">Blu-ray player</button><button data-v="uhd">4K Ultra HD Blu-ray player</button></div>
          </div>
          <div class="sim-box hm-tv" id="tvOut"><span id="tvIc">📺</span><b id="tvMsg">Choose a disc and a player</b></div>
          <div class="tbl-wrap"><table class="tbl hm-mx"><thead><tr><th>Player ↓ · Disc →</th><th>DVD</th><th>Blu-ray</th><th>4K UHD Blu-ray</th></tr></thead><tbody>
            ${[['dvd', 'DVD player'], ['bd', 'Blu-ray player'], ['uhd', '4K Ultra HD Blu-ray player']].map(([p, n]) => `<tr><th>${n}</th>${['dvd', 'bd', 'uhd'].map((d) => `<td data-c="${p}-${d}">?</td>`).join('')}</tr>`).join('')}</tbody></table></div>
        </div>
      </div>`;
    const root = el.querySelector('.hm'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- resolution ----
    let res = '1080';
    function setRes(k) {
      res = k;
      const [, n, w, h, , q] = RES.find((r) => r[0] === k);
      FD.segSet($('#resSeg'), k);
      root.querySelectorAll('.hm-r').forEach((g) => g.classList.toggle('on', g.dataset.k === k));
      const short = k === '720' ? '720p' : k === '1080' ? '1080p' : k === '4k' ? '4K' : k === '8k' ? '8K' : '';
      $('#resInfo').innerHTML = `<b>${n}</b><span class="hm-wh">${FD.fmt(w)} × ${FD.fmt(h)}</span><small>horizontal pixels × vertical pixels</small>
        <span><b>${(w * h / 1e6).toFixed(1)} million</b> pixels · ${q}</span>${short && /p$/.test(short) ? `<span class="pill">Often called “${short}”: only the vertical pixels</span>` : short ? `<span class="pill">Called “${short}”: about ${short === '4K' ? '4,000' : '8,000'} horizontal pixels</span>` : ''}`;
      near();
    }
    $('#resSeg').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) setRes(b.dataset.v); });
    function near() {
      const [, , , h] = RES.find((r) => r[0] === res), d = +$('#dist').value;
      const cv = $('#near'), c = cv.getContext('2d'), n = Math.max(6, Math.round(h / 40));
      const s = document.createElement('canvas'); s.width = n; s.height = Math.round(n * .7);
      const g = s.getContext('2d');
      g.fillStyle = '#1c7ed6'; g.fillRect(0, 0, s.width, s.height);
      g.fillStyle = '#ffd43b'; g.beginPath(); g.arc(s.width * .5, s.height * .5, s.height * .32, 0, 7); g.fill();
      g.fillStyle = '#212529'; g.beginPath(); g.arc(s.width * .42, s.height * .44, s.height * .05, 0, 7); g.arc(s.width * .58, s.height * .44, s.height * .05, 0, 7); g.fill();
      c.imageSmoothingEnabled = false; c.drawImage(s, 0, 0, cv.width, cv.height);
      const blur = Math.max(0, (d - .5) * 2.2 * (cv.width / n) / 10);
      cv.style.filter = `blur(${blur.toFixed(1)}px)`;
      $('#dO').textContent = d.toFixed(1) + ' m';
      const see = cv.width / n > d * 6;
      $('#dMsg').innerHTML = see ? '👀 You can see the individual pixels from here.' : '✓ From here the pixels are too small to tell apart.';
    }
    $('#dist').addEventListener('input', near);
    setRes('1080');

    // ---- sound ----
    const ext = () => $('#extOn').checked;
    let sndId = 0;
    function setExt(on) { $('#extOn').checked = on; $('#ext').classList.toggle('on', on); $('#sq').style.setProperty('--v', on ? '92%' : '30%'); if (!on) { $('#link').setAttribute('d', ''); $('#lt').textContent = ''; root.querySelectorAll('.hm-src').forEach((g) => g.classList.remove('on')); } $('#sMsg').innerHTML = on ? 'Loud, rich sound from high-quality speakers and an amplifier. Tap a source to play.' : 'The TV’s built-in speakers are small and of limited quality because the screen is very thin.'; }
    $('#extOn').addEventListener('change', () => setExt(ext()));
    async function play(k) {
      if (!ext()) setExt(true);
      const id = ++sndId, i = SRC.findIndex((s) => s[0] === k), [, n, via] = SRC[i];
      const x = 318 + (i % 2) * 102, y = 18 + Math.floor(i / 2) * 50 + 19;
      root.querySelectorAll('.hm-src').forEach((g) => g.classList.toggle('on', g.dataset.k === k));
      $('#link').setAttribute('d', `M${x} ${y} C ${x - 40} ${y}, 310 140, 290 140`);
      $('#link').classList.toggle('wl', !/cable|built-in/.test(via));
      const lt = $('#lt'); lt.setAttribute('x', 245); lt.setAttribute('y', 180); lt.textContent = 'via ' + via;
      $('#sMsg').innerHTML = `Now playing from <b>${n.slice(2)}</b> via <b>${via}</b>.`;
      const notes = $('#notes'); notes.innerHTML = '';
      for (let j = 0; j < 6; j++) {
        if (id !== sndId || dead) return;
        const t = FD.h(`<svg><text class="hm-note" x="${160 + j * 8}" y="70">${j % 2 ? '♪' : '♫'}</text></svg>`).firstElementChild;
        notes.appendChild(t);
        await FD.wait(250);
      }
    }
    $('#srcs').addEventListener('click', (e) => { const g = e.target.closest('.hm-src'); if (g) play(g.dataset.k); });
    setExt(false);

    // ---- PVR ----
    const rec = new Set();
    let pvrId = 0;
    function epg(now) {
      $('#clock').textContent = `${String(Math.floor(now)).padStart(2, '0')}:${now % 1 ? '30' : '00'}`;
      root.querySelectorAll('#epg li').forEach((li) => {
        const i = +li.dataset.i, start = SHOWS[i][2];
        li.classList.toggle('rec', rec.has(i)); li.classList.toggle('past', start + 1 <= now); li.classList.toggle('live', start <= now && now < start + 1);
        li.querySelector('button').textContent = rec.has(i) ? '⏺ Will record' : '⏺ Record';
      });
    }
    function recordings(now) {
      const done = [...rec].filter((i) => SHOWS[i][2] + 1 <= now);
      $('#recs').innerHTML = done.length ? done.map((i) => `<li><span>🎞️ ${SHOWS[i][1]}</span><button class="mini-btn" data-watch="${i}">▶ Watch now</button></li>`).join('') : '<li class="muted">Nothing recorded yet.</li>';
    }
    let now = 17.5;
    $('#epg').addEventListener('click', (e) => { const b = e.target.closest('[data-rec]'); if (!b) return; const i = +b.dataset.rec; if (SHOWS[i][2] + 1 <= now) return FD.shake(b); rec.has(i) ? rec.delete(i) : rec.add(i); epg(now); });
    $('#recs').addEventListener('click', (e) => { const b = e.target.closest('[data-watch]'); if (b) { b.textContent = '▶ Playing…'; FD.toast(root.querySelector('.hm-pvr'), `▶ Watching “${SHOWS[+b.dataset.watch][1]}” at a later time.`); } });
    async function night() {
      const id = ++pvrId; now = 17.5; epg(now); recordings(now);
      while (now < 23) { await FD.wait(700); if (id !== pvrId || dead) return; now += .5; epg(now); recordings(now); }
    }
    $('#night').addEventListener('click', night);
    let strId = 0;
    $('#streamBtn').addEventListener('click', async () => { const id = ++strId; await FD.tween(3000, (t) => { if (id === strId && !dead) $('#buf').style.setProperty('--v', t * 100 + '%'); }); });
    epg(now);

    // ---- discs ----
    let disc = null, player = null;
    const seen = new Set();
    function tryDisc() {
      FD.segSet($('#disc'), disc); FD.segSet($('#player'), player);
      if (!disc || !player) return;
      const ok = PLAY[player][disc], box = $('#tvOut');
      box.classList.toggle('ok', !!ok); box.classList.toggle('no', !ok);
      $('#tvIc').textContent = ok ? (disc === 'uhd' ? '🌟' : disc === 'bd' ? '🎬' : '📼') : '⛔';
      $('#tvMsg').textContent = ok ? `Playing: ${ok}` : 'Cannot play this disc';
      FD.pulse(box);
      seen.add(player + '-' + disc);
      seen.forEach((c) => { const [p, d] = c.split('-'), td = root.querySelector(`[data-c="${c}"]`); td.textContent = PLAY[p][d] ? '✓' : '✗'; td.className = PLAY[p][d] ? 'y' : 'n'; });
    }
    $('#disc').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { disc = b.dataset.v; tryDisc(); } });
    $('#player').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { player = b.dataset.v; tryDisc(); } });

    const show = FD.panels(root);
    show('res');
    return {
      show, setRes, setExt, play, night,
      dist(d) { $('#dist').value = d; near(); },
      async walkRes(list, ctx) { for (const k of list) { setRes(k); if (!(await ctx.sleep(1100))) return false; } return true; },
      rec(i) { rec.add(i); epg(now); },
      async stream(ctx) { $('#streamBtn').click(); await ctx.sleep(10); },
      async discs(pairs, ctx) { for (const [d, p] of pairs) { disc = d; player = p; tryDisc(); if (!(await ctx.sleep(1300))) return; } },
      destroy() { dead = true; sndId++; pvrId++; strId++; },
    };
  },
  steps: [
    {
      title: 'Televisions',
      text: `<p>Televisions display still and moving images on a screen.</p>
             <p>The quality of the image is set by the <strong>number of pixels</strong> used to display it. This is the screen’s <strong>resolution</strong>.</p>`,
      on: (a) => { a.show('res'); a.setRes('1080'); },
    },
    {
      title: 'High definition',
      text: `<p><strong>High definition (HD)</strong> television screens contain a larger number of pixels, which means they have a <strong>higher resolution</strong> than standard definition televisions.</p>`,
      async on(a, ctx) { a.show('res'); await a.walkRes(['ntsc', 'pal', '720', '1080'], ctx); },
    },
    {
      title: 'How resolution is stated',
      text: `<p>The resolution of a television is stated as <strong>horizontal pixels × vertical pixels</strong>.</p>
             <p>Manufacturers often refer only to the vertical pixels: <strong>1280 × 720</strong> is stated as <strong>720p</strong> and <strong>1920 × 1080</strong> as <strong>1080p</strong>.</p>`,
      async on(a, ctx) { a.show('res'); await a.walkRes(['720', '1080'], ctx); },
    },
    {
      title: 'Ultra High Definition: 4K and 8K',
      text: `<p><strong>Ultra High Definition (UHD)</strong> screens are sometimes called <strong>4K or 8K</strong> because they have a horizontal resolution of about <strong>4,000 or 8,000 pixels</strong>.</p>
             <p>8K screens make each pixel impossible to tell apart, even when users are close to the screen.</p>`,
      tip: 'Try it: choose a resolution and move closer to the TV. When can you see the pixels?',
      async on(a, ctx) { a.show('res'); a.dist(1); if (!(await a.walkRes(['720', '1080', '4k', '8k'], ctx))) return; },
    },
    {
      title: 'TV sound and smart TVs',
      text: `<p>Most televisions have built-in speakers, but these are often <strong>small and of limited quality</strong> because the screen is very thin. Most modern TVs can be connected to an <strong>external sound system</strong>.</p>
             <p><strong>Smart</strong> televisions use apps and can download and <strong>stream</strong> content from the internet.</p>`,
      async on(a, ctx) { a.show('snd'); a.setExt(false); if (!(await ctx.sleep(1500))) return; a.setExt(true); },
    },
    {
      title: 'Sound systems',
      text: `<p>Sound systems produce loud, rich sound using high-quality speakers and amplifiers. They can play music from <strong>CDs</strong> or <strong>local storage</strong>.</p>
             <p>They can connect to smartphones, <strong>media players</strong> and tablets using <strong>USB</strong> or <strong>Bluetooth</strong>, to a local network via <strong>Wi-Fi</strong>, and some to the internet to play music stored online.</p>`,
      tip: 'Try it: tap each source to see how it connects.',
      async on(a, ctx) { a.show('snd'); a.setExt(true); for (const k of ['cd', 'phone', 'mp', 'net', 'web']) { a.play(k); if (!(await ctx.sleep(1400))) return; } },
    },
    {
      title: 'Personal video recorders and set-top boxes',
      text: `<p>A <strong>personal video recorder (PVR)</strong> records broadcast content so that it can be <strong>watched at a later date</strong>.</p>
             <p>Some devices fall into multiple categories: some satellite TV devices contain both a <strong>set-top box (STB)</strong> and a PVR.</p>`,
      tip: 'Try it: choose programmes to record, then fast-forward the evening.',
      async on(a) { a.show('pvr'); a.rec(1); a.rec(2); await a.night(); },
    },
    {
      title: 'Blu-ray and DVD players',
      text: `<p>Blu-ray and DVD players connect to televisions to play films stored on DVD or Blu-ray disks.</p>
             <p><strong>Blu-ray players will usually play DVD disks, but DVD players will not play Blu-ray disks.</strong> Blu-ray disks can store HD movies; newer <strong>4K Ultra HD Blu-ray</strong> players can play 4K content.</p>`,
      tip: 'Try it: try every disc in every player and complete the table.',
      async on(a, ctx) { a.show('disc'); await a.discs([['dvd', 'bd'], ['bd', 'dvd'], ['bd', 'bd'], ['uhd', 'uhd']], ctx); },
    },
  ],
});

FD.activities({
  section: 'home',
  items: [
    {
      id: 'tvtypes',
      title: 'Types of television',
      task: `<ol><li>Research the cost of HD, 4K and 8K televisions.</li><li>Research the types of content that is broadcast or available to buy in each resolution. How easy would it be to <b>stream</b> content in each resolution?</li>
             <li>Estimate how far you sit from your television at home, then research how close a user must be to notice the quality of the three resolutions.</li><li>Is it worth paying the extra cost for 4K and 8K televisions? Is there any point in creating 16K screens for home use?</li></ol>`,
      sim: ['home', 'Try the TV resolution simulation'],
      fields: ['1. Cost of HD / 4K / 8K', '2. Content and streaming', '3. My distance and when I notice the quality'],
      lines: 4,
      hint: '4. My opinion about 4K, 8K and 16K…',
    },
  ],
});

FD.check({
  section: 'home',
  items: [
    { type: 'mcq', q: 'What does the resolution of a TV screen describe?', opts: ['The number of pixels used to display the image', 'The size of the speakers', 'The number of channels it can receive', 'How thin the screen is'], why: 'More pixels = higher resolution.' },
    { type: 'mcq', q: 'A TV is described as 1080p. What is its resolution?', opts: ['1920 × 1080', '1280 × 720', '1080 × 1080', '4096 × 2160'], why: 'Manufacturers often state only the vertical pixels.' },
    { type: 'mcq', q: 'Why are UHD screens called 4K or 8K?', opts: ['They have a horizontal resolution of about 4,000 or 8,000 pixels', 'They cost £4,000 or £8,000', 'They have 4 or 8 speakers', 'They weigh 4 or 8 kg'], why: 'For example 4096 × 2160 or 7680 × 4320.' },
    {
      type: 'sort',
      q: 'Which connection does each device use with the sound system?',
      bins: ['Bluetooth', 'USB', 'Wi-Fi'],
      rows: [['Wireless, over a short distance from a smartphone', 0], ['A cable that can also supply electric power', 1], ['Music stored on a computer on the local network', 2]],
      why: 'Bluetooth and Wi-Fi are wireless; USB is wired.',
    },
    { type: 'mcq', q: 'What does a personal video recorder (PVR) do?', opts: ['Records broadcast content so it can be watched later', 'Sends audio to a sound system', 'Plays Blu-ray disks', 'Streams music from the internet'], why: 'Some satellite devices contain both an STB and a PVR.' },
    { type: 'tf', q: 'A DVD player can play Blu-ray disks.', a: false, why: 'Blu-ray players usually play DVDs, but DVD players will not play Blu-ray disks.' },
  ],
});
