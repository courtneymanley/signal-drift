/*
  Renders everything in entries.js into #log. Each capture's annotation form
  follows its status under the Capture Rule (see method.html):
    chains -> marginalia, isolated clusters -> grid, single isolated -> words
    on the image, detail-level claims -> crop and enlarge, one sequence with
    no words, and out-of-scope captures -> the plain caption below.
  Every capture also gets a separate, collapsible record.
*/

(function () {
  const RELATIONSHIP_LABELS = { revised: "Revised", contested: "Contested", both: "Revised + Contested" };

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function img(item) {
    const i = el("img");
    i.src = item.image;
    i.alt = item.alt || "";
    i.loading = "lazy";
    i.decoding = "async";
    if (item.w && item.h) { i.width = item.w; i.height = item.h; }
    return i;
  }

  /* ---------- record: kept separate from the annotation ---------- */
  function buildRecord(item) {
    const d = el("details", "record");
    d.appendChild(el("summary", null, "Record"));
    const dl = el("dl");
    const r = item.record || {};
    [["Source", r.source], ["Format", r.format], ["Byline", r.byline], ["Published", r.published], ["Captured", r.captured], ["File", item.id]]
      .forEach(([k, v]) => { if (!v) return; dl.appendChild(el("dt", null, k)); dl.appendChild(el("dd", null, v)); });
    if (item.redaction) { dl.appendChild(el("dt", null, "Redacted")); dl.appendChild(el("dd", null, item.redaction)); }
    d.appendChild(dl);
    return d;
  }

  function buildMultiRecord(items) {
    const wrap = el("div", "record-group");
    items.forEach(it => {
      const r = buildRecord(it);
      r.querySelector("summary").textContent = `Record · ${it.record.source} · ${formatDate(it.date)}`;
      wrap.appendChild(r);
    });
    return wrap;
  }

  /* ---------- marginalia plate (chains) ---------- */
  function buildPlate(item) {
    const fig = el("figure", "plate");
    const frame = el("div", "plate-image");
    frame.appendChild(img(item));
    const notes = el("ol", "plate-notes");
    (item.marks || []).forEach((m, i) => {
      const pin = el("span", "pin", String(i + 1));
      pin.style.left = m.x + "%";
      pin.style.top = m.y + "%";
      pin.setAttribute("aria-hidden", "true");
      frame.appendChild(pin);
      const li = el("li", "plate-note");
      li.dataset.y = m.y;
      li.appendChild(el("span", "note-num", String(i + 1)));
      li.appendChild(el("span", "note-text", m.note));
      notes.appendChild(li);
    });
    fig.appendChild(frame);
    fig.appendChild(notes);
    fig.appendChild(svgLayer());
    const cap = el("figcaption", "plate-meta");
    cap.appendChild(el("span", "capture-date", `${formatDate(item.date)} · ${item.record.source}`));
    cap.appendChild(buildRecord(item));
    fig.appendChild(cap);
    fig.dataset.layout = "marginalia";
    return fig;
  }

  function svgLayer() {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "leaders");
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  function buildConnector(text, contests) {
    const wrap = el("div", "change-connector" + (contests ? " contests" : ""));
    const arrow = el("span", "change-arrow", contests ? "⌁" : "↓");
    arrow.setAttribute("aria-hidden", "true");
    wrap.appendChild(arrow);
    wrap.appendChild(el("p", "change-text", text));
    return wrap;
  }

  function buildChainSection(chain) {
    const section = el("section", "chain chain-" + chain.relationship);
    const header = el("div", "chain-header");
    header.appendChild(el("span", `chain-tag chain-tag-${chain.relationship}`, RELATIONSHIP_LABELS[chain.relationship] || chain.relationship));
    if (chain.title) header.appendChild(el("h2", "chain-title", chain.title));
    section.appendChild(header);
    if (chain.divergencePoint) section.appendChild(el("p", "chain-divergence", `Diverges on: ${chain.divergencePoint}`));

    if (chain.relationship === "contested") {
      const fork = el("div", "chain-fork");
      chain.items.forEach(item => {
        const b = el("div", "chain-branch");
        b.appendChild(buildPlate(item));
        if (item.change) b.appendChild(el("p", "change-text branch-change-text", item.change));
        fork.appendChild(b);
      });
      section.appendChild(fork);
    } else {
      // revised and revised + contested both read in the order found. A capture
      // that contests the ones before it gets a contested connector.
      const seq = el("div", "chain-sequence");
      chain.items.forEach((item, i) => {
        if (i > 0 && item.change) seq.appendChild(buildConnector(item.change, item.role === "contests"));
        seq.appendChild(buildPlate(item));
      });
      section.appendChild(seq);
    }
    return section;
  }

  /* ---------- sequence, no words ---------- */
  function buildSequence(seq) {
    const s = el("section", "sequence-block");
    s.appendChild(el("h2", "block-label", "Sequence"));
    const row = el("div", "sequence-row");
    seq.items.forEach(it => { const f = el("figure", "seq-frame"); f.appendChild(img(it)); row.appendChild(f); });
    s.appendChild(row);
    s.appendChild(buildMultiRecord(seq.items));
    return s;
  }

  /* ---------- grid, one caption ---------- */
  function buildGrid(g) {
    const s = el("div", "grid-block");
    s.appendChild(el("h3", "block-label", g.title));
    const grid = el("div", "thumb-grid");
    g.items.forEach(it => { const f = el("figure", "thumb"); f.appendChild(img(it)); grid.appendChild(f); });
    s.appendChild(grid);
    s.appendChild(el("p", "grid-caption", g.caption));
    s.appendChild(buildMultiRecord(g.items));
    return s;
  }

  /* ---------- crop and enlarge ---------- */
  function buildCrop(item) {
    const fig = el("figure", "plate crop-plate");
    const frame = el("div", "plate-image");
    frame.appendChild(img(item));
    const details = el("div", "crop-details");
    item.boxes.forEach((b, i) => {
      const box = el("span", "crop-box");
      Object.assign(box.style, { left: b.x0 + "%", top: b.y0 + "%", width: (b.x1 - b.x0) + "%", height: (b.y1 - b.y0) + "%" });
      box.dataset.i = i;
      frame.appendChild(box);
      const d = el("div", "crop-detail");
      d.dataset.i = i;
      d.appendChild(el("span", "crop-label", b.label));
      const di = el("img");
      di.src = b.detail;
      di.alt = `Enlarged detail: ${b.label}`;
      di.loading = "lazy";
      d.appendChild(di);
      details.appendChild(d);
    });
    details.appendChild(el("p", "crop-annotation", item.annotation));
    if (item.watch) details.appendChild(el("p", "watch-note", item.watch));
    fig.appendChild(frame);
    fig.appendChild(details);
    fig.appendChild(svgLayer());
    const cap = el("figcaption", "plate-meta");
    cap.appendChild(el("span", "capture-date", `${formatDate(item.date)} · ${item.record.source}`));
    cap.appendChild(buildRecord(item));
    fig.appendChild(cap);
    fig.dataset.layout = "crop";
    return fig;
  }

  /* ---------- words on the image ---------- */
  function buildWordsCard(item) {
    const fig = el("figure", "capture words-card isolated-card");
    const frame = el("div", "words-frame");
    frame.appendChild(img(item));
    const w = el("span", "words", item.words.text);
    w.style.left = item.words.x + "%";
    w.style.top = item.words.y + "%";
    frame.appendChild(w);
    fig.appendChild(frame);
    const cap = el("figcaption");
    cap.appendChild(el("span", "capture-date", `${formatDate(item.date)} · ${item.record.source}`));
    if (item.watch) cap.appendChild(el("p", "watch-note", item.watch));
    cap.appendChild(buildRecord(item));
    fig.appendChild(cap);
    return fig;
  }

  /* ---------- caption below (out of scope, on purpose) ---------- */
  function buildPlainCard(item) {
    const fig = el("figure", "capture plain-card");
    fig.appendChild(img(item));
    const cap = el("figcaption");
    cap.appendChild(el("span", "capture-date", `${formatDate(item.date)} · ${item.record.source}`));
    cap.appendChild(el("p", "capture-text", item.caption));
    cap.appendChild(buildRecord(item));
    fig.appendChild(cap);
    return fig;
  }

  /* ---------- leader lines ---------- */
  function drawLeaders(plate) {
    const svg = plate.querySelector("svg.leaders");
    if (!svg) return;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    const frame = plate.querySelector(".plate-image");
    const wide = plate.classList.contains("is-wide");
    const pr = plate.getBoundingClientRect();
    svg.setAttribute("width", pr.width);
    svg.setAttribute("height", pr.height);
    if (!wide) return;
    const fr = frame.getBoundingClientRect();
    const line = (pts, cls) => {
      const p = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      p.setAttribute("points", pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "));
      p.setAttribute("class", cls || "");
      svg.appendChild(p);
    };
    if (plate.dataset.layout === "marginalia") {
      const pins = plate.querySelectorAll(".pin");
      const notes = plate.querySelectorAll(".plate-note");
      pins.forEach((pin, i) => {
        const n = notes[i];
        if (!n) return;
        const a = pin.getBoundingClientRect();
        const b = n.getBoundingClientRect();
        const ax = a.left + a.width / 2 - pr.left, ay = a.top + a.height / 2 - pr.top;
        const ex = fr.right - pr.left + 6;
        const by = b.top + 11 - pr.top, bx = b.left - pr.left - 6;
        line([[ax, ay], [ex, ay], [bx - 10, by], [bx, by]]);
      });
    } else if (plate.dataset.layout === "crop") {
      plate.querySelectorAll(".crop-box").forEach(box => {
        const d = plate.querySelector(`.crop-detail[data-i="${box.dataset.i}"] img`);
        if (!d) return;
        const a = box.getBoundingClientRect(), b = d.getBoundingClientRect();
        line([[a.right - pr.left, a.top + a.height / 2 - pr.top], [b.left - pr.left, b.top + b.height / 2 - pr.top]], "crop-leader");
      });
    }
  }

  function layoutMarginalia(plate) {
    const wide = plate.getBoundingClientRect().width >= 520;
    plate.classList.toggle("is-wide", wide);
    const notes = plate.querySelectorAll(".plate-note");
    const list = plate.querySelector(".plate-notes");
    if (!list) return drawLeaders(plate);
    if (!wide) { notes.forEach(n => (n.style.top = "")); list.style.height = ""; return drawLeaders(plate); }
    const h = plate.querySelector(".plate-image").getBoundingClientRect().height;
    let floor = 0;
    notes.forEach(n => {
      let top = Math.max((parseFloat(n.dataset.y) / 100) * h - 11, floor);
      n.style.top = top + "px";
      floor = top + n.getBoundingClientRect().height + 10;
    });
    list.style.height = Math.max(h, floor) + "px";
    drawLeaders(plate);
  }

  function layoutAll() {
    document.querySelectorAll(".plate").forEach(p => {
      if (p.dataset.layout === "marginalia") layoutMarginalia(p);
      else { p.classList.toggle("is-wide", p.getBoundingClientRect().width >= 520); drawLeaders(p); }
    });
  }

  function chainStartDate(chain) {
    return chain.items.reduce((min, it) => (it.date < min ? it.date : min), chain.items[0].date);
  }

  function render() {
    const log = document.getElementById("log");
    log.innerHTML = "";
    const C = typeof chains !== "undefined" ? chains : [];
    const S = typeof sequences !== "undefined" ? sequences : [];
    const G = typeof grids !== "undefined" ? grids : [];
    const X = typeof crops !== "undefined" ? crops : [];
    const I = typeof isolatedCaptures !== "undefined" ? isolatedCaptures : [];
    const O = typeof outOfScope !== "undefined" ? outOfScope : [];

    if (![C, S, G, X, I, O].some(a => a && a.length)) {
      log.innerHTML = "<p class='empty'>No captures yet.</p>";
      return;
    }

    C.slice().sort((a, b) => chainStartDate(b).localeCompare(chainStartDate(a))).forEach(c => log.appendChild(buildChainSection(c)));
    S.forEach(s => log.appendChild(buildSequence(s)));

    if (G.length || X.length || I.length) {
      const sec = el("section", "isolated-section");
      sec.appendChild(el("h2", null, "Isolated captures"));
      sec.appendChild(el("p", "isolated-note", "Logged, but no linked version has turned up yet. Clusters are annotated as a pile. Single captures get a few words inside the frame, or an enlarged detail when the claim lives in one line."));
      G.forEach(g => sec.appendChild(buildGrid(g)));
      if (X.length) {
        const cropWrap = el("div", "crop-list");
        X.slice().sort((a, b) => b.date.localeCompare(a.date)).forEach(x => cropWrap.appendChild(buildCrop(x)));
        sec.appendChild(cropWrap);
      }
      if (I.length) {
        const grid = el("div", "isolated-grid");
        I.slice().sort((a, b) => b.date.localeCompare(a.date)).forEach(i => grid.appendChild(buildWordsCard(i)));
        sec.appendChild(grid);
      }
      log.appendChild(sec);
    }

    if (O.length) {
      const sec = el("section", "out-section");
      sec.appendChild(el("h2", null, "Out of scope"));
      sec.appendChild(el("p", "isolated-note", "Kept on file, outside the argument. These get the default caption on purpose."));
      const grid = el("div", "isolated-grid");
      O.forEach(o => grid.appendChild(buildPlainCard(o)));
      sec.appendChild(grid);
      log.appendChild(sec);
    }

    // lay out once images have real heights, and again on resize
    document.querySelectorAll(".plate img").forEach(i => i.addEventListener("load", layoutAll, { once: true }));
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(layoutAll, 120); });
    window.addEventListener("load", layoutAll);
    requestAnimationFrame(layoutAll);
  }

  window.SignalDriftLayout = () => layoutAll();
  render();
})();
