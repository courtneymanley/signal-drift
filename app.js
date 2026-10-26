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

  /* ---------- arrival: how long each version took to reach me ---------- */
  const ARRIVAL = typeof arrival !== "undefined" ? arrival : {};
  const READER = typeof reader !== "undefined" ? reader : {};

  function slug(s) { return String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""); }

  function parseLocal(s) {
    if (!s) return null;
    const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2}))?/);
    if (!m) return null;
    return { date: new Date(+m[1], +m[2] - 1, +m[3], m[4] ? +m[4] : 0, m[5] ? +m[5] : 0), hasTime: !!m[4] };
  }

  function dayIndex(d) { return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / 86400000); }

  function plural(n, word) { return `${n} ${word}${n === 1 ? "" : "s"}`; }

  function formatDuration(mins) {
    if (mins < 60) return plural(mins, "min");
    const h = Math.floor(mins / 60), m = mins % 60;
    if (h < 24) return m ? `${plural(h, "hr")} ${m} min` : plural(h, "hr");
    const d = Math.floor(h / 24), hr = h % 24;
    if (d < 7) return hr ? `${plural(d, "day")}, ${plural(hr, "hr")}` : plural(d, "day");
    return plural(d, "day");
  }

  // Returns { text, short, minutes, days } or null when there's no arrival entry.
  function arrivalFor(item) {
    const a = ARRIVAL[item.id];
    if (!a) return null;
    const cap = parseLocal(item.record && item.record.captured);
    const pub = parseLocal(a.pub);
    const after = a.basis === "updated" ? "after the update" : "after publishing";
    if ((a.basis === "published" || a.basis === "updated") && pub && pub.hasTime && cap) {
      const mins = Math.max(0, Math.round((cap.date - pub.date) / 60000));
      const tz = a.tz ? " (time zone not shown)" : "";
      return { text: `Reached me ${formatDuration(mins)} ${after}${tz}`, short: formatDuration(mins), minutes: mins, days: Math.floor(mins / 1440) };
    }
    if ((a.basis === "date" || a.basis === "updated") && pub && cap) {
      const days = dayIndex(cap.date) - dayIndex(pub.date);
      const ref = a.basis === "updated" ? "the update" : "the date on the capture";
      const text = days === 0 ? `Reached me the same day as ${ref}` : `Reached me ${plural(days, "day")} after ${ref}`;
      return { text, short: days === 0 ? "same day" : plural(days, "day"), minutes: null, days };
    }
    if (a.basis === "stamp") {
      return { text: `Stamped “${a.stamp}” when I captured it`, short: `“${a.stamp}”`, minutes: null, days: null };
    }
    return { text: "I couldn't see a publish time", short: "no time shown", minutes: null, days: null };
  }

  /* ---------- record: kept separate from the annotation ---------- */
  function buildRecord(item) {
    const d = el("details", "record");
    d.appendChild(el("summary", null, "Record"));
    const dl = el("dl");
    const r = item.record || {};
    const arr = arrivalFor(item);
    [["Source", r.source], ["Format", r.format], ["Byline", r.byline], ["Published", r.published], ["Captured", r.captured], ["Arrival", arr && arr.text], ["File", item.id]]
      .forEach(([k, v]) => { if (!v) return; dl.appendChild(el("dt", null, k)); dl.appendChild(el("dd", null, v)); });
    const fi = item.firstImpression || (ARRIVAL[item.id] && ARRIVAL[item.id].firstImpression);
    dl.appendChild(el("dt", null, "First impression"));
    dl.appendChild(el("dd", fi ? null : "not-recorded", fi || "Not recorded at the time"));
    if (item.redaction) { dl.appendChild(el("dt", null, "Redacted")); dl.appendChild(el("dd", null, item.redaction)); }
    d.appendChild(dl);
    return d;
  }

  function buildSources(item) {
    if (!item.sources || !item.sources.length) return null;
    const wrap = el("div", "source-notes");
    item.sources.forEach(s => {
      const p = el("p", "source-note");
      p.appendChild(el("span", "source-label", "Checked · "));
      const a = el("a", null, s.text);
      a.href = s.url; a.target = "_blank"; a.rel = "noopener";
      p.appendChild(a);
      wrap.appendChild(p);
    });
    return wrap;
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
    const arr = arrivalFor(item);
    if (arr) cap.appendChild(el("span", "arrival-line", `${arr.text} · ${item.record.format}`));
    const fi = item.firstImpression || (ARRIVAL[item.id] && ARRIVAL[item.id].firstImpression);
    if (fi) {
      const p = el("p", "first-impression");
      p.appendChild(el("span", "fi-label", "What made me stop · "));
      p.appendChild(document.createTextNode(fi));
      cap.appendChild(p);
    }
    const src = buildSources(item);
    if (src) cap.appendChild(src);
    cap.appendChild(buildRecord(item));
    fig.appendChild(cap);
    fig.id = "cap-" + slug(item.id);
    fig.dataset.layout = "marginalia";
    return fig;
  }

  function svgLayer() {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("class", "leaders");
    s.setAttribute("aria-hidden", "true");
    return s;
  }

  function buildConnector(text, contests, onCompare) {
    const wrap = el("div", "change-connector" + (contests ? " contests" : ""));
    const arrow = el("span", "change-arrow", contests ? "⌁" : "↓");
    arrow.setAttribute("aria-hidden", "true");
    wrap.appendChild(arrow);
    wrap.appendChild(el("p", "change-text", text));
    if (onCompare) {
      const b = el("button", "compare-btn", "Compare with the one before");
      b.type = "button";
      b.addEventListener("click", onCompare);
      wrap.appendChild(b);
    }
    return wrap;
  }

  // First sentence of a point-of-change note, without its label.
  function shortChange(text) {
    if (!text) return "";
    const t = text.replace(/^(Point of change|Diverges):\s*/i, "");
    const m = t.match(/^.*?[.?](?=\s|$)/);
    return m ? m[0] : t;
  }

  function chainSpan(chain) {
    let first = null, last = null;
    chain.items.forEach(it => {
      const a = ARRIVAL[it.id];
      const p = a && (a.basis === "published" || a.basis === "date") ? parseLocal(a.pub) : null;
      if (p && (!first || p.date < first)) first = p.date;
      const c = parseLocal(it.record && it.record.captured);
      if (c && (!last || c.date > last)) last = c.date;
    });
    if (!first || !last) return null;
    const fmt = d => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return { first: fmt(first), last: fmt(last), days: dayIndex(last) - dayIndex(first) };
  }

  /* ---------- overview strip: the whole chain in one row ---------- */
  function buildOverview(chain) {
    const wrap = el("div", "chain-overview");
    const head = el("div", "overview-head");
    head.appendChild(el("span", "block-label", `Overview · ${plural(chain.items.length, "version")}`));
    const cmp = el("button", "compare-btn", "Compare side by side");
    cmp.type = "button";
    cmp.addEventListener("click", () => openCompare(chain, 1));
    head.appendChild(cmp);
    wrap.appendChild(head);

    const row = el("ol", "overview-row");
    chain.items.forEach((it, i) => {
      if (i > 0) {
        const contests = it.role === "contests";
        const li = el("li", "ov-change" + (contests ? " is-contest" : ""));
        const b = el("button", "ov-change-btn");
        b.type = "button";
        b.setAttribute("aria-label", `Compare version ${i} and ${i + 1}`);
        if (contests) b.appendChild(el("span", "ov-turn", "Turns contested"));
        b.appendChild(el("span", "ov-change-text", shortChange(it.change) || "→"));
        b.addEventListener("click", () => openCompare(chain, i));
        li.appendChild(b);
        row.appendChild(li);
      }
      const li = el("li", "ov-step");
      const a = el("a", "ov-step-link");
      a.href = "#cap-" + slug(it.id);
      const t = el("img");
      t.src = it.image; t.alt = ""; t.loading = "lazy"; t.decoding = "async";
      a.appendChild(t);
      a.appendChild(el("span", "ov-num", String(i + 1)));
      a.appendChild(el("span", "ov-date", formatDate(it.date)));
      a.appendChild(el("span", "ov-source", it.record.source));
      const arr = arrivalFor(it);
      if (arr) a.appendChild(el("span", "ov-lag", arr.short));
      a.setAttribute("aria-label", `Version ${i + 1}: ${it.record.source}, ${formatDate(it.date)}. Jump to it.`);
      li.appendChild(a);
      row.appendChild(li);
    });

    // the last stop on every chain
    const end = el("li", "ov-reader");
    end.appendChild(el("span", "ov-reader-label", "Reader"));
    if (READER.place) end.appendChild(el("span", "ov-reader-place", READER.place));
    const span = chainSpan(chain);
    if (span) end.appendChild(el("span", "ov-reader-span", `First version ${span.first}. Last one reached me ${span.last}. ${plural(span.days, "day")}.`));
    row.appendChild(end);
    wrap.appendChild(row);
    return wrap;
  }

  /* ---------- compare: two neighboring versions in view at once ---------- */
  let dialog, dlgState = null;

  function compareFigure(item, n) {
    const f = el("figure", "cmp-fig");
    const i = el("img");
    i.src = item.image; i.alt = item.alt || "";
    f.appendChild(i);
    const c = el("figcaption");
    c.appendChild(el("span", "capture-date", `${n} · ${formatDate(item.date)} · ${item.record.source}`));
    const arr = arrivalFor(item);
    if (arr) c.appendChild(el("span", "arrival-line", arr.text));
    f.appendChild(c);
    return f;
  }

  function renderCompare() {
    const { chain, i } = dlgState;
    const prev = chain.items[i - 1], cur = chain.items[i];
    const body = dialog.querySelector(".cmp-body");
    body.innerHTML = "";
    dialog.querySelector(".cmp-title").textContent = chain.title || "";
    dialog.querySelector(".cmp-count").textContent = `Change ${i} of ${chain.items.length - 1}`;
    const pair = el("div", "cmp-pair");
    pair.appendChild(compareFigure(prev, i));
    pair.appendChild(compareFigure(cur, i + 1));
    body.appendChild(pair);
    const contests = cur.role === "contests";
    const note = el("div", "cmp-note" + (contests ? " contests" : ""));
    if (contests) note.appendChild(el("span", "ov-turn", "Turns contested"));
    note.appendChild(el("p", "change-text", cur.change || ""));
    dialog.querySelector(".cmp-note-slot").replaceChildren(note);
    dialog.querySelector(".cmp-prev").disabled = i <= 1;
    dialog.querySelector(".cmp-next").disabled = i >= chain.items.length - 1;
    body.scrollTop = 0;
  }

  function ensureDialog() {
    if (dialog) return dialog;
    dialog = el("dialog", "compare");
    dialog.setAttribute("aria-label", "Compare versions");
    const top = el("div", "cmp-top");
    const titles = el("div", "cmp-titles");
    titles.appendChild(el("span", "cmp-count block-label"));
    titles.appendChild(el("h2", "cmp-title chain-title"));
    top.appendChild(titles);
    const close = el("button", "cmp-close", "Close");
    close.type = "button";
    close.addEventListener("click", () => dialog.close());
    top.appendChild(close);
    dialog.appendChild(top);
    dialog.appendChild(el("div", "cmp-body"));
    const foot = el("div", "cmp-foot");
    foot.appendChild(el("div", "cmp-note-slot"));
    const nav = el("div", "cmp-nav");
    const p = el("button", "cmp-prev compare-btn", "← Earlier change"); p.type = "button";
    const n = el("button", "cmp-next compare-btn", "Next change →"); n.type = "button";
    p.addEventListener("click", () => { if (dlgState.i > 1) { dlgState.i--; renderCompare(); } });
    n.addEventListener("click", () => { if (dlgState.i < dlgState.chain.items.length - 1) { dlgState.i++; renderCompare(); } });
    nav.appendChild(p); nav.appendChild(n);
    foot.appendChild(nav);
    dialog.appendChild(foot);
    dialog.addEventListener("keydown", e => {
      if (e.key === "ArrowLeft") dialog.querySelector(".cmp-prev").click();
      if (e.key === "ArrowRight") dialog.querySelector(".cmp-next").click();
    });
    dialog.addEventListener("click", e => { if (e.target === dialog) dialog.close(); });
    document.body.appendChild(dialog);
    return dialog;
  }

  function openCompare(chain, i) {
    if (chain.items.length < 2) return;
    ensureDialog();
    dlgState = { chain, i: Math.min(Math.max(1, i), chain.items.length - 1) };
    renderCompare();
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
  }

  function buildChainSection(chain) {
    const section = el("section", "chain chain-" + chain.relationship);
    section.id = "chain-" + slug(chain.title || chain.items[0].id);
    section.dataset.rel = chain.relationship;
    const header = el("div", "chain-header");
    header.appendChild(el("span", `chain-tag chain-tag-${chain.relationship}`, RELATIONSHIP_LABELS[chain.relationship] || chain.relationship));
    if (chain.title) header.appendChild(el("h2", "chain-title", chain.title));
    section.appendChild(header);
    if (chain.divergencePoint) section.appendChild(el("p", "chain-divergence", `Diverges on: ${chain.divergencePoint}`));
    if (chain.note) section.appendChild(el("p", "chain-note", chain.note));
    if (chain.items.length > 1) section.appendChild(buildOverview(chain));

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
        if (i > 0 && item.change) seq.appendChild(buildConnector(item.change, item.role === "contests", () => openCompare(chain, i)));
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
    row.style.gridTemplateColumns = `repeat(${seq.items.length}, minmax(0, 1fr))`;
    row.style.maxWidth = (seq.items.length * 260) + "px";
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

  /* ---------- chain index, under the legend ---------- */
  function buildIndex(sortedChains) {
    const slot = document.getElementById("chain-index");
    if (!slot || !sortedChains.length) return;
    slot.innerHTML = "";
    slot.appendChild(el("p", "block-label", `Chains · ${sortedChains.length}`));
    const ol = el("ol", "chain-index-list");
    sortedChains.forEach(c => {
      const li = el("li", "ci-item ci-" + c.relationship);
      li.dataset.rel = c.relationship;
      const a = el("a");
      a.href = "#chain-" + slug(c.title || c.items[0].id);
      a.appendChild(el("span", "ci-mark"));
      a.appendChild(el("span", "ci-title", c.title));
      a.appendChild(el("span", "ci-count", String(c.items.length)));
      li.appendChild(a);
      ol.appendChild(li);
    });
    slot.appendChild(ol);
  }

  /* ---------- filters: the legend tags are buttons ---------- */
  const FILTER_MATCH = {
    revised: rel => rel === "revised" || rel === "both",
    contested: rel => rel === "contested" || rel === "both",
    both: rel => rel === "both",
    isolated: () => false
  };
  const FILTER_LABELS = { revised: "revised", contested: "contested", both: "revised + contested", isolated: "isolated" };

  function applyFilter(f, counts) {
    const show = (node, yes) => { if (node) node.hidden = !yes; };
    document.querySelectorAll("#log .chain").forEach(s => show(s, !f || FILTER_MATCH[f](s.dataset.rel)));
    document.querySelectorAll("#chain-index .ci-item").forEach(s => show(s, !f || FILTER_MATCH[f](s.dataset.rel)));
    show(document.querySelector("#log .isolated-section"), !f || f === "isolated");
    document.querySelectorAll("#log .sequence-block, #log .out-section, #log .last-stop").forEach(s => show(s, !f));
    document.querySelectorAll(".legend [data-filter]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.filter === f)));
    const status = document.getElementById("filter-status");
    if (status) {
      status.innerHTML = "";
      status.hidden = !f;
      if (f) {
        const n = counts[f];
        const what = f === "isolated" ? plural(n, "isolated capture") : `${plural(n, "chain")} tagged ${FILTER_LABELS[f]}`;
        status.appendChild(el("span", null, `Showing ${what}. `));
        const all = el("button", "inline-link link-btn", "Show everything");
        all.type = "button";
        all.addEventListener("click", () => setFilter(null, counts));
        status.appendChild(all);
      }
    }
    requestAnimationFrame(layoutAll);
  }

  let currentFilter = null;
  function setFilter(f, counts) {
    currentFilter = currentFilter === f ? null : f;
    applyFilter(currentFilter, counts);
    try { history.replaceState(null, "", currentFilter ? "#show-" + currentFilter : location.pathname + location.search); } catch (e) {}
  }

  function wireFilters(C, isolatedCount) {
    const counts = {
      revised: C.filter(c => FILTER_MATCH.revised(c.relationship)).length,
      contested: C.filter(c => FILTER_MATCH.contested(c.relationship)).length,
      both: C.filter(c => FILTER_MATCH.both(c.relationship)).length,
      isolated: isolatedCount
    };
    document.querySelectorAll(".legend [data-filter]").forEach(b => {
      const f = b.dataset.filter;
      const ct = b.querySelector(".tag-count");
      if (ct) ct.textContent = String(counts[f]);
      b.addEventListener("click", () => setFilter(f, counts));
    });
    const m = location.hash.match(/^#show-(revised|contested|both|isolated)$/);
    if (m) { currentFilter = m[1]; applyFilter(currentFilter, counts); }
  }

  /* ---------- the last stop: how all of it reached me ---------- */
  function platformOf(it) {
    const f = (it.record && it.record.format) || "", s = (it.record && it.record.source) || "";
    if (/^Apple News/.test(f) || /Apple News/.test(s)) return "Apple News";
    if (/Google/.test(f) || /via Google/.test(s) || /notification/i.test(f)) return "Google, from a notification or search";
    if (/Facebook/.test(f)) return "Facebook";
    if (/Instagram/.test(f)) return "Instagram";
    if (/^Web article/.test(f)) return "A web browser";
    return "Other";
  }

  function median(nums) {
    const a = nums.slice().sort((x, y) => x - y), m = Math.floor(a.length / 2);
    return a.length % 2 ? a[m] : Math.round((a[m - 1] + a[m]) / 2);
  }

  function buildLastStop(all, C) {
    const sec = el("section", "last-stop");
    sec.appendChild(el("h2", null, "The last stop"));
    sec.appendChild(el("p", "isolated-note",
      `Every chain on this log ends with me. Each version here is the one that reached me, one reader${READER.place ? " in the " + READER.place : ""}. Here's how all ${all.length} captures got to me.`));

    const tally = {};
    all.forEach(it => { const p = platformOf(it); tally[p] = (tally[p] || 0) + 1; });
    const rows = Object.entries(tally).sort((a, b) => b[1] - a[1]);
    const max = rows[0][1];
    const list = el("ul", "tally");
    rows.forEach(([name, n]) => {
      const li = el("li", "tally-row");
      li.appendChild(el("span", "tally-name", name));
      const bar = el("span", "tally-bar");
      bar.style.setProperty("--w", (n / max * 100).toFixed(1) + "%");
      bar.setAttribute("aria-hidden", "true");
      li.appendChild(bar);
      li.appendChild(el("span", "tally-n", String(n)));
      list.appendChild(li);
    });
    sec.appendChild(list);

    // delays, from chain captures only, where the record shows a clock time
    const timed = [], dated = [];
    C.forEach(c => c.items.forEach(it => {
      const a = arrivalFor(it);
      if (!a) return;
      if (a.minutes != null) timed.push({ it, c, mins: a.minutes });
      else if (a.days != null) dated.push({ it, c, days: a.days });
    }));
    if (timed.length) {
      const longest = timed.reduce((m, x) => (x.mins > m.mins ? x : m));
      const overDay = timed.filter(x => x.mins >= 1440).length;
      const stats = el("dl", "stop-stats");
      [
        ["Chain captures with a clock time", String(timed.length)],
        ["Median delay", formatDuration(median(timed.map(x => x.mins)))],
        ["Took a day or more", `${overDay} of ${timed.length}`],
        ["Longest", `${formatDuration(longest.mins)} · ${longest.it.record.source} · ${longest.c.title}`]
      ].forEach(([k, v]) => { stats.appendChild(el("dt", null, k)); stats.appendChild(el("dd", null, v)); });
      if (dated.length) {
        const oldest = dated.reduce((m, x) => (x.days > m.days ? x : m));
        stats.appendChild(el("dt", null, "Counted in days instead"));
        stats.appendChild(el("dd", null, `${dated.length} more. The oldest was ${plural(oldest.days, "day")} old when it reached me · ${oldest.it.record.source}`));
      }
      sec.appendChild(stats);
      sec.appendChild(el("p", "isolated-note", "I count each delay from the publish or update time on the capture to the moment I took the screenshot. If a capture only shows a date, or a stamp like “1d,” I left it out of the clock-time numbers."));
    }
    return sec;
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

    const sortedChains = C.slice().sort((a, b) => chainStartDate(b).localeCompare(chainStartDate(a)));
    sortedChains.forEach(c => log.appendChild(buildChainSection(c)));
    buildIndex(sortedChains);
    S.forEach(s => log.appendChild(buildSequence(s)));

    if (G.length || X.length || I.length) {
      const sec = el("section", "isolated-section");
      sec.appendChild(el("h2", null, "Isolated captures"));
      sec.appendChild(el("p", "isolated-note", "I've logged these, but I haven't found a linked version yet. When a few of them make a pattern together, they're annotated as a group. Single captures get a few words inside the frame, or an enlarged detail when the claim is all in one line."));
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
      sec.appendChild(el("p", "isolated-note", "I kept these on file, but they're outside the argument. They get the plain caption on purpose."));
      const grid = el("div", "isolated-grid");
      O.forEach(o => grid.appendChild(buildPlainCard(o)));
      sec.appendChild(grid);
      log.appendChild(sec);
    }

    const all = [];
    C.forEach(c => all.push(...c.items));
    S.forEach(s => all.push(...s.items));
    G.forEach(g => all.push(...g.items));
    all.push(...X, ...I, ...O);
    log.appendChild(buildLastStop(all, C));

    const isolatedCount = G.reduce((n, g) => n + g.items.length, 0) + X.length + I.length;
    wireFilters(C, isolatedCount);

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
