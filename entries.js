/*
  ENTRIES — this is the only file you'll edit most weeks.

  MOCKUP NOTE: the two chains and the isolated capture below are placeholder
  content for reviewing the new site structure. The captions describe the
  rabies/bat pattern and the measles/Secretary-of-Health pattern from the
  vision statement in general terms, but they are NOT transcriptions of your
  actual screenshots — swap in your real captures and real image files before
  this goes live. Delete this note once real content is in.

  DATA MODEL (per the Signal Drift vision statement, Final)

  The site's unit is no longer a single tagged screenshot. It's a
  COMMUNICATION CHAIN: two or more captures about the same underlying fact,
  plus the point(s) where the messaging visibly changed between them. A
  capture that never connects to another gets logged as ISOLATED instead —
  kept on file, but flagged as not (yet) part of a pattern.

  This model deliberately does NOT label captures by where they came from
  (no "national" / "hyperlocal" / etc. field). The site only tracks what
  changed and, for contested chains, what the versions disagree about — not
  which kind of source said it.

  ---- CHAINS ----

  Add new chains to the `chains` array below.

  id:            unique, e.g. "c03". Never reused.
  relationship:  "revised" | "contested" | "both"
                   revised   — the story's shape changed through
                               simplification, omission, or added/changed
                               facts as it moved. Rendered as a sequence.
                   contested — two (or more) versions disagree about which
                               facts are true in the first place. Rendered
                               as a fork from one shared point of divergence.
                   both      — it's honestly some of each. Rendered as a fork,
                               same as "contested."
  divergencePoint: required for "contested" and "both" chains only. One
                   sentence naming the shared fact or moment the versions
                   disagree about. Leave null for "revised" chains.
  items:         ordered list of captures in this chain. Each item:
                   date:    "YYYY-MM-DD", the day you captured it.
                   image:   filename inside images/.
                   alt:     one plain sentence describing the image, for
                            accessibility.
                   caption: your annotation on this specific capture —
                            what it says, how it frames things.
                   change:  the point of change. For a "revised" chain,
                            what shifted from the PREVIOUS item to this one
                            (leave null on the first item — nothing to
                            compare yet). For a "contested"/"both" chain,
                            how THIS version diverges from divergencePoint
                            (every item should have one, including the
                            first, since they're being compared to the
                            shared fact, not to each other in sequence).

  ---- ISOLATED CAPTURES ----

  Add to the `isolatedCaptures` array. Same fields as a chain item (id,
  date, image, alt, caption), no `change` field — there's nothing yet to
  compare it against. If a chain forms later, move it into `chains` and
  delete it from here.
*/

const chains = [
  {
    id: "c01",
    relationship: "revised",
    divergencePoint: null,
    items: [
      {
        date: "2026-09-02",
        image: "images/mock-a1.svg",
        alt: "Placeholder — national outlet post reporting roughly 300 people exposed to rabies at a petting zoo.",
        caption: "First capture: a national post reporting the exposure count and the source of the exposure.",
        change: null
      },
      {
        date: "2026-09-04",
        image: "images/mock-a2.svg",
        alt: "Placeholder — official health alert about the same exposure.",
        caption: "An official alert on the same event, addressed to people who may have been exposed.",
        change: "Point of change: the petting-zoo detail drops out; the alert is framed around exposure and next steps rather than the original event."
      },
      {
        date: "2026-09-06",
        image: "images/mock-a3.svg",
        alt: "Placeholder — local community post about a related, nearby case.",
        caption: "A local post about a related case turning up nearby, written for a neighborhood audience.",
        change: "Point of change: the original exposure count and event are gone entirely; the post now reads as a new, standalone local concern rather than a continuation of the first story."
      }
    ]
  },
  {
    id: "c02",
    relationship: "contested",
    divergencePoint: "Whether the reported measles deaths reflect a genuine active outbreak worth public concern.",
    items: [
      {
        date: "2026-09-08",
        image: "images/mock-b1.svg",
        alt: "Placeholder — outlet coverage reporting confirmed measles deaths.",
        caption: "Coverage reporting confirmed deaths tied to the outbreak, presented as straightforward factual reporting.",
        change: "Diverges by treating the death count itself as the newsworthy fact, without commentary on how the story is being told."
      },
      {
        date: "2026-09-09",
        image: "images/mock-b2.svg",
        alt: "Placeholder — statement from a health official calling the coverage fearmongering.",
        caption: "A health official's public statement calling the same coverage fearmongering.",
        change: "Diverges by disputing the framing of the first version rather than the death count itself — an opinion-based counter-narrative layered on top of the factual reporting."
      }
    ]
  }
];

const isolatedCaptures = [
  {
    id: "i01",
    date: "2026-09-10",
    image: "images/mock-isolated.svg",
    alt: "Placeholder — a single health-related capture with no linked version yet.",
    caption: "A single capture that hasn't turned up a linked version at another point yet. Kept on file in case one surfaces later."
  }
];
