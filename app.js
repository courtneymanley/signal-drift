/*
  Renders `chains` and `isolatedCaptures` (from entries.js) into #log.
  You shouldn't need to edit this file — it just draws whatever is in
  entries.js. If you want to change how things look, that's style.css.
*/

(function () {
  const RELATIONSHIP_LABELS = {
    revised: "Revised",
    contested: "Contested",
    both: "Revised + Contested"
  };

  function formatDate(iso) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function buildCaptureCard(item) {
    const card = document.createElement("figure");
    card.className = "capture";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.alt || "";
    img.loading = "lazy";

    const cap = document.createElement("figcaption");

    const dateEl = document.createElement("span");
    dateEl.className = "capture-date";
    dateEl.textContent = formatDate(item.date);

    const text = document.createElement("p");
    text.className = "capture-text";
    text.textContent = item.caption;

    cap.appendChild(dateEl);
    cap.appendChild(text);
    card.appendChild(img);
    card.appendChild(cap);
    return card;
  }

  function buildChangeConnector(changeText) {
    const wrap = document.createElement("div");
    wrap.className = "change-connector";
    const arrow = document.createElement("span");
    arrow.className = "change-arrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↓";
    const text = document.createElement("p");
    text.className = "change-text";
    text.textContent = changeText;
    wrap.appendChild(arrow);
    wrap.appendChild(text);
    return wrap;
  }

  function buildChainSection(chain) {
    const section = document.createElement("section");
    section.className = "chain";

    const header = document.createElement("div");
    header.className = "chain-header";

    const tag = document.createElement("span");
    tag.className = `chain-tag chain-tag-${chain.relationship}`;
    tag.textContent = RELATIONSHIP_LABELS[chain.relationship] || chain.relationship;
    header.appendChild(tag);
    section.appendChild(header);

    const isFork = chain.relationship === "contested" || chain.relationship === "both";

    if (isFork) {
      if (chain.divergencePoint) {
        const div = document.createElement("p");
        div.className = "chain-divergence";
        div.textContent = `Diverges on: ${chain.divergencePoint}`;
        section.appendChild(div);
      }

      const fork = document.createElement("div");
      fork.className = "chain-fork";
      chain.items.forEach(item => {
        const branch = document.createElement("div");
        branch.className = "chain-branch";
        branch.appendChild(buildCaptureCard(item));
        if (item.change) {
          const note = document.createElement("p");
          note.className = "change-text branch-change-text";
          note.textContent = item.change;
          branch.appendChild(note);
        }
        fork.appendChild(branch);
      });
      section.appendChild(fork);
    } else {
      const sequence = document.createElement("div");
      sequence.className = "chain-sequence";
      chain.items.forEach((item, i) => {
        if (i > 0 && item.change) {
          sequence.appendChild(buildChangeConnector(item.change));
        }
        sequence.appendChild(buildCaptureCard(item));
      });
      section.appendChild(sequence);
    }

    return section;
  }

  function buildIsolatedSection(items) {
    const section = document.createElement("section");
    section.className = "isolated-section";

    const heading = document.createElement("h2");
    heading.textContent = "Isolated captures";
    const note = document.createElement("p");
    note.className = "isolated-note";
    note.textContent = "Logged, but no linked version has turned up yet.";
    section.appendChild(heading);
    section.appendChild(note);

    const grid = document.createElement("div");
    grid.className = "isolated-grid";
    items.forEach(item => {
      const card = buildCaptureCard(item);
      card.classList.add("isolated-card");
      grid.appendChild(card);
    });
    section.appendChild(grid);
    return section;
  }

  function chainStartDate(chain) {
    return chain.items.reduce((min, it) => (it.date < min ? it.date : min), chain.items[0].date);
  }

  function render() {
    const log = document.getElementById("log");
    log.innerHTML = "";

    const hasChains = typeof chains !== "undefined" && chains.length > 0;
    const hasIsolated = typeof isolatedCaptures !== "undefined" && isolatedCaptures.length > 0;

    if (!hasChains && !hasIsolated) {
      log.innerHTML = "<p class='empty'>No captures yet.</p>";
      return;
    }

    if (hasChains) {
      const sorted = chains.slice().sort((a, b) => chainStartDate(b).localeCompare(chainStartDate(a)));
      sorted.forEach(chain => log.appendChild(buildChainSection(chain)));
    }

    if (hasIsolated) {
      const sorted = isolatedCaptures.slice().sort((a, b) => b.date.localeCompare(a.date));
      log.appendChild(buildIsolatedSection(sorted));
    }
  }

  render();
})();
