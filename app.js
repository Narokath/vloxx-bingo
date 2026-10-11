(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const config = window.BINGO_CONFIG;
  const items = [...new Set(config.items.map(x => x.trim()).filter(Boolean))];
  const storageKey = 'vloxx-bingo-v1';
  let state;
  let timer;
  const notify = message => { $('status').textContent = message; clearTimeout(timer); timer = setTimeout(() => $('status').textContent = '', 5500); };
  const encode = data => {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    return btoa(Array.from(bytes, byte => String.fromCharCode(byte)).join('')).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  };
  const decode = text => JSON.parse(new TextDecoder().decode(Uint8Array.from(atob(text.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))));
  function valid(data) {
    return data && data.v === 1 && typeof data.title === 'string' && data.title.length <= 120 &&
      typeof data.id === 'string' && /^[A-Z0-9]{8}$/.test(data.id) && Array.isArray(data.cells) && data.cells.length === 25 &&
      data.cells.every((x, i) => i === 12 ? x === null : typeof x === 'string' && x.length > 0 && x.length <= 200) &&
      Array.isArray(data.marks) && data.marks.length === 25 && data.marks.every(x => typeof x === 'boolean') && data.marks[12];
  }
  function persist() {
    const replacements = {
      'Tethers break at a shorter distance': 'Tethers make you fly further and faster',
      'Adds remain alive after phase transitions': 'Elites/champions respawn after breakbar'
    };
    state.cells = state.cells.map(label => Object.hasOwn(replacements, label) ? replacements[label] : label);
    if (state.title === 'Vloxx LCM prediction bingo') state.title = config.title;
    try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { /* Cards still work without storage. */ }
    try { history.replaceState(null, '', '#card=' + encode(state)); } catch { /* Download and clipboard remain available. */ }
  }
  function lines() {
    const all = [];
    for (let n = 0; n < 5; n++) { all.push(Array.from({length:5}, (_, k) => n * 5 + k)); all.push(Array.from({length:5}, (_, k) => k * 5 + n)); }
    all.push([0,6,12,18,24], [4,8,12,16,20]);
    return all.filter(line => line.every(i => state.marks[i]));
  }
  function render() {
    $('card-title').textContent = state.title;
    $('card-id').textContent = 'CARD ' + state.id;
    const wins = lines();
    const winning = new Set(wins.flat());
    $('board').replaceChildren(...state.cells.map((label, index) => {
      const button = document.createElement('button');
      button.className = 'square' + (index === 12 ? ' free' : '') + (winning.has(index) ? ' winner' : '');
      button.setAttribute('aria-pressed', String(state.marks[index]));
      if (index === 12) {
        button.innerHTML = '<img class="free-emoji" src="vloxx_pleasure_pain.png" alt=""><span class="free-label">So it has<br>come to this</span>';
        button.setAttribute('aria-label', 'So it has come to this — Vloxx Pleasure Pain free space, always marked');
        button.setAttribute('aria-disabled', 'true');
      } else {
        button.textContent = label;
        button.addEventListener('click', () => { state.marks[index] = !state.marks[index]; persist(); render(); $('board').children[index].focus({preventScroll:true}); });
      }
      return button;
    }));
    $('progress').textContent = `${state.marks.filter(Boolean).length - 1} of 24 predictions marked`;
    $('bingo-message').textContent = wins.length ? `BINGO! ${wins.length} completed ${wins.length === 1 ? 'line' : 'lines'}.` : '';
  }
  function generate() {
    if (items.length < 24 || items.some(x => x.length > 200) || config.title.length > 120) {
      notify('The host list needs at least 24 unique predictions (up to 200 characters each) and a title up to 120 characters.');
      return;
    }
    const pool = [...items];
    for (let i = pool.length - 1; i > 0; i--) {
      const range = i + 1, limit = Math.floor(4294967296 / range) * range;
      let value;
      do { value = crypto.getRandomValues(new Uint32Array(1))[0]; } while (value >= limit);
      const j = value % range; [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    const cells = pool.slice(0, 24); cells.splice(12, 0, null);
    state = {v:1, title:config.title, id:Array.from(crypto.getRandomValues(new Uint8Array(4)), x => x.toString(16).padStart(2,'0')).join('').toUpperCase(), cells, marks:Array.from({length:25}, (_, i) => i === 12)};
    persist(); render();
  }
  $('list-name').textContent = config.collection;
  $('item-count').textContent = `${items.length} entries · 5 × 5 board · free center`;
  $('generate').addEventListener('click', () => {
    if (state && state.marks.filter(Boolean).length > 1 && !confirm('Shuffle a new card? Copy your current card link or save its image first if you want to keep it.')) return;
    generate();
  });
  $('reset').addEventListener('click', () => { if (!state) return; state.marks = state.marks.map((_, i) => i === 12); persist(); render(); notify('Marked squares cleared.'); });
  $('print').addEventListener('click', () => window.print());
  $('share').addEventListener('click', async () => {
    if (!state) return;
    const url = new URL(location.href); url.hash = 'card=' + encode(state);
    try { await navigator.clipboard.writeText(url.href); notify('Card link copied, including your current marks.'); }
    catch { $('link-text').value = url.href; $('link-dialog').showModal(); $('link-text').focus(); $('link-text').select(); }
  });
  $('close-dialog').addEventListener('click', () => $('link-dialog').close());
  $('download').addEventListener('click', async () => {
    if (!state) return;
    const freeEmoji = new Image();
    freeEmoji.src = 'vloxx_pleasure_pain.png';
    try { await freeEmoji.decode(); }
    catch { notify('Could not load the free-space emoji. Please reload and try again.'); return; }
    await document.fonts.ready;
    const canvas = document.createElement('canvas'); canvas.width = 1400; canvas.height = 1630;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#f3eee5'; ctx.fillRect(0, 0, 1400, 1630);
    ctx.fillStyle = '#243d35'; ctx.font = '600 22px sans-serif'; ctx.fillText('VLOXX LCM BINGO', 70, 70);
    ctx.font = '500 58px sans-serif';
    let size = 58;
    while (ctx.measureText(state.title).width > 1240 && size > 18) ctx.font = `500 ${--size}px sans-serif`;
    ctx.fillText(state.title, 70, 155);
    ctx.font = '22px sans-serif'; ctx.fillText('CARD ' + state.id, 70, 204);
    ctx.textAlign = 'center'; ctx.font = 'bold 48px sans-serif';
    'BINGO'.split('').forEach((letter, i) => ctx.fillText(letter, 192 + i * 250, 290));
    state.cells.forEach((label, i) => {
      const x = 70 + (i % 5) * 250, y = 320 + Math.floor(i / 5) * 230;
      ctx.fillStyle = i === 12 ? '#d95833' : state.marks[i] ? '#243d35' : '#fffdf7'; ctx.fillRect(x, y, 242, 222);
      ctx.fillStyle = state.marks[i] ? '#fffdf7' : '#243d35';
      if (i === 12) {
        const scale = Math.min(176 / freeEmoji.naturalWidth, 158 / freeEmoji.naturalHeight);
        const width = freeEmoji.naturalWidth * scale, height = freeEmoji.naturalHeight * scale;
        ctx.drawImage(freeEmoji, x + (242 - width) / 2, y + 10 + (158 - height) / 2, width, height);
        ctx.font = '500 18px sans-serif';
        ctx.fillText('So it has', x + 121, y + 187);
        ctx.fillText('come to this', x + 121, y + 209);
        return;
      }
      const content = label;
      let font = 28, wrapped;
      do {
        ctx.font = `500 ${font}px sans-serif`;
        wrapped = [''];
        for (const word of content.split(/\s+/)) {
          if (ctx.measureText(word).width > 214) {
            for (const char of word) { const last = wrapped.length - 1; if (ctx.measureText(wrapped[last] + char).width > 214) wrapped.push(char); else wrapped[last] += char; }
            wrapped.push('');
          } else { const last = wrapped.length - 1; const candidate = wrapped[last] ? wrapped[last] + ' ' + word : word; if (ctx.measureText(candidate).width > 214) wrapped.push(word); else wrapped[last] = candidate; }
        }
        wrapped = wrapped.filter(Boolean); font--;
      } while (wrapped.length * (font + 7) > 194 && font > 10);
      const height = font + 7;
      wrapped.forEach((line, n) => ctx.fillText(line, x + 121, y + 111 + (n - (wrapped.length - 1) / 2) * height + font / 3));
    });
    ctx.fillStyle = '#243d35'; ctx.textAlign = 'left'; ctx.font = '22px sans-serif'; ctx.fillText('Card ' + state.id, 70, 1535);
    ctx.font = '18px sans-serif'; ctx.fillText('Keep your card link to reopen and continue playing.', 70, 1575);
    canvas.toBlob(blob => { if (!blob) { notify('Image export failed. Try Print / save PDF.'); return; } const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `vloxx-lcm-bingo-${state.id}.png`; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }, 'image/png');
  });
  function restoreHash() {
    if (!location.hash.startsWith('#card=')) return false;
    try { if (location.hash.length > 50000) throw Error(); const data = decode(location.hash.slice(6)); if (!valid(data)) throw Error(); state = data; persist(); render(); return true; }
    catch { notify('This card link is invalid. Showing a saved or new card instead.'); return false; }
  }
  window.addEventListener('hashchange', restoreHash);
  if (!restoreHash()) {
    try { const saved = JSON.parse(localStorage.getItem(storageKey)); if (valid(saved)) state = saved; } catch { /* No saved card. */ }
    if (state) { persist(); render(); } else generate();
  }
})();
