FD.add({
  id: 'phones',
  title: 'Mobile phones and smartphones',
  tab: 'Phones',
  icon: 'phones',
  color: '--c3',
  section: true,
  interactive: true,
  vocab: [
    ['SIM', 'subscriber identity module: a card used to identify the subscriber to a mobile phone network'],
    ['user', 'the person who uses a computer system'],
    ['accessibility', 'a measure of how easy something is to use, especially by people with disabilities'],
    ['Wi-Fi (wireless fidelity)', 'a way of connecting computers or other electronic machines to a network or the internet by using radio signals rather than wires'],
    ['application', 'a program that allows a user to perform a task; applications are often called apps'],
    ['virtual keyboard', 'a keyboard displayed on and used via a touch screen'],
  ],
  mount(el) {
    const CONTACTS = [['👩', 'Mum'], ['👨', 'Dad'], ['👵', 'Neighbour'], ['🧑‍⚕️', 'Carer']];
    const APPS = { ent: [['🎵', 'Music'], ['🎬', 'Films'], ['🎮', 'Games']], edu: [['📖', 'Dictionary'], ['🧮', 'Maths'], ['🌍', 'Languages']], bus: [['📧', 'Email'], ['📊', 'Sheets'], ['📅', 'Calendar']] };
    const DRAIN = [['scr', '☀️ Bright screen on', 9], ['gps', '🧭 GPS navigation', 7], ['game', '🎮 3D game', 12], ['video', '🎬 Streaming video', 8], ['wifi', '📶 Wi-Fi + mobile data', 4]];
    el.innerHTML = `
      <div class="sim ph">
        <div class="ptabs" role="group" aria-label="Simulations">
          <button data-p="sim">📶 SIM card</button><button data-p="sos">🆘 Emergency button</button><button data-p="acc">🔊 Accessibility</button><button data-p="smart">📱 Smartphone</button>
        </div>

        <div data-panel="sim" class="sim">
          <div class="sim-box">
            <svg viewBox="0 0 520 230" aria-label="A SIM card identifies the phone to the mobile network">
              <g transform="translate(40 20)">
                <rect class="dv-body" x="0" y="0" width="100" height="190" rx="14"/><rect class="ph-scr" x="8" y="18" width="84" height="150" rx="4"/>
                <text class="ph-st" id="simSt" x="50" y="34" text-anchor="middle">No SIM</text>
                <g id="bars">${[0, 1, 2, 3].map((i) => `<rect class="ph-bar" data-b="${i}" x="${30 + i * 11}" y="${80 - i * 8}" width="8" height="${12 + i * 8}" rx="1"/>`).join('')}</g>
                <text class="ph-big" id="simBig" x="50" y="130" text-anchor="middle">📵</text>
                <rect class="ph-slot" x="100" y="120" width="6" height="34" rx="2"/>
              </g>
              <g id="simCard" class="ph-sim"><path d="M0 0h40l10 10v30H0z"/><rect x="10" y="10" width="22" height="18" rx="2" class="ph-chip"/></g>
              <g transform="translate(420 30)"><path class="ph-mast" d="M30 0L10 170h40z"/><path class="ph-mast-x" d="M18 110l24-30M42 110L18 80M22 60l16-20M38 60L22 40"/><path class="dv-arc" d="M-4 0a34 34 0 0 1 68 0M6 4a24 24 0 0 1 48 0" transform="translate(0 -6)"/><text class="svg-sm" x="30" y="190">mobile network</text></g>
              <path class="ph-wave" id="wave" d="M160 110 C 260 60, 330 60, 430 60"/>
              <g id="msg" class="ph-msg"><rect x="200" y="120" width="200" height="56" rx="10"/><text id="msgT" x="300" y="152" text-anchor="middle"></text></g>
            </svg>
          </div>
          <div class="ctrls"><button class="btn primary small-btn" id="simGo">💳 Insert the SIM card</button><span class="small">SIM = <b>s</b>ubscriber <b>i</b>dentity <b>m</b>odule</span></div>
        </div>

        <div data-panel="sos" class="sim" hidden>
          <div class="ph-sos">
            <div class="ph-phone">
              <div class="ph-dial" id="sosScr"><b>Emergency contacts</b><span>Press the red button</span></div>
              <button class="ph-sosbtn" id="sosGo" aria-label="Emergency button">SOS</button>
            </div>
            <ol class="ph-list" id="sosList">${CONTACTS.map(([e, n], i) => `<li data-i="${i}"><span>${e}</span><b>${n}</b><small>waiting</small></li>`).join('')}</ol>
          </div>
          <p class="small">The phone calls each person on the list <b>in order</b> until <b>someone answers</b>.</p>
        </div>

        <div data-panel="acc" class="sim" hidden>
          <div class="ph-acc">
            <div class="ph-talk" id="talk">
              <div class="ph-tscr" id="tScr">Ready</div>
              <div class="ph-keys">${['1', '2', '3', '4', '5', '6', '7', '8', '9', '✱', '0', '#'].map((k) => `<button data-k="${k}">${k}</button>`).join('')}</div>
              <div class="ph-call"><button data-k="call" class="g">📞</button><button data-k="Mum">👩 Mum</button><button data-k="end" class="r">✖</button></div>
            </div>
            <div class="ph-opts">
              <label class="tgl"><input type="checkbox" id="speak" checked> 🔊 Speak every key and function aloud</label>
              <label class="rng"><span>On-screen text size <output id="szO"></output></span><input type="range" id="sz" min="1" max="3" step="1" value="2"></label>
              <div class="seg" id="col"><span class="seg-l">Colours</span><button data-v="std">Standard</button><button data-v="hc">Yellow on black</button><button data-v="inv">White on blue</button></div>
              <div class="cards3">
                <div class="mini"><h5>👆 Tactile keypad</h5><p>Fewer, larger buttons that you can feel.</p></div>
                <div class="mini"><h5>🦻 Hearing aids</h5><p>Connections for hearing aids.</p></div>
              </div>
              <p class="small muted" id="voiceMsg"></p>
            </div>
          </div>
        </div>

        <div data-panel="smart" class="sim" hidden>
          <div class="ph-smart">
            <div class="ph-sp">
              <div class="ph-status"><span>📶 4G</span><span id="wifiS">📶 Wi-Fi</span><span id="batS">🔋 100%</span></div>
              <div class="ph-home" id="home">
                ${[['📞', 'Phone'], ['💬', 'Messages'], ['🌐', 'Internet'], ['📷', 'Camera'], ['🎵', 'Media player'], ['🎮', 'Games']].map(([e, n]) => `<span class="ph-app"><i>${e}</i><small>${n}</small></span>`).join('')}
              </div>
              <div class="ph-msgbox"><span id="typed"></span><i>|</i></div>
              <div class="ph-vk" id="vk">${['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((r) => `<div>${r.split('').map((c) => `<button data-c="${c}">${c}</button>`).join('')}</div>`).join('')}<div><button data-c=" " class="sp">space</button><button data-c="⌫">⌫</button></div></div>
            </div>
            <div class="ph-side">
              <div class="seg" id="store"><span class="seg-l">App store: download apps</span><button data-v="ent">🎵 Entertainment</button><button data-v="edu">📖 Educational</button><button data-v="bus">💼 Business</button></div>
              <p class="strong">🔋 Battery life (illustration)</p>
              <div class="seg" id="drain"><span class="seg-l">Smartphone: switch features on</span>${DRAIN.map(([k, n]) => `<button data-v="${k}">${n}</button>`).join('')}</div>
              <div class="ph-batt">
                <div class="meter"><span class="meter-l">📱 Basic phone</span><span class="bar"><i style="--v:100%"></i></span></div><p class="small">About <b>a week</b> between charges</p>
                <div class="meter"><span class="meter-l">📱 Smartphone</span><span class="bar"><i id="spBat"></i></span></div><p class="small" id="spTxt"></p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    const root = el.querySelector('.ph'), $ = (s) => root.querySelector(s);
    let dead = false;

    // ---- SIM card ----
    let simId = 0, simIn = false;
    const SIM_OUT = 'translate(250px, 160px)', SIM_IN = 'translate(142px, 142px) rotate(90deg) scale(.6)';
    function simReset() {
      simId++; simIn = false;
      $('#simCard').style.transform = SIM_OUT;
      $('#simSt').textContent = 'No SIM'; $('#simBig').textContent = '📵';
      root.querySelectorAll('.ph-bar').forEach((b) => b.classList.remove('on'));
      $('#wave').classList.remove('on'); $('#msg').classList.remove('on');
      $('#simGo').textContent = '💳 Insert the SIM card';
    }
    const say = (t) => { $('#msgT').textContent = t; $('#msg').classList.add('on'); FD.pulse($('#msg')); };
    async function simInsert() {
      const id = ++simId, ok = () => id === simId && !dead;
      simIn = true; $('#simGo').textContent = '⏏ Remove the SIM card';
      $('#simCard').style.transform = SIM_IN;
      await FD.wait(1000); if (!ok()) return;
      $('#simSt').textContent = 'Searching…'; $('#simBig').textContent = '🔎';
      $('#wave').classList.add('on');
      say('📱 → 📡 “Who is this?”'); await FD.wait(1400); if (!ok()) return;
      say('SIM: subscriber 214-07-55501'); await FD.wait(1400); if (!ok()) return;
      say('📡 ✓ Subscriber identified'); await FD.wait(1000); if (!ok()) return;
      for (let i = 0; i < 4; i++) { root.querySelector(`.ph-bar[data-b="${i}"]`).classList.add('on'); await FD.wait(200); if (!ok()) return; }
      $('#simSt').textContent = 'MobiNet 4G'; $('#simBig').textContent = '✅';
      say('Connected: you can make calls');
    }
    $('#simGo').addEventListener('click', () => (simIn ? simReset() : simInsert()));
    simReset();

    // ---- emergency button ----
    let sosId = 0;
    function sosReset() { sosId++; root.querySelectorAll('#sosList li').forEach((li) => { li.className = ''; li.querySelector('small').textContent = 'waiting'; }); $('#sosScr').innerHTML = '<b>Emergency contacts</b><span>Press the red button</span>'; }
    async function sos(answer) {
      sosReset();
      const id = sosId, who = answer ?? 1 + Math.floor(Math.random() * 3), ok = () => id === sosId && !dead;
      for (let i = 0; i < CONTACTS.length; i++) {
        const li = root.querySelector(`#sosList li[data-i="${i}"]`);
        li.className = 'ring'; li.querySelector('small').textContent = 'ringing…';
        $('#sosScr').innerHTML = `<b>Calling ${CONTACTS[i][1]}…</b><span>${CONTACTS[i][0]} 📞</span>`;
        await FD.wait(1500); if (!ok()) return;
        if (i === who) { li.className = 'yes'; li.querySelector('small').textContent = 'answered ✓'; $('#sosScr').innerHTML = `<b>${CONTACTS[i][1]} answered</b><span>“I’m on my way!”</span>`; return; }
        li.className = 'no'; li.querySelector('small').textContent = 'no answer';
      }
    }
    $('#sosGo').addEventListener('click', () => sos());

    // ---- accessibility ----
    const synth = window.speechSynthesis;
    $('#voiceMsg').textContent = synth ? 'The voice uses your browser’s speech. Turn the sound up.' : 'Your browser cannot speak, so the words appear on the screen only.';
    function speak(t) {
      $('#tScr').textContent = t; FD.pulse($('#tScr'));
      if (!synth || !$('#speak').checked) return;
      try { synth.cancel(); const u = new SpeechSynthesisUtterance(t); u.lang = 'en-GB'; u.rate = 1; synth.speak(u); } catch (e) { /* ignore */ }
    }
    root.querySelector('#talk').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-k]'); if (!b) return;
      const k = b.dataset.k;
      speak(k === 'call' ? 'Call' : k === 'end' ? 'End call' : k === 'Mum' ? 'Contact: Mum. Press call to ring.' : k === '✱' ? 'Star' : k === '#' ? 'Hash' : k);
    });
    const SZ = ['Large', 'Larger', 'Largest'];
    const setSz = (v) => { $('#sz').value = v; $('#szO').textContent = SZ[v - 1]; $('#talk').style.setProperty('--fs', [1, 1.3, 1.7][v - 1] + 'rem'); };
    $('#sz').addEventListener('input', (e) => setSz(+e.target.value));
    const setCol = (v) => { FD.segSet($('#col'), v); $('#talk').dataset.col = v; };
    $('#col').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) setCol(b.dataset.v); });
    setSz(2); setCol('std');

    // ---- smartphone ----
    $('#store').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-v]'); if (!b || b.disabled) return;
      b.disabled = true; b.classList.add('on');
      APPS[b.dataset.v].forEach(([ic, n], i) => setTimeout(() => {
        if (dead) return;
        const a = FD.h(`<span class="ph-app new"><i>${ic}</i><small>${n}</small></span>`);
        $('#home').appendChild(a);
      }, FD.dur(250 * i)));
    });
    $('#vk').addEventListener('click', (e) => {
      const b = e.target.closest('button[data-c]'); if (!b) return;
      const t = $('#typed');
      t.textContent = b.dataset.c === '⌫' ? t.textContent.slice(0, -1) : (t.textContent + b.dataset.c).slice(-26);
      FD.pulse(b);
    });
    const on = new Set();
    function battery() {
      const use = DRAIN.reduce((n, [k, , w]) => n + (on.has(k) ? w : 0), 2);
      const hours = Math.round(60 / use);
      $('#spBat').style.setProperty('--v', Math.max(6, Math.min(100, hours / 1.68)) + '%');
      $('#spTxt').innerHTML = `About <b>${hours >= 24 ? Math.round(hours / 24) + ' day' + (hours >= 48 ? 's' : '') : hours + ' hours'}</b> between charges`;
      $('#batS').textContent = '🔋 ' + (on.size ? Math.max(5, 100 - on.size * 17) : 100) + '%';
      root.querySelectorAll('#drain button').forEach((b) => b.classList.toggle('on', on.has(b.dataset.v)));
    }
    $('#drain').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (!b) return; on.has(b.dataset.v) ? on.delete(b.dataset.v) : on.add(b.dataset.v); battery(); });
    battery();

    const show = FD.panels(root);
    show('sim');
    return {
      show, simReset, simInsert, sos, sosReset, speak, setSz, setCol,
      async typeMsg(txt, ctx) { $('#typed').textContent = ''; for (const c of txt) { const b = root.querySelector(`#vk button[data-c="${c}"]`); if (b) b.click(); if (!(await ctx.sleep(160))) return; } },
      async drainAll(ctx) { on.clear(); battery(); for (const [k] of DRAIN) { on.add(k); battery(); if (!(await ctx.sleep(600))) return; } },
      download(k) { const b = root.querySelector(`#store button[data-v="${k}"]`); if (b && !b.disabled) b.click(); },
      destroy() { dead = true; simId++; sosId++; if (synth) try { synth.cancel(); } catch (e) { /* ignore */ } },
    };
  },
  steps: [
    {
      title: 'Mobile phones and SIM cards',
      text: `<p>Mobile phones use a <strong>SIM card</strong> to connect to a mobile phone network.</p>
             <p>SIM stands for <strong>subscriber identity module</strong>. A SIM card is used to <strong>identify the subscriber</strong> to a mobile phone network.</p>`,
      tip: 'Try it: insert and remove the SIM card.',
      async on(a) { a.show('sim'); a.simReset(); await a.simInsert(); },
    },
    {
      title: 'Specialist phones',
      text: `<p>Some mobile phones have <strong>specialist features</strong> to provide <strong>users</strong> with functions that meet particular user needs.</p>
             <p>A user is the person who uses a computer system.</p>`,
      on: (a) => { a.show('sos'); a.sosReset(); },
    },
    {
      title: 'The emergency button',
      text: `<p>Some phones have an <strong>emergency button</strong> that is linked to a list of emergency contacts.</p>
             <p>When the button is pressed, the phone <strong>calls each person on the list until someone answers</strong>.</p>`,
      tip: 'Activity: which groups of people could need a phone with an emergency button?',
      async on(a) { a.show('sos'); await a.sos(2); },
    },
    {
      title: 'Accessibility: the talking phone',
      text: `<p>Other phones meet users’ <strong>accessibility</strong> needs.</p>
             <p>The <strong>Alto 2 ‘talking phone’</strong> is a specialist mobile phone for blind and partially sighted people. It meets their needs because <strong>every feature and function is spoken aloud</strong>, such as the names of contacts and text messages.</p>`,
      tip: 'Try it: press the keys. Turn the speech on or off.',
      async on(a, ctx) { a.show('acc'); for (const k of ['Contact: Mum. Press call to ring.', 'Call']) { a.speak(k); if (!(await ctx.sleep(2200))) return; } },
    },
    {
      title: 'Larger buttons, text and colours',
      text: `<p>Other phones provide <strong>fewer, larger buttons</strong> and <strong>connections for hearing aids</strong>.</p>
             <p>Some use <strong>tactile keypads</strong>, which are more responsive than other keypads, and give the user a <strong>choice of on-screen text size and colours</strong>.</p>`,
      tip: 'Try it: change the text size and the colours.',
      async on(a, ctx) { a.show('acc'); a.setSz(1); a.setCol('std'); if (!(await ctx.sleep(900))) return; a.setSz(3); if (!(await ctx.sleep(900))) return; a.setCol('hc'); },
    },
    {
      title: 'Smartphones',
      text: `<p><strong>Smartphones</strong> are small computers with <strong>Wi-Fi</strong> and mobile phone connectivity, so they can make phone calls and access the internet.</p>
             <p>They also include features of other devices such as <strong>cameras, media players</strong> and hand-held <strong>games consoles</strong>, and have a more advanced operating system than other mobile phones.</p>`,
      on: (a) => { a.show('smart'); },
    },
    {
      title: 'Apps and the virtual keyboard',
      text: `<p><strong>Applications (apps)</strong> can be downloaded so users can customise their smartphones with <strong>entertainment, educational and business</strong> features.</p>
             <p>Most smartphones use a <strong>touch screen</strong> for input. A <strong>virtual keyboard</strong> is used to enter text, numbers and other characters.</p>`,
      tip: 'Try it: download apps and type on the virtual keyboard.',
      async on(a, ctx) { a.show('smart'); a.download('edu'); if (!(await ctx.sleep(900))) return; await a.typeMsg('see you at six', ctx); },
    },
    {
      title: 'Battery life',
      text: `<p>Because they combine so many features, smartphones <strong>use more power</strong> than other types of mobile phone.</p>
             <p>This means they have a <strong>shorter battery life</strong> and need to be charged more regularly.</p>`,
      tip: 'Try it: switch features on and compare the battery life. The numbers are an illustration.',
      async on(a, ctx) { a.show('smart'); await a.drainAll(ctx); },
    },
  ],
});

