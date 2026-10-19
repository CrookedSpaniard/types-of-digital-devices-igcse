FD.add({
  id: 'cameras',
  title: 'Cameras and camcorders',
  tab: 'Cameras',
  icon: 'cameras',
  color: '--c6',
  section: true,
  interactive: true,
  vocab: [
    ['compensate', 'to reduce or correct a negative effect'],
    ['pixel', 'a small dot that helps to make up an image'],
    ['resolution', 'the number of pixels used by a screen to display an image'],
    ['pixelated', 'an effect that creates an unclear image consisting of large individual pixels that are visible to the human eye'],
  ],
  mount(el) {
    // Table 1.1: resolution → maximum display size before pixelation occurs.
    const T11 = [['1.3 megapixel (1.3 million pixels)', 1280, 960], ['2 megapixel', 1600, 1200], ['3 megapixel', 2048, 1536], ['4 megapixel', 2272, 1704], ['8 megapixel and above', 2560, 1920]];
    el.innerHTML = `
      <div class="sim cm">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="frames">🎞️ Frame rate</button><button data-p="parts">🔍 Lens, processor, sensor</button><button data-p="pix">🟪 Pixels</button>
        </div>

        <div data-panel="frames" class="sim">
          <div class="cm-two">
            <figure class="cm-fr"><canvas width="300" height="150" id="cvA"></canvas><figcaption><b id="fpsAL">6</b> frames per second</figcaption></figure>
            <figure class="cm-fr"><canvas width="300" height="150" id="cvB"></canvas><figcaption><b>24</b> frames per second</figcaption></figure>
          </div>
          <label class="rng"><span>Frame rate of the left film <output id="fpsO"></output></span><input type="range" id="fps" min="1" max="30" value="6"></label>
          <div class="sim-box"><svg viewBox="0 0 520 70" id="strip" aria-label="Frames in one second"></svg></div>
        </div>

        <div data-panel="parts" class="sim" hidden>
          <div class="sim-box">
            <svg viewBox="0 0 520 150" aria-label="Light passes through the lens to the sensor and the image processor">
              <text class="emo" x="40" y="70" font-size="40" id="sun">🌳</text>
              <g id="rays">${[-1, -.5, 0, .5, 1].map((k) => `<path class="cm-ray" d="M70 ${70 + k * 30} L180 ${70 + k * 8} L270 ${70 - k * 24}"/>`).join('')}</g>
              <ellipse class="cm-lens" id="lens" cx="180" cy="70" rx="10" ry="46"/><text class="svg-sm" x="180" y="138">lens</text>
              <rect class="cm-ap" id="apT" x="172" y="18" width="16" height="0"/><rect class="cm-ap" id="apB" x="172" y="122" width="16" height="0"/>
              <rect class="cm-sensor" x="268" y="36" width="14" height="68" rx="2"/><text class="svg-sm" x="275" y="138">sensor</text>
              <path class="cm-arrow" d="M290 70h40"/>
              <rect class="cm-proc" id="proc" x="334" y="46" width="60" height="48" rx="6"/><text class="cm-proct" x="364" y="74" text-anchor="middle">processor</text>
              <path class="cm-arrow" d="M398 70h30"/>
            </svg>
            <canvas class="cm-photo" id="photo" width="160" height="120" aria-label="The photo taken"></canvas>
          </div>
          <div class="cm-ctrls">
            <label class="rng"><span>Light in the scene <output id="litO"></output></span><input type="range" id="lit" min="10" max="100" value="80"></label>
            <label class="rng"><span>Lens opening (how much light gets through) <output id="apO"></output></span><input type="range" id="ap" min="20" max="100" value="60"></label>
            <div class="seg" id="lq"><span class="seg-l">Lens quality</span><button data-v="good">✓ Good lens</button><button data-v="poor">✗ Poor lens (defects)</button></div>
            <label class="tgl"><input type="checkbox" id="pr" checked> 🧠 Good image processor: compensate for poor lighting</label>
          </div>
        </div>

        <div data-panel="pix" class="sim" hidden>
          <div class="cm-pix">
            <canvas class="cm-view" id="view" width="480" height="360" aria-label="The photo, enlarged"></canvas>
            <div class="cm-side">
              <div class="tbl-wrap"><table class="tbl cm-t11"><thead><tr><th>Resolution (number of pixels)</th><th>Maximum display size before pixelation</th></tr></thead>
                <tbody>${T11.map(([n, w, h], i) => `<tr data-i="${i}" tabindex="0"><td>${n}</td><td>${w} × ${h}</td></tr>`).join('')}</tbody></table></div>
              <p class="small muted">Table 1.1 · tap a row to choose the camera sensor.</p>
              <label class="rng"><span>Enlarge the photo <output id="zO"></output></span><input type="range" id="z" min="1" max="8" step=".1" value="1"></label>
              <p class="cm-msg" id="pixMsg"></p>
            </div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.cm'), $ = (s) => root.querySelector(s);
    let dead = false, raf = 0;

    // ---- the picture used by the camera (drawn, not a photo) ----
    function scene(c, w, h) {
      const s = w / 640;
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#7cc3ef'); g.addColorStop(1, '#f2a3b6');
      c.fillStyle = g; c.fillRect(0, 0, w, h);
      c.fillStyle = '#3d8b40'; c.beginPath(); c.ellipse(420 * s, 420 * s, 50 * s, 140 * s, -.5, 0, 7); c.fill();
      c.fillStyle = '#2f7a33'; c.fillRect(392 * s, 300 * s, 10 * s, 190 * s);
      for (let k = 0; k < 10; k++) { const a = (k / 10) * Math.PI * 2; c.fillStyle = k % 2 ? '#e64980' : '#f06595'; c.beginPath(); c.ellipse((400 + Math.cos(a) * 40) * s, (300 + Math.sin(a) * 28) * s, 30 * s, 14 * s, a, 0, 7); c.fill(); }
      c.fillStyle = '#fcc419'; c.beginPath(); c.arc(400 * s, 300 * s, 22 * s, 0, 7); c.fill();
      const wing = (sx) => {
        c.fillStyle = '#f08c00'; c.beginPath(); c.moveTo(250 * s, 200 * s); c.bezierCurveTo((250 + sx * 40) * s, 40 * s, (250 + sx * 210) * s, 60 * s, (250 + sx * 170) * s, 190 * s); c.closePath(); c.fill();
        c.beginPath(); c.moveTo(250 * s, 205 * s); c.bezierCurveTo((250 + sx * 150) * s, 210 * s, (250 + sx * 150) * s, 330 * s, (250 + sx * 50) * s, 300 * s); c.closePath(); c.fill();
        c.strokeStyle = '#1b1b1b'; c.lineWidth = 6 * s; c.stroke();
        c.fillStyle = '#fff'; for (let k = 0; k < 5; k++) { c.beginPath(); c.arc((250 + sx * (60 + k * 25)) * s, (80 + k * 22) * s, 5 * s, 0, 7); c.fill(); }
      };
      wing(-1); wing(1);
      c.fillStyle = '#1b1b1b'; c.beginPath(); c.ellipse(250 * s, 220 * s, 10 * s, 70 * s, 0, 0, 7); c.fill();
    }

    // ---- frames ----
    let fpsA = 6;
    function ball(cv, fps, t) {
      const c = cv.getContext('2d'), W = cv.width, H = cv.height;
      const tq = Math.floor(t * fps) / fps;
      const x = 20 + ((tq * 120) % (W - 40)), y = H - 20 - Math.abs(Math.sin(tq * 3.2)) * (H - 50);
      c.fillStyle = getComputedStyle(root).getPropertyValue('--surface-2') || '#eee'; c.fillRect(0, 0, W, H);
      c.fillStyle = '#868e96'; c.fillRect(0, H - 8, W, 8);
      c.fillStyle = '#e8590c'; c.beginPath(); c.arc(x, y, 14, 0, 7); c.fill();
    }
    const t0 = performance.now();
    function loop(now) {
      if (dead) return;
      const t = ((now - t0) / 1000) * FD.speed;
      if (root.dataset.panel === 'frames') { ball($('#cvA'), fpsA, t); ball($('#cvB'), 24, t); }
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);
    function strip() {
      const row = (y, n, lbl) => `<text class="svg-sm" x="4" y="${y - 3}" text-anchor="start">${lbl}</text><rect class="cm-film" x="0" y="${y}" width="520" height="20"/>${Array.from({ length: n }, (_, i) => `<rect class="cm-frame" x="${3 + i * (514 / n)}" y="${y + 4}" width="${Math.max(2, 514 / n - 4)}" height="12"/>`).join('')}`;
      $('#strip').innerHTML = row(12, fpsA, `${fpsA} frames per second`) + row(46, 24, '24 frames per second · 1 second →');
    }
    function setFps(v) { fpsA = v; $('#fps').value = v; $('#fpsO').textContent = v + ' fps'; $('#fpsAL').textContent = v; strip(); }
    $('#fps').addEventListener('input', (e) => setFps(+e.target.value));
    setFps(6);

    // ---- lens, processor, sensor ----
    const off = document.createElement('canvas'); off.width = 160; off.height = 120; scene(off.getContext('2d'), 160, 120);
    let lq = 'good';
    function photo() {
      const lit = +$('#lit').value, ap = +$('#ap').value, pr = $('#pr').checked;
      $('#litO').textContent = lit < 35 ? 'dark' : lit < 70 ? 'dim' : 'bright';
      $('#apO').textContent = ap < 45 ? 'small' : ap < 80 ? 'medium' : 'wide';
      const gap = 46 - (ap / 100) * 46;
      $('#apT').setAttribute('height', gap); $('#apB').setAttribute('y', 122 - gap); $('#apB').setAttribute('height', gap);
      root.querySelectorAll('.cm-ray').forEach((r) => { r.style.opacity = (lit / 100) * (ap / 100) + .1; });
      $('#lens').classList.toggle('poor', lq === 'poor');
      $('#proc').classList.toggle('on', pr);
      let b = (lit / 100) * (ap / 70);
      const boost = pr && b < .9 ? Math.min(.9 / b, 2.2) : 1;
      b *= boost;
      const c = $('#photo').getContext('2d');
      c.clearRect(0, 0, 160, 120);
      c.drawImage(off, 0, 0);
      $('#photo').style.filter = `brightness(${Math.min(1.6, b).toFixed(2)})${lq === 'poor' ? ' blur(2.2px) saturate(.6)' : ''}`;
      if (boost > 1.3) { c.fillStyle = 'rgb(128 128 128 / .18)'; for (let i = 0; i < 500; i++) c.fillRect(Math.random() * 160, Math.random() * 120, 1.4, 1.4); }
      FD.segSet($('#lq'), lq);
    }
    ['#lit', '#ap', '#pr'].forEach((s) => $(s).addEventListener('input', photo));
    $('#lq').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { lq = b.dataset.v; photo(); } });
    photo();

    // ---- pixels ----
    let row = 0, zoom = 1;
    const src = document.createElement('canvas');
    function render() {
      const [, w, h] = T11[row], sw = Math.round(w / 12), sh = Math.round(h / 12);
      src.width = sw; src.height = sh; scene(src.getContext('2d'), sw, sh);
      const v = $('#view'), c = v.getContext('2d');
      c.imageSmoothingEnabled = false;
      const cw = sw / zoom, ch = sh / zoom, cx = sw * .625 - cw / 2, cy = sh * .62 - ch / 2;
      c.drawImage(src, FD.clamp(cx, 0, sw - cw), FD.clamp(cy, 0, sh - ch), cw, ch, 0, 0, v.width, v.height);
      root.querySelectorAll('.cm-t11 tbody tr').forEach((r) => r.classList.toggle('on', +r.dataset.i === row));
      $('#zO').textContent = zoom.toFixed(1) + '×';
      const per = v.width / cw;
      const px = per > 4.5;
      v.classList.toggle('px', px);
      $('#pixMsg').innerHTML = `${T11[row][0].split(' (')[0]}: <b>${FD.fmt(w)} × ${FD.fmt(h)}</b> = ${(w * h / 1e6).toFixed(1)} million pixels.<br>${px ? '⚠️ <b>Pixelated</b>: the pixels are now big enough to see.' : '✓ Still sharp at this size.'}`;
    }
    root.querySelector('.cm-t11 tbody').addEventListener('click', (e) => { const r = e.target.closest('tr'); if (r) { row = +r.dataset.i; render(); } });
    root.querySelector('.cm-t11 tbody').addEventListener('keydown', (e) => { const r = e.target.closest('tr'); if (r && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); row = +r.dataset.i; render(); } });
    $('#z').addEventListener('input', (e) => { zoom = +e.target.value; render(); });
    render();

    const show = FD.panels(root);
    show('frames');
    return {
      show, setFps,
      set(o) { if (o.lit != null) $('#lit').value = o.lit; if (o.ap != null) $('#ap').value = o.ap; if (o.lq) lq = o.lq; if (o.pr != null) $('#pr').checked = o.pr; photo(); },
      async slideAp(from, to, ctx) { for (let i = 0; i <= 10; i++) { $('#ap').value = from + ((to - from) * i) / 10; photo(); if (!(await ctx.sleep(120))) return false; } return true; },
      pix(r, z) { row = r; zoom = z; $('#z').value = z; render(); },
      async zoomTo(z, ctx) { const z0 = zoom; for (let i = 1; i <= 16; i++) { zoom = z0 + ((z - z0) * i) / 16; $('#z').value = zoom; render(); if (!(await ctx.sleep(90))) return false; } return true; },
      destroy() { dead = true; cancelAnimationFrame(raf); },
    };
  },
  steps: [
    {
      title: 'Cameras and camcorders',
      text: `<p>Digital cameras and camcorders use <strong>light sensors</strong> to capture images formed by light passing through the device’s <strong>lens</strong>.</p>`,
      on: (a) => { a.show('parts'); a.set({ lit: 80, ap: 60, lq: 'good', pr: true }); },
    },
    {
      title: 'Still images and moving images',
      text: `<p>Traditionally, <strong>cameras</strong> are used to capture <strong>still images</strong> and <strong>camcorders</strong> are used to capture <strong>moving images</strong>.</p>
             <p>However, most digital cameras can now film moving images and most camcorders can photograph still images.</p>`,
      on: (a) => { a.show('frames'); a.setFps(1); },
    },
    {
      title: 'Movies are made of frames',
      text: `<p>Moving images (movies) are simply a sequence of images called <strong>frames</strong>.</p>
             <p>High frame rates produce <strong>smooth</strong> results, whereas low frame rates can produce results that appear to <strong>stutter or jump</strong>.</p>`,
      tip: 'Try it: change the frame rate of the left film and compare it with 24 frames per second.',
      async on(a, ctx) { a.show('frames'); for (const f of [2, 6, 12, 24]) { a.setFps(f); if (!(await ctx.sleep(1500))) return; } a.setFps(6); },
    },
    {
      title: 'What makes a good image?',
      text: `<p>The quality of the image captured by the camera depends on the quality of:</p>
             <ul><li>the <strong>lens</strong></li><li>the <strong>image processor</strong></li><li>the <strong>resolution of the sensor</strong>.</li></ul>`,
      on: (a) => { a.show('parts'); a.set({ lit: 80, ap: 60, lq: 'good', pr: true }); },
    },
    {
      title: 'A good lens',
      text: `<p>A good lens allows light to travel through it <strong>without introducing any defects</strong>.</p>
             <p>It also allows the user to choose <strong>how much light</strong> can travel through it, which affects the final image.</p>`,
      tip: 'Try it: change the lens opening and switch to a poor lens.',
      async on(a, ctx) { a.show('parts'); a.set({ lit: 80, lq: 'good', pr: false }); if (!(await a.slideAp(30, 90, ctx))) return; if (!(await ctx.sleep(700))) return; a.set({ ap: 60, lq: 'poor' }); if (!(await ctx.sleep(1500))) return; a.set({ lq: 'good' }); },
    },
    {
      title: 'A good image processor',
      text: `<p>A good image processor can <strong>compensate</strong> for poor lighting conditions.</p>
             <p>To compensate means to reduce or correct a negative effect.</p>`,
      tip: 'Try it: make the scene dark, then switch the processor on and off.',
      async on(a, ctx) { a.show('parts'); a.set({ lit: 25, ap: 60, lq: 'good', pr: false }); if (!(await ctx.sleep(1500))) return; a.set({ pr: true }); },
    },
    {
      title: 'Pixels and sensor resolution',
      text: `<p>Digital images are made up of small dots called <strong>pixels</strong>.</p>
             <p>Better-quality sensors can capture more detail and produce images with a greater number of pixels. The <strong>sensor resolution</strong> of a camera is expressed as the number of pixels that can be captured (Table 1.1).</p>`,
      tip: 'Try it: choose a row of the table and enlarge the photo.',
      async on(a, ctx) { a.show('pix'); a.pix(4, 1); if (!(await ctx.sleep(800))) return; await a.zoomTo(3, ctx); },
    },
    {
      title: 'Pixelation',
      text: `<p>When an image is enlarged too much it becomes <strong>pixelated</strong>: unclear, with large individual pixels visible to the human eye (Figure 1.13).</p>
             <p>Some cameras use <strong>more than one sensor</strong>, each dedicated to a different colour or wavelength of light.</p>`,
      async on(a, ctx) { a.show('pix'); a.pix(0, 1); if (!(await ctx.sleep(600))) return; await a.zoomTo(6, ctx); },
    },
  ],
});

FD.check({
  section: 'cameras',
  items: [
    { type: 'mcq', q: 'What do digital cameras use to capture images?', opts: ['Light sensors', 'Microphones', 'Magnetic strips', 'Touch screens'], why: 'The image is formed by light passing through the lens.' },
    { type: 'mcq', q: 'Why does a film at 6 frames per second look jumpy?', opts: ['There are too few frames each second, so the movement stutters', 'The camera has a poor lens', 'The image processor is switched off', 'The sensor has too many pixels'], why: 'High frame rates produce smooth results (Figure 1.12).' },
    { type: 'multi', q: 'The quality of the image depends on which three things?', need: 3, opts: [['The quality of the lens', true], ['The image processor', true], ['The resolution of the sensor', true], ['The size of the memory card', false], ['The colour of the camera', false]], why: 'Lens, processor and sensor resolution.' },
    { type: 'mcq', q: 'A photo is taken in a dark room. Which part can compensate for the poor lighting?', opts: ['A good image processor', 'A bigger screen', 'A SIM card', 'A tripod'], why: 'To compensate means to reduce or correct a negative effect.' },
    { type: 'mcq', q: 'According to Table 1.1, what is the maximum display size of an image from a 2 megapixel camera before pixelation?', opts: ['1600 × 1200', '1280 × 960', '2048 × 1536', '2560 × 1920'], why: '1600 × 1200 ≈ 1.9 million pixels.' },
    { type: 'tf', q: 'An image becomes pixelated when it is enlarged so much that the individual pixels are visible.', a: true, why: 'Figure 1.13: the leaf area becomes pixelated when enlarged.' },
  ],
});
