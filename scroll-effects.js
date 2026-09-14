/*
  SCROLL EFFECTS — purely presentational, on top of the static/rendered page.
  You shouldn't need to edit this file. It:
    1. Fills the "signal meter" bar pinned to the top of the page as you scroll.
    2. Adds a "scrolled" class to the nav once you've moved past the top, so it
       gets a background + shadow instead of floating over content.
    3. Fades/rises each chain, the isolated section, and each vision-page
       section into view the first time it's scrolled to ("reveal").
    4. Animates the dashed point-of-change connector lines in as they scroll
       into view ("draw-line").

  Runs after entries.js/app.js (on index.html) so the chain markup already
  exists in the DOM by the time this queries for it. On vision.html, where
  there's no app.js, it just finds the static sections instead.
*/

(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- signal meter ----
  const meter = document.querySelector(".signal-meter");
  function updateMeter() {
    if (!meter) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const pct = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
    meter.style.setProperty("--progress", pct.toFixed(4));
  }
  window.addEventListener("scroll", updateMeter, { passive: true });
  window.addEventListener("resize", updateMeter);
  updateMeter();

  // ---- nav elevation ----
  const nav = document.querySelector(".site-nav");
  function updateNav() {
    if (!nav) return;
    nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  if (reduceMotion) return; // CSS already shows reveal/draw-line targets in their final state

  // ---- tag reveal + draw-line targets ----
  document
    .querySelectorAll(".chain, .isolated-section, .vision-page section, .vision-lead")
    .forEach(el => el.classList.add("reveal"));

  document
    .querySelectorAll(".change-connector, .branch-change-text")
    .forEach(el => el.classList.add("draw-line"));

  const targets = document.querySelectorAll(".reveal, .draw-line");

  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach(el => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(el => observer.observe(el));
})();