FD.activities({
  section: 'phones',
  items: [
    {
      id: 'emergency',
      title: 'Emergency button',
      task: '<p>Discuss which groups of people could need a phone with an emergency button. How would this phone meet their needs?</p>',
      sim: ['phones', 'Try the emergency button'],
      fields: ['Group 1 and how it helps', 'Group 2 and how it helps', 'Group 3 and how it helps'],
      lines: 2,
      hint: 'Anything else from your discussion…',
    },
    {
      id: 'smartvsmobile',
      title: 'Smartphones and mobile phones',
      task: '<ol><li>Research which smartphone features use the most power.</li><li>Make a list of activities for which a standard mobile phone would be more suitable than a smartphone.</li></ol>',
      fields: ['1. Features that use the most power'],
      lines: 5,
      hint: '2. A standard mobile phone is more suitable for…',
    },
    {
      id: 'rnib',
      title: 'Accessibility',
      task: '<p>The Royal National Institute of Blind People (RNIB) supports people with sight impairments. Search for <b>‘RNIB mobile phone accessibility’</b> to visit their website. Watch the video about the accessibility features of major smartphones and list the features mentioned. Which features did you already know about?</p>',
      fields: ['Features mentioned in the video', 'Features I already knew about'],
      lines: 3,
      hint: 'Anything that surprised you…',
    },
  ],
});

