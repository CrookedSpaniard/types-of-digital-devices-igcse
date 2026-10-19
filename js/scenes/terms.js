FD.add({
  id: 'terms',
  title: 'Key terms',
  tab: 'Key terms',
  icon: 'terms',
  color: '--accent',
  page: true,
  mount(el) {
    const T = [
      ['types', 'Mainframe computer', 'A large, powerful computer that can do a lot of complicated jobs quickly and can be used by a lot of people at the same time.'],
      ['types', 'Microprocessor', 'The device that controls what a computer does: it takes data as input, does something with it and provides output.'],
      ['pcs', 'Upgrade', 'To make a computer better and able to do more things.'],
      ['pcs', 'Peripheral device', 'Equipment that is connected to a computer and used with it, e.g. monitor, printer, mouse, keyboard.'],
      ['pcs', 'All-in-one', 'A desktop that combines the monitor with the PC hardware.'],
      ['pcs', 'Portable', 'Easy to carry or move. Laptops are portable devices.'],
      ['pcs', 'Desktop replacement', 'A larger laptop with a bigger, better-quality screen and higher performance.'],
      ['pcs', 'Single-board computer (SBC)', 'An affordable computer on one board, e.g. the Raspberry Pi Zero, with a microSD card for storage.'],
      ['pcs', 'Embedded computing', 'Computing hardware that is fixed into position and carries out a specialist task.'],
      ['pcs', 'Physical computing', 'Interactive systems that can sense and respond to the world around them.'],
      ['phones', 'SIM', 'Subscriber identity module: a card that identifies the subscriber to a mobile phone network.'],
      ['phones', 'User', 'The person who uses a computer system.'],
      ['phones', 'Accessibility', 'A measure of how easy something is to use, especially by people with disabilities.'],
      ['phones', 'Wi-Fi', 'Wireless fidelity: connecting to a network or the internet by radio signals rather than wires.'],
      ['phones', 'Application (app)', 'A program that allows a user to perform a task.'],
      ['phones', 'Virtual keyboard', 'A keyboard displayed on and used via a touch screen.'],
      ['tablets', 'Tablet', 'Bigger than a smartphone with similar features: touch screen, apps, Wi-Fi; some have a SIM card slot.'],
      ['cameras', 'Frame rate', 'The number of frames (still images) per second in a movie. Low frame rates stutter or jump.'],
      ['cameras', 'Compensate', 'To reduce or correct a negative effect, e.g. an image processor in poor lighting.'],
      ['cameras', 'Pixel', 'A small dot that helps to make up an image.'],
      ['cameras', 'Pixelated', 'An unclear image with large individual pixels that are visible to the human eye.'],
      ['home', 'Resolution', 'The number of pixels used by a screen to display an image (horizontal × vertical).'],
      ['home', 'HD / UHD (4K, 8K)', 'High definition (e.g. 720p, 1080p) and Ultra High Definition: about 4,000 or 8,000 horizontal pixels.'],
      ['home', 'Stream', 'Play a file while it is being downloaded from the internet, rather than saving it first.'],
      ['home', 'Smart', 'Uses data from sensors to perform a programmed action independently; often connects to the internet.'],
      ['home', 'Media player', 'A device that can store and play digital music and videos and show digital photographs.'],
      ['home', 'USB', 'Universal Serial Bus: a standard for wired connectivity that can also supply electric power.'],
      ['home', 'Bluetooth', 'Wireless connectivity that allows devices to connect over short distances.'],
      ['home', 'PVR', 'Personal video recorder: records broadcast content so it can be watched later.'],
      ['home', 'Set-top box (STB)', 'Sends video and audio received from a broadcaster to a television.'],
      ['games', 'Games console', 'An electronic device used for playing computerised video games on a screen.'],
      ['games', 'Avatar', 'A figure that represents a person in a computer game or other virtual environment.'],
      ['games', 'Data', 'Values that represent information.'],
      ['games', 'Flash memory', 'Storage that holds data as electrical charges in tiny electrical cells; not affected by shaking.'],
      ['nav', 'GPS', 'Global Positioning System: radio signals from satellites show your exact position on Earth.'],
      ['nav', 'Orientation sensor', 'Tells a navigation aid which way the device is pointing.'],
      ['nav', 'Home automation', 'Devices that sense and control functions in the home, controlled from apps or the internet.'],
      ['multi', 'Multifunctional device', 'A device that can perform a range of different functions.'],
      ['multi', 'Convergence', 'When the designs of devices change so that they become similar to one another.'],
      ['multi', 'Phablet', 'A smartphone that has grown bigger to look more like a tablet.'],
    ];
    const colorOf = (id) => (FD.section(id) || { color: '--accent' }).color;
    el.innerHTML = `
      <h2>Key terms</h2>
      <div class="terms-tools"><input type="search" id="tq" placeholder="Search a term…" aria-label="Search terms">
        <span class="seg" id="tp"><button data-v="all">All</button><button data-v="A">Part A</button><button data-v="B">Part B</button></span>
        <span class="small muted" id="tn"></span></div>
      <div class="terms" id="terms">${T.map(([f, t, d]) => `
        <article class="term" data-part="${FD.section(f).part}" style="--c:var(${colorOf(f)})"><h3>${t}</h3><p>${d}</p><button class="link-btn" data-go="${f}">${FD.icon[f]} See it</button></article>`).join('')}</div>`;
    const cards = [...el.querySelectorAll('.term')];
    const q = el.querySelector('#tq'), n = el.querySelector('#tn');
    let part = 'all';
    const filter = () => {
      const s = q.value.trim().toLowerCase();
      let k = 0;
      cards.forEach((c) => { const show = (!s || c.textContent.toLowerCase().includes(s)) && (part === 'all' || c.dataset.part === part); c.hidden = !show; k += show; });
      n.textContent = `${k} of ${cards.length} terms`;
      FD.segSet(el.querySelector('#tp'), part);
    };
    q.addEventListener('input', filter);
    el.querySelector('#tp').addEventListener('click', (e) => { const b = e.target.closest('button[data-v]'); if (b) { part = b.dataset.v; filter(); } });
    filter();
    el.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => FD.goto(b.dataset.go)));
  },
});
