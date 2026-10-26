/*
  ARRIVAL — when each chain capture was published, as its record shows it,
  so the log can say how long each version took to reach me.

  Transcribed by hand from the "published" line of each record in entries.js.
  Nothing here is looked up from outside. When a record only shows a date, a
  relative stamp ("1d", "8h ago") or nothing at all, that's what's kept.

    pub    ISO date or date-time, local time as shown on the capture
    basis  "published" — publish time shown
           "updated"   — only an updated time shown, so the delay runs from the update
           "date"      — date only, so the delay is counted in days
           "stamp"     — a relative stamp, kept as written
           "none"      — no publish time visible
    stamp  the relative stamp, for basis "stamp"
    tz     set when the capture doesn't show a time zone for a clock time

  firstImpression: one line written at the moment of capture. Starts with new
  captures. Earlier captures don't have one, and the record says so.
*/

const arrival = {
  // Measles deaths, Pennsylvania
  "IMG_0532": { pub: "2026-08-26T09:40", basis: "published" },
  "IMG_0582": { pub: "2026-08-28T08:01", basis: "published" },
  "IMG_0578": { pub: "2026-08-29T18:28", basis: "published" },
  "IMG_0828": { pub: "2026-08-30T19:20", basis: "published" },
  "IMG_0695": { pub: "2026-09-04T15:06", basis: "updated" },
  "IMG_0820": { pub: "2026-09-13T13:51", basis: "published" },
  "IMG_1202": { pub: "2026-09-23T12:34", basis: "published" },
  "Pennsylvania confirms a fifth death associated with widening measles outbreak": { pub: "2026-09-30", basis: "date" },

  // Thyroid tablet recall
  "IMG_0514": { basis: "stamp", stamp: "now" },
  "IMG_0515": { pub: "2026-08-25T11:47", basis: "updated", tz: "not shown" },
  "IMG_1050": { basis: "stamp", stamp: "6 hours" },

  // CDC fatigue report
  "IMG_0830": { pub: "2026-09-13T10:00", basis: "published" },
  "IMG_0834": { pub: "2026-09-14", basis: "date" },

  // Young donors' stem cells
  "IMG_0570": { basis: "stamp", stamp: "9h ago (top card)" },
  "IMG_0571": { pub: "2026-02-27", basis: "date" },

  // One Prevention story, two headlines
  "IMG_0697": { basis: "none" },
  "IMG_0698": { basis: "stamp", stamp: "8h ago" },

  // Rabies
  "IMG_0729": { basis: "stamp", stamp: "1d" },
  "IMG_0776": { basis: "stamp", stamp: "2 hours" },
  "IMG_0778": { basis: "stamp", stamp: "1d" },
  "IMG_1155": { pub: "2026-09-25T16:09", basis: "published" },

  // Dengue, Hillsborough County
  "IMG_0819": { pub: "2026-09-10", basis: "date" },
  "IMG_1090": { pub: "2026-09-25T14:39", basis: "published" },
  "IMG_1091": { pub: "2026-09-18T17:21", basis: "published" },

  // Brain-eating amoeba, North Carolina
  "IMG_1096": { pub: "2026-08-28T18:16", basis: "published" },
  "IMG_1097": { pub: "2026-08-28", basis: "date" },

  // A flu season without a push
  "IMG_0586": { pub: "2026-08-28T07:00", basis: "published" },
  "IMG_1094": { pub: "2026-09-23T14:38", basis: "published" },

  // Orange County drill outbreak
  "IMG_1201": { pub: "2026-09-15T16:42", basis: "published" },
  "IMG_1200": { pub: "2026-09-24", basis: "date" },

  // Mayim Bialik and GLP-1, one article
  "IMG_0821": { pub: "2026-09-10", basis: "updated" },
  "IMG_1608": { pub: "2026-10-21", basis: "updated" }
};

const reader = { place: "Hudson Valley" };