FD.check({
  section: 'phones',
  items: [
    { type: 'mcq', q: 'What does SIM stand for?', opts: ['Subscriber identity module', 'Smart internet modem', 'Secure input memory', 'System information manager'], why: 'A SIM card identifies the subscriber to a mobile phone network.' },
    { type: 'mcq', q: 'A phone has an emergency button. What happens when it is pressed?', opts: ['It calls each person on a list of emergency contacts until someone answers', 'It sends a text to every contact at the same time', 'It switches the phone off', 'It reads the screen aloud'], why: 'The button is linked to a list of emergency contacts.' },
    { type: 'multi', q: 'Which three features help users with accessibility needs?', need: 3, opts: [['Every feature and function spoken aloud', true], ['Fewer, larger buttons', true], ['Connections for hearing aids', true], ['A more advanced operating system', false], ['A shorter battery life', false]], why: 'Also: tactile keypads and a choice of text size and colours.' },
    { type: 'mcq', q: 'Why do smartphones have a shorter battery life than other mobile phones?', opts: ['They combine so many features that they use more power', 'They do not have a SIM card', 'Their batteries cannot be recharged', 'They use a physical keyboard'], why: 'They need to be charged more regularly.' },
    { type: 'mcq', q: 'What is a virtual keyboard?', opts: ['A keyboard displayed on and used via a touch screen', 'A keyboard connected by Bluetooth', 'A keyboard with large tactile keys', 'A keyboard used in a games console'], why: 'It is used to enter text, numbers and other characters.' },
    { type: 'tf', q: 'Apps can be downloaded to customise a smartphone with entertainment, educational and business features.', a: true, why: 'Applications (apps) let users perform tasks.' },
  ],
});
