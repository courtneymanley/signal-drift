/*
  ENTRIES — generated from the annotation working file. Edit the words here
  freely; the structure is what app.js reads.

  Every capture carries two separate things (per the CMM 502 annotation sheet):
    record      source, format, byline, published, captured. A record could be
                written by someone who has never seen the rest of the collection.
    annotation  what the image can't say. Its form depends on the capture's
                status under the Capture Rule:

      chains             marginalia: numbered pins on the capture, notes in the margin
                         (marks: [{x, y, note}], x/y are % of the screenshot)
                         plus `change`, the point of change from the capture before
      sequences          three captures in order, no words (records only)
      grids              several isolated captures, one caption for the pile
      crops              the whole capture small, the detail enlarged
                         (boxes: [{x0, y0, x1, y1, label, detail}])
      isolatedCaptures   a few words placed inside the frame (words: {text, x, y})
      outOfScope         the default caption below, on purpose

  Redactions are baked into the image files, not drawn over them in CSS, so
  nothing covered here can be recovered by saving the image.
*/

const chains = [
  {
    "id": "c01",
    "title": "Measles deaths, Pennsylvania",
    "relationship": "both",
    "divergencePoint": "How many people measles has killed in Pennsylvania this year, and whether each death counts.",
    "items": [
      {
        "id": "IMG_0532",
        "date": "2026-08-26",
        "image": "images/IMG_0532.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: CBS News. Headline: 2 fatal measles cases reported in Pennsylvania amid record high cases in the U.S.",
        "record": {
          "source": "CBS News",
          "format": "Apple News video article",
          "byline": "none visible",
          "published": "Aug 26, 2026, 9:40 am EDT",
          "captured": "2026-08-26 14:04"
        },
        "role": "start",
        "marks": [
          {
            "x": 30,
            "y": 27,
            "note": "Counted as “fatal cases” in the headline. The body says “deaths.”"
          },
          {
            "x": 19,
            "y": 49,
            "note": "Published 9:40 am. I captured it at 2:04 pm the same day."
          },
          {
            "x": 40,
            "y": 83,
            "note": "“Linked to measles.” Watch that phrase shift in the captures below."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0582",
        "date": "2026-08-30",
        "image": "images/IMG_0582.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: CBS News. Headline: What to know about the measles-related deaths in Pennsylvania",
        "record": {
          "source": "CBS News",
          "format": "Apple News video explainer",
          "byline": "none visible",
          "published": "Aug 28, 2026, 8:01 am EDT",
          "captured": "2026-08-30 12:25"
        },
        "role": "revises",
        "marks": [
          {
            "x": 50,
            "y": 31,
            "note": "Now “measles-related” deaths."
          },
          {
            "x": 46,
            "y": 76,
            "note": "“Measles-associated.” A third wording in two days, and the first capture that names the county."
          },
          {
            "x": 40,
            "y": 87,
            "note": "Same outlet as the capture above. The count hasn't changed. The wording has."
          }
        ],
        "change": "Point of change: “fatal cases” becomes “measles-related” and then “measles-associated” deaths. The number holds at two. The certainty in the wording softens."
      },
      {
        "id": "IMG_0578",
        "date": "2026-08-30",
        "image": "images/IMG_0578.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: HuffPost. Headline: RFK Jr. Torches 'Demagogue' Politicians And Media 'Trying To Scare' Americans About Measles",
        "record": {
          "source": "HuffPost",
          "format": "Apple News article",
          "byline": "Pocharapon Neammanee",
          "published": "08/29/2026, 6:28 pm EDT",
          "captured": "2026-08-30 12:23"
        },
        "role": "contests",
        "marks": [
          {
            "x": 33,
            "y": 25,
            "note": "Posted the evening after the explainer."
          },
          {
            "x": 65,
            "y": 33,
            "note": "The official version: the scare is the story."
          },
          {
            "x": 48,
            "y": 44,
            "note": "No count and no county. The dispute is about whether any of it can be checked."
          }
        ],
        "change": "Diverges: this version doesn't dispute the deaths on their own terms. It disputes the coverage. It never names Pennsylvania, so the link to the captures above is timing and topic."
      },
      {
        "id": "IMG_0828",
        "date": "2026-09-14",
        "image": "images/IMG_0828.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Masthead not in frame. Headline: The measles-stricken mother who lost her newborn son",
        "record": {
          "source": "Masthead not in frame",
          "format": "Apple News article",
          "byline": "Tom Bartlett",
          "published": "Aug 30, 2026, 7:20 pm ET",
          "captured": "2026-09-14 16:45"
        },
        "role": "revises",
        "marks": [
          {
            "x": 50,
            "y": 61,
            "note": "The deaths get a family."
          },
          {
            "x": 71,
            "y": 77,
            "note": "“Controversy.” The first capture that names a dispute inside Pennsylvania."
          },
          {
            "x": 50,
            "y": 91,
            "note": "No masthead in frame. I can't name the outlet from this capture alone."
          }
        ],
        "change": "Point of change: a count becomes one family's story, and the word “controversy” shows up for the first time."
      },
      {
        "id": "IMG_0695",
        "date": "2026-09-04",
        "image": "images/IMG_0695.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: The Wall Street Journal. Headline: How the Death of a Newborn Has Inflamed a Debate Over Vaccination",
        "record": {
          "source": "The Wall Street Journal",
          "format": "Apple News article",
          "byline": "Jennifer Calfas",
          "published": "Sep 4, 2026, 3:06 pm EDT (updated)",
          "captured": "2026-09-04 16:06"
        },
        "role": "contests",
        "marks": [
          {
            "x": 48,
            "y": 28,
            "note": "A newborn, not a number."
          },
          {
            "x": 45,
            "y": 40,
            "note": "Two public offices, two findings. The coroner and the state disagree."
          },
          {
            "x": 40,
            "y": 79,
            "note": "The county from the explainer, now named as the outbreak's center."
          }
        ],
        "change": "Diverges: the disagreement moves inside government. A local coroner's finding contradicts the state's, so even the official version now has two versions."
      },
      {
        "id": "IMG_0820",
        "date": "2026-09-13",
        "image": "images/IMG_0820.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: NBC News. Headline: Pennsylvania woman dies from measles complications, state's third death this year",
        "record": {
          "source": "NBC News",
          "format": "Apple News article",
          "byline": "Jane Weaver",
          "published": "Sep 13, 2026, 1:51 pm EDT",
          "captured": "2026-09-13 17:49"
        },
        "role": "revises",
        "marks": [
          {
            "x": 20,
            "y": 82,
            "note": "Published 1:51 pm. Captured four hours later."
          },
          {
            "x": 44,
            "y": 69,
            "note": "“Third death this year.” Which deaths are in that count?"
          },
          {
            "x": 50,
            "y": 78,
            "note": "The frame widens from one county to the whole country."
          }
        ],
        "change": "Point of change: a new death and a running total. With the coroner and the state split on the newborn, I can't tell from these captures whether that death is one of the three."
      }
    ]
  },
  {
    "id": "c02",
    "title": "Thyroid tablet recall",
    "relationship": "both",
    "divergencePoint": "Whether a nationwide thyroid tablet recall happened, and how serious it is.",
    "items": [
      {
        "id": "IMG_0514",
        "date": "2026-08-25",
        "image": "images/IMG_0514.jpg",
        "w": 720,
        "h": 574,
        "alt": "Screenshot: NBC 5 Chicago, via Google. Headline: Thyroid pills recalled nationwide because they could be 'superpotent,' lead to hyperthyroidism",
        "record": {
          "source": "NBC 5 Chicago, via Google",
          "format": "Lock-screen notification",
          "byline": "none",
          "published": "\"now\"",
          "captured": "2026-08-25 20:47"
        },
        "role": "start",
        "marks": [
          {
            "x": 12,
            "y": 80,
            "note": "Delivered by Google, credited to a Chicago TV station."
          },
          {
            "x": 46,
            "y": 85,
            "note": "The whole story in three lines on a lock screen."
          },
          {
            "x": 89,
            "y": 77,
            "note": "“now.” No page, no guidance, no instructions yet."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0515",
        "date": "2026-08-25",
        "image": "images/IMG_0515.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: NBC Chicago. Headline: Thyroid tablets recalled because they could be 'superpotent,' lead to hyperthyroidism",
        "record": {
          "source": "NBC Chicago",
          "format": "Web article (nbcchicago.com)",
          "byline": "Francie Swidler",
          "published": "Aug 25, 2026, updated 11:47 am",
          "captured": "2026-08-25 20:47"
        },
        "role": "revises",
        "marks": [
          {
            "x": 13,
            "y": 38,
            "note": "Filed under Recalls. A local station covering a national recall."
          },
          {
            "x": 48,
            "y": 60,
            "note": "The one line a patient needs, and the alert left it out: don't stop taking it."
          },
          {
            "x": 60,
            "y": 68,
            "note": "Updated 11:47 am. The push reached me nine hours later."
          }
        ],
        "change": "Point of change: the alert drops the instruction. The article puts it back: don't stop the medication without talking to a doctor."
      },
      {
        "id": "IMG_1050",
        "date": "2026-09-23",
        "image": "images/IMG_1050.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: WOODTV.com and Google AI Overview. Headline: Thyroid medication recall classified under FDA's most urgent level",
        "record": {
          "source": "WOODTV.com and Google AI Overview",
          "format": "Google search results, opened from a notification",
          "byline": "WOODTV.com / Google",
          "published": "6 hours before capture",
          "captured": "2026-09-23 23:46"
        },
        "redaction": "Covered my own account photo.",
        "role": "contests",
        "marks": [
          {
            "x": 44,
            "y": 10,
            "note": "My own search, four weeks later, by manufacturer name."
          },
          {
            "x": 37,
            "y": 38,
            "note": "The news result: the recall is now at the FDA's most urgent level."
          },
          {
            "x": 46,
            "y": 65,
            "note": "Google's AI Overview, directly below it: no recent or major recall found."
          }
        ],
        "change": "Diverges: two versions on one screen. The news result says the recall escalated. The AI Overview says there's no recall to find. Neither the alert nor the article names the manufacturer, so my search is what connects them."
      }
    ]
  },
  {
    "id": "c03",
    "title": "CDC fatigue report",
    "relationship": "revised",
    "divergencePoint": null,
    "items": [
      {
        "id": "IMG_0830",
        "date": "2026-09-14",
        "image": "images/IMG_0830.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: NBC News. Headline: Why are Americans so tired so often? New CDC report highlights who's feeling it most",
        "record": {
          "source": "NBC News",
          "format": "Apple News video article",
          "byline": "Gina Vivinetto",
          "published": "Sep 13, 2026, 10:00 am EDT",
          "captured": "2026-09-14 16:47"
        },
        "role": "start",
        "marks": [
          {
            "x": 50,
            "y": 38,
            "note": "A stock photo. Remember it."
          },
          {
            "x": 45,
            "y": 64,
            "note": "The article's question is who."
          },
          {
            "x": 29,
            "y": 97,
            "note": "The number, in the body: about 71.5%."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0834",
        "date": "2026-09-14",
        "image": "images/IMG_0834.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: NBC News. Headline: CDC finds that nearly 3 in 4 U.S. adults report struggling with fatigue",
        "record": {
          "source": "NBC News",
          "format": "Apple News video segment",
          "byline": "none visible",
          "published": "Mon, Sep 14",
          "captured": "2026-09-14 16:49"
        },
        "role": "revises",
        "marks": [
          {
            "x": 50,
            "y": 36,
            "note": "Same photo, now a video segment."
          },
          {
            "x": 65,
            "y": 51,
            "note": "71.5% becomes “nearly 3 in 4.”"
          },
          {
            "x": 48,
            "y": 85,
            "note": "Who's feeling it drops out. Sleep tips come in."
          }
        ],
        "change": "Point of change: the percentage rounds up into a headline, and the question moves from who's tired to what you can do about it."
      }
    ]
  },
  {
    "id": "c04",
    "title": "Young donors' stem cells",
    "relationship": "revised",
    "divergencePoint": null,
    "items": [
      {
        "id": "IMG_0570",
        "date": "2026-08-30",
        "image": "images/IMG_0570.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Apple News editors. Headline: Women may have a window of opportunity to prevent Alzheimer's (plus a New Scientist teaser on teenage stem cells)",
        "record": {
          "source": "Apple News editors",
          "format": "Curated hub, \"Health & Wellness / The Science of Aging\"",
          "byline": "Apple News editors",
          "published": "9h ago (top card)",
          "captured": "2026-08-30 12:19"
        },
        "role": "start",
        "marks": [
          {
            "x": 37,
            "y": 27,
            "note": "Picked by editors for a section called “The Science of Aging.”"
          },
          {
            "x": 33,
            "y": 88,
            "note": "The teaser says “teenage.”"
          },
          {
            "x": 77,
            "y": 87,
            "note": "Same photo as the article below."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0571",
        "date": "2026-08-30",
        "image": "images/IMG_0571.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: New Scientist. Headline: Frailty can be eased with an infusion of stem cells from young people",
        "record": {
          "source": "New Scientist",
          "format": "Apple News article",
          "byline": "David Cox",
          "published": "27 February 2026",
          "captured": "2026-08-30 12:19"
        },
        "role": "revises",
        "marks": [
          {
            "x": 45,
            "y": 40,
            "note": "The article says “young people.”"
          },
          {
            "x": 25,
            "y": 64,
            "note": "Dated February. It reached me at the end of August."
          },
          {
            "x": 50,
            "y": 79,
            "note": "The same two walkers on the coast."
          }
        ],
        "change": "Point of change: the teaser makes the donors younger and the story newer. The article is six months old."
      }
    ]
  },
  {
    "id": "c05",
    "title": "One Prevention story, two headlines",
    "relationship": "revised",
    "divergencePoint": null,
    "items": [
      {
        "id": "IMG_0697",
        "date": "2026-09-04",
        "image": "images/IMG_0697.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Prevention. Headline: The Invincibility Fallacy",
        "record": {
          "source": "Prevention",
          "format": "Apple News article",
          "byline": "Beth Howard",
          "published": "not visible",
          "captured": "2026-09-04 16:13"
        },
        "role": "start",
        "marks": [
          {
            "x": 37,
            "y": 34,
            "note": "An essay title."
          },
          {
            "x": 65,
            "y": 45,
            "note": "The argument: a sense of control can be false."
          },
          {
            "x": 70,
            "y": 76,
            "note": "The cape."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0698",
        "date": "2026-09-04",
        "image": "images/IMG_0698.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Apple News feed (Prevention card). Headline: I Was the 'Epitome of Health', So I Skipped One Routine Screening. I Woke Up to a Nightmare.",
        "record": {
          "source": "Apple News feed (Prevention card)",
          "format": "Apple News feed",
          "byline": "Beth Howard",
          "published": "8h ago",
          "captured": "2026-09-04 16:13"
        },
        "role": "revises",
        "marks": [
          {
            "x": 38,
            "y": 16,
            "note": "In the feed, a first-person screening story."
          },
          {
            "x": 25,
            "y": 25,
            "note": "Same byline."
          },
          {
            "x": 77,
            "y": 17,
            "note": "Same cape."
          }
        ],
        "change": "Point of change: the feed card turns an argument into a confession. Same writer, same image, captured 13 seconds apart."
      }
    ]
  },
  {
    "id": "c06",
    "title": "Rabies",
    "relationship": "revised",
    "divergencePoint": null,
    "items": [
      {
        "id": "IMG_0729",
        "date": "2026-09-06",
        "image": "images/IMG_0729.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: CNN. Headline: Nearly 300 people exposed to goats with rabies at mobile petting zoo",
        "record": {
          "source": "CNN",
          "format": "Facebook post",
          "byline": "page post",
          "published": "1d before capture",
          "captured": "2026-09-06 12:59"
        },
        "redaction": "Covered the top strip, which is the end of an unrelated post about a child. It isn't part of this story.",
        "role": "start",
        "marks": [
          {
            "x": 16,
            "y": 25,
            "note": "Posted a day before I captured it."
          },
          {
            "x": 33,
            "y": 28,
            "note": "North Carolina. The place is only in the post text."
          },
          {
            "x": 46,
            "y": 84,
            "note": "The graphic carries the number and the goats. No state."
          }
        ],
        "change": null
      },
      {
        "id": "IMG_0776",
        "date": "2026-09-10",
        "image": "images/IMG_0776.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: CDC (.gov), via Google. Headline: Nationwide Increase in Reported Human Rabies Exposures: Rabies Post-exposure Prophylaxis Administration",
        "record": {
          "source": "CDC (.gov), via Google",
          "format": "Google search result, opened from a notification",
          "byline": "CDC Health Alert Network",
          "published": "2 hours before capture",
          "captured": "2026-09-10 18:46"
        },
        "redaction": "Covered my own account photo.",
        "role": "revises",
        "marks": [
          {
            "x": 23,
            "y": 23,
            "note": "It reached me as a Google notification, not a news story."
          },
          {
            "x": 46,
            "y": 34,
            "note": "Nationwide. No state, no event, no animal."
          },
          {
            "x": 65,
            "y": 52,
            "note": "“In response to recent…” The reason is cut off at the edge."
          }
        ],
        "change": "Point of change: the petting zoo, the goats and North Carolina all drop out. What's left is a national trend."
      },
      {
        "id": "IMG_0778",
        "date": "2026-09-11",
        "image": "images/IMG_0778.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: 101.5 WPDH. Headline: Bat tests positive for rabies in the Hudson Valley",
        "record": {
          "source": "101.5 WPDH",
          "format": "Facebook post (Local News)",
          "byline": "page post",
          "published": "1d before capture",
          "captured": "2026-09-11 10:18"
        },
        "redaction": "Covered the reaction counts from the post above it.",
        "role": "revises",
        "marks": [
          {
            "x": 77,
            "y": 14,
            "note": "Hudson Valley health officials. A new place and a new animal."
          },
          {
            "x": 50,
            "y": 54,
            "note": "Local news, in my region."
          },
          {
            "x": 50,
            "y": 70,
            "note": "The details are in the comments, not the post."
          }
        ],
        "change": "Point of change: the national trend comes back as a local event. It reads as its own story, not a continuation of the first."
      }
    ]
  }
];

const sequences = [
  {
    "id": "s01",
    "items": [
      {
        "id": "IMG_0586",
        "date": "2026-08-30",
        "image": "images/IMG_0586.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: HuffPost (Wellness). Headline: You Can Get Your Flu Shot Right Now, Despite The Government's Radio Silence",
        "record": {
          "source": "HuffPost (Wellness)",
          "format": "Apple News article",
          "byline": "Jillian Wilson",
          "published": "08/28/2026, 7:00 am EDT",
          "captured": "2026-08-30 12:26"
        }
      },
      {
        "id": "IMG_0823",
        "date": "2026-09-13",
        "image": "images/IMG_0823.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: HuffPost (Wellness). Headline: The Newest Covid Shot Is Here. Doctors Suggest The Best Time To Get It For The Most Protection",
        "record": {
          "source": "HuffPost (Wellness)",
          "format": "Apple News article",
          "byline": "Jillian Wilson",
          "published": "09/13/2026, 7:00 am EDT",
          "captured": "2026-09-13 17:51"
        }
      },
      {
        "id": "IMG_0833",
        "date": "2026-09-14",
        "image": "images/IMG_0833.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: STAT. Headline: Kennedy to deliver keynote for anti-vaccine group he once led",
        "record": {
          "source": "STAT",
          "format": "Apple News article",
          "byline": "Isabella Cueto",
          "published": "Sep 14, 2026",
          "captured": "2026-09-14 16:49"
        }
      }
    ]
  }
];

const grids = [
  {
    "id": "g01",
    "title": "No threat claim",
    "caption": "Four captures from the same five days that don't meet my own Capture Rule. None of them says anyone else is at risk. They came through the same feed, in the same slot, as the outbreak coverage above, and that's the only reason they're here. Kept as contrast, not as data.",
    "items": [
      {
        "id": "IMG_0529",
        "date": "2026-08-26",
        "image": "images/IMG_0529.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Women's Health. Headline: Here's Exactly How to Prepare and Drink Tea for Maximum Health Benefits",
        "record": {
          "source": "Women's Health",
          "format": "Apple News article",
          "byline": "Korin Miller",
          "published": "not visible",
          "captured": "2026-08-26 14:01"
        }
      },
      {
        "id": "IMG_0553",
        "date": "2026-08-28",
        "image": "images/IMG_0553.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Real Simple. Headline: 5 Signs You're in Survival Mode, Even If Your Life Looks Fine on the Outside",
        "record": {
          "source": "Real Simple",
          "format": "Apple News article",
          "byline": "Lauren Barnhill",
          "published": "Aug 27, 2026",
          "captured": "2026-08-28 15:59"
        }
      },
      {
        "id": "IMG_0576",
        "date": "2026-08-30",
        "image": "images/IMG_0576.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Real Simple. Headline: 8 Subtle Signs You're Not Washing Your Hair Enough, According to Dermatologists",
        "record": {
          "source": "Real Simple",
          "format": "Apple News article",
          "byline": "Wendy Rose Gould",
          "published": "Aug 30, 2026 (updated)",
          "captured": "2026-08-30 12:21"
        }
      },
      {
        "id": "IMG_0577",
        "date": "2026-08-30",
        "image": "images/IMG_0577.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Prevention. Headline: The Science Behind Chronic Pain, and How to Finally Get Relief",
        "record": {
          "source": "Prevention",
          "format": "Apple News article",
          "byline": "Marisa Cohen",
          "published": "not visible",
          "captured": "2026-08-30 12:22"
        }
      }
    ]
  },
  {
    "id": "g02",
    "title": "One patient carries the headline",
    "caption": "Three captures where one person's scare is the headline. Two are by the same Newsweek writer, published the same day. None connects to another version of its underlying fact, so each stays isolated. Together they show a format, the near miss, that the feed keeps serving.",
    "items": [
      {
        "id": "IMG_0531",
        "date": "2026-08-26",
        "image": "images/IMG_0531.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: USA Today. Headline: Busy Philipps found a rare tumor thanks to this full-body scan. Do you need one?",
        "record": {
          "source": "USA Today",
          "format": "Apple News article",
          "byline": "David Oliver",
          "published": "Aug 26, 2026, 11:00 am EDT",
          "captured": "2026-08-26 14:04"
        }
      },
      {
        "id": "IMG_0581",
        "date": "2026-08-30",
        "image": "images/IMG_0581.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Newsweek. Headline: Woman almost skipped routine medical appointment, then doctor sees something",
        "record": {
          "source": "Newsweek",
          "format": "Apple News article",
          "byline": "Rachael O'Connor",
          "published": "Aug 28, 2026",
          "captured": "2026-08-30 12:24"
        }
      },
      {
        "id": "IMG_0584",
        "date": "2026-08-30",
        "image": "images/IMG_0584.jpg",
        "w": 720,
        "h": 1565,
        "alt": "Screenshot: Newsweek. Headline: Mom Cares for Sick Toddler, Then Horrifying Symptoms Begin",
        "record": {
          "source": "Newsweek",
          "format": "Apple News article",
          "byline": "Rachael O'Connor",
          "published": "Aug 28, 2026",
          "captured": "2026-08-30 12:25"
        }
      }
    ]
  }
];

const crops = [
  {
    "id": "IMG_0583",
    "date": "2026-08-30",
    "image": "images/IMG_0583.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Newsweek. Headline: Just two injections could reverse Alzheimer's, not just slow it",
    "record": {
      "source": "Newsweek",
      "format": "Apple News article",
      "byline": "Thomas Westerholm",
      "published": "Aug 28, 2026",
      "captured": "2026-08-30 12:25"
    },
    "boxes": [
      {
        "x0": 3,
        "y0": 83,
        "x1": 97,
        "y1": 92.5,
        "label": "Body copy",
        "detail": "images/IMG_0583-detail1.jpg"
      }
    ],
    "annotation": "The mice are in the body copy. The headline leaves them out."
  },
  {
    "id": "IMG_0551",
    "date": "2026-08-28",
    "image": "images/IMG_0551.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Facebook page \"Democrats\". Headline: 30,000 pounds of imported beef recalled as USDA warns of \"death\"",
    "record": {
      "source": "Facebook page \"Democrats\"",
      "format": "Facebook post with graphic",
      "byline": "page post",
      "published": "23h before capture",
      "captured": "2026-08-28 11:15"
    },
    "redaction": "Covered the unrelated posts from other pages below the one I captured.",
    "boxes": [
      {
        "x0": 2,
        "y0": 12.4,
        "x1": 98,
        "y1": 17.2,
        "label": "Post text",
        "detail": "images/IMG_0551-detail1.jpg"
      },
      {
        "x0": 6,
        "y0": 66.9,
        "x1": 94,
        "y1": 72.3,
        "label": "Graphic",
        "detail": "images/IMG_0551-detail2.jpg"
      }
    ],
    "annotation": "The post text says “serious adverse health consequ…” and cuts off. The graphic says “death,” in quotation marks, next to a portrait. A political page is the teller here, not the agency.",
    "watch": "Contested candidate. The agency's own recall notice would complete a chain."
  },
  {
    "id": "IMG_0696",
    "date": "2026-09-04",
    "image": "images/IMG_0696.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: People. Headline: 6-Year-Old Boy 'Most Likely' Dies from Rare 19th Century Disease Caused by Lack of Vitamin C",
    "record": {
      "source": "People",
      "format": "Apple News article",
      "byline": "Gina Kalsi",
      "published": "Sep 3, 2026",
      "captured": "2026-09-04 16:12"
    },
    "boxes": [
      {
        "x0": 4,
        "y0": 46.5,
        "x1": 96,
        "y1": 54.6,
        "label": "The death",
        "detail": "images/IMG_0696-detail1.jpg"
      },
      {
        "x0": 4,
        "y0": 58.6,
        "x1": 60,
        "y1": 61.6,
        "label": "Published",
        "detail": "images/IMG_0696-detail2.jpg"
      }
    ],
    "annotation": "He died in August 2024. This ran in September 2026. The two years in between are the part I didn't get."
  }
];

const isolatedCaptures = [
  {
    "id": "W01_D01_01_MMH",
    "date": "2026-08-25",
    "image": "images/W01_D01_01_MMH.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: NBC News. Headline: What is postpartum psychosis? The mental health condition is at the center of the Lindsay Clancy trial",
    "record": {
      "source": "NBC News",
      "format": "Apple News video article",
      "byline": "Erika Edwards (reporting, per deck)",
      "published": "Mon, Aug 24",
      "captured": "2026-08-25 17:26"
    },
    "words": {
      "text": "The trial is why this explainer exists.",
      "x": 5,
      "y": 29
    }
  },
  {
    "id": "W01_D01_01_PHARM",
    "date": "2026-08-25",
    "image": "images/W01_D01_01_PHARM.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: BBC Science Focus. Headline: Why you should be worried about 'Godzilla Ozempic' right now",
    "record": {
      "source": "BBC Science Focus",
      "format": "Apple News article, Analysis",
      "byline": "Hatty Willmoth",
      "published": "not visible",
      "captured": "2026-08-25 16:41"
    },
    "words": {
      "text": "A nickname standing in for a drug name.",
      "x": 5,
      "y": 70
    },
    "watch": "Possible link with the Bialik GLP-1 capture, but only by topic so far."
  },
  {
    "id": "IMG_0552",
    "date": "2026-08-28",
    "image": "images/IMG_0552.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Gathered. Headline: The deadly signs in your hands you should never ignore",
    "record": {
      "source": "Gathered",
      "format": "Apple News article",
      "byline": "Gail Shortland",
      "published": "not visible",
      "captured": "2026-08-28 15:56"
    },
    "words": {
      "text": "Deadly, but for whom?",
      "x": 5,
      "y": 30
    }
  },
  {
    "id": "IMG_0569",
    "date": "2026-08-30",
    "image": "images/IMG_0569.jpg",
    "w": 720,
    "h": 1198,
    "alt": "Screenshot: CNN. Headline: Riders suffer life-threatening brain injuries after braving famous Six Flags roller coaster",
    "record": {
      "source": "CNN",
      "format": "Facebook post (CNN Investigates)",
      "byline": "page post",
      "published": "9h before capture",
      "captured": "2026-08-30 10:43"
    },
    "words": {
      "text": "Years of injuries, one feed post.",
      "x": 5,
      "y": 62
    }
  },
  {
    "id": "IMG_0572",
    "date": "2026-08-30",
    "image": "images/IMG_0572.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Popular Mechanics. Headline: Your Nightmares Might Slowly Be Scaring You to Death, and Sleep Scientists Think They Know Why",
    "record": {
      "source": "Popular Mechanics",
      "format": "Apple News article",
      "byline": "Ashley Stimpson",
      "published": "not visible",
      "captured": "2026-08-30 12:20"
    },
    "words": {
      "text": "Hedged headline. Unhedged art.",
      "x": 5,
      "y": 86
    }
  },
  {
    "id": "IMG_0573",
    "date": "2026-08-30",
    "image": "images/IMG_0573.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: The Wall Street Journal. Headline: Baby Boomers Are Smoking More Pot. Their Neighbors Are Fuming.",
    "record": {
      "source": "The Wall Street Journal",
      "format": "Apple News article",
      "byline": "Ellen Gamerman",
      "published": "Aug 24, 2026 (updated)",
      "captured": "2026-08-30 12:20"
    },
    "words": {
      "text": "The health angle is in the photo caption.",
      "x": 5,
      "y": 71
    },
    "watch": "Boundary. Health-adjacent at best."
  },
  {
    "id": "IMG_0574",
    "date": "2026-08-30",
    "image": "images/IMG_0574.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: CBS News / KFF Health News. Headline: Trump puts autistic kids in the spotlight and cuts agencies built to protect them",
    "record": {
      "source": "CBS News / KFF Health News",
      "format": "Apple News video article",
      "byline": "Claire Sibonney",
      "published": "Aug 24, 2026",
      "captured": "2026-08-30 12:20"
    },
    "words": {
      "text": "A policy cut, told through one child.",
      "x": 5,
      "y": 64
    }
  },
  {
    "id": "IMG_0575",
    "date": "2026-08-30",
    "image": "images/IMG_0575.jpg",
    "w": 720,
    "h": 817,
    "alt": "Screenshot: Popular Mechanics. Headline: 450,000 Americans May Have a Bizarre Meat Allergy. Now the Tick Behind It Is Spreading.",
    "record": {
      "source": "Popular Mechanics",
      "format": "Apple News+ card",
      "byline": "Manasee Wagh",
      "published": "4h ago",
      "captured": "2026-08-30 12:21"
    },
    "words": {
      "text": "A tick story, illustrated with steak.",
      "x": 5,
      "y": 22
    }
  },
  {
    "id": "IMG_0579",
    "date": "2026-08-30",
    "image": "images/IMG_0579.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: PBS News (Associated Press). Headline: Ebola outbreak in Congo spreads to 2 new health zones, bringing total to 60 areas affected",
    "record": {
      "source": "PBS News (Associated Press)",
      "format": "Apple News article",
      "byline": "Associated Press",
      "published": "Aug 28, 2026, 5:16 pm EDT",
      "captured": "2026-08-30 12:24"
    },
    "words": {
      "text": "June photo. August count.",
      "x": 5,
      "y": 20
    }
  },
  {
    "id": "IMG_0580",
    "date": "2026-08-30",
    "image": "images/IMG_0580.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Bloomberg Businessweek. Headline: A Breakthrough Pancreatic Cancer Drug Marks a New Era for Treatment",
    "record": {
      "source": "Bloomberg Businessweek",
      "format": "Apple News article",
      "byline": "Robert Langreth",
      "published": "Aug 26, 2026",
      "captured": "2026-08-30 12:24"
    },
    "words": {
      "text": "A cure story from the markets desk.",
      "x": 30,
      "y": 62
    }
  },
  {
    "id": "IMG_0585",
    "date": "2026-08-30",
    "image": "images/IMG_0585.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Newsweek. Headline: What you eat before age 2 may affect your health 70 years later",
    "record": {
      "source": "Newsweek",
      "format": "Apple News article",
      "byline": "Daniella Gray",
      "published": "Aug 28, 2026",
      "captured": "2026-08-30 12:26"
    },
    "words": {
      "text": "Seventy years, sold as today's news.",
      "x": 5,
      "y": 42
    }
  },
  {
    "id": "IMG_0588",
    "date": "2026-08-30",
    "image": "images/IMG_0588.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: NBC News, \"The Cost of Denial\". Headline: Patient battles insurance over coverage for tumor removal",
    "record": {
      "source": "NBC News, \"The Cost of Denial\"",
      "format": "Apple News video article",
      "byline": "Anne Thompson (reporting)",
      "published": "Thu, Aug 27",
      "captured": "2026-08-30 12:28"
    },
    "words": {
      "text": "The series title names the system.",
      "x": 5,
      "y": 26
    }
  },
  {
    "id": "IMG_0589",
    "date": "2026-08-30",
    "image": "images/IMG_0589.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Stateline. Headline: More rural hospital closures would mean long drives for pregnant women seeking obstetric care",
    "record": {
      "source": "Stateline",
      "format": "Apple News article",
      "byline": "Shalina Chatlani",
      "published": "Aug 28, 2026",
      "captured": "2026-08-30 12:28"
    },
    "words": {
      "text": "Here, distance is the health outcome.",
      "x": 5,
      "y": 84
    }
  },
  {
    "id": "IMG_0590",
    "date": "2026-08-30",
    "image": "images/IMG_0590.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: NPR. Headline: She told no one about her agony except ChatGPT. What her death reveals about AI risks",
    "record": {
      "source": "NPR",
      "format": "Instagram post",
      "byline": "npr (verified)",
      "published": "not visible",
      "captured": "2026-08-30 14:56"
    },
    "redaction": "Covered a notification banner that slid over the top of the screen.",
    "words": {
      "text": "The only listener was software.",
      "x": 50,
      "y": 31
    }
  },
  {
    "id": "IMG_0693",
    "date": "2026-09-04",
    "image": "images/IMG_0693.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Travel + Leisure. Headline: Cyclosporiasis Cases Are Surging Across 48 States. Here Are the Foods Linked to the 'Explosive Diarrhea' Parasite",
    "record": {
      "source": "Travel + Leisure",
      "format": "Apple News article",
      "byline": "Alison Fox",
      "published": "Sep 2, 2026",
      "captured": "2026-09-04 16:04"
    },
    "words": {
      "text": "An outbreak, delivered by a travel brand.",
      "x": 5,
      "y": 72
    }
  },
  {
    "id": "IMG_0694",
    "date": "2026-09-04",
    "image": "images/IMG_0694.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: The Wall Street Journal. Headline: Drugmakers Halt Autoimmune Trials After Deaths, Life-Threatening Side Effects",
    "record": {
      "source": "The Wall Street Journal",
      "format": "Apple News article",
      "byline": "Xavier Martinez, Lizzy Lawrence",
      "published": "Sep 4, 2026 (updated)",
      "captured": "2026-09-04 16:05"
    },
    "words": {
      "text": "Deaths, reported as a trial halt.",
      "x": 5,
      "y": 53
    }
  },
  {
    "id": "IMG_0819",
    "date": "2026-09-13",
    "image": "images/IMG_0819.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: dr.beachgem10. Headline: Locally acquired Dengue Fever \"Epicenter\" Hillsborough Florida",
    "record": {
      "source": "dr.beachgem10",
      "format": "Instagram Reel",
      "byline": "creator",
      "published": "on-screen date 9/10/26",
      "captured": "2026-09-13 11:46"
    },
    "redaction": "Covered a private user's handle in the \"Liked by\" line.",
    "words": {
      "text": "No institution in frame. Just a face.",
      "x": 5,
      "y": 72
    }
  },
  {
    "id": "IMG_0821",
    "date": "2026-09-13",
    "image": "images/IMG_0821.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Entertainment Weekly. Headline: Mayim Bialik says she had 'nightmare' symptoms after GLP-1 injection",
    "record": {
      "source": "Entertainment Weekly",
      "format": "Apple News article",
      "byline": "Mekishana Pierre",
      "published": "Sep 10, 2026 (updated)",
      "captured": "2026-09-13 17:50"
    },
    "words": {
      "text": "One person's dose, not a study.",
      "x": 5,
      "y": 66
    },
    "watch": "Possible link with the “Godzilla Ozempic” capture, but only by topic so far."
  },
  {
    "id": "IMG_0822",
    "date": "2026-09-13",
    "image": "images/IMG_0822.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Popular Mechanics. Headline: 100 Years Ago, Thousands Fell Into a Deep Sleep With No Explanation. Today, It's Still a Mystery.",
    "record": {
      "source": "Popular Mechanics",
      "format": "Apple News article",
      "byline": "Darren Orf",
      "published": "not visible",
      "captured": "2026-09-13 17:51"
    },
    "words": {
      "text": "A century-old mystery, filed under today.",
      "x": 5,
      "y": 78
    }
  },
  {
    "id": "IMG_0829",
    "date": "2026-09-14",
    "image": "images/IMG_0829.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Business Insider. Headline: The 10 states that vaccinate the most, and the 10 that vaccinate the least",
    "record": {
      "source": "Business Insider",
      "format": "Apple News article",
      "byline": "Tristin Hoffman",
      "published": "Sep 14, 2026, 5:54 pm GMT (updated)",
      "captured": "2026-09-14 16:46"
    },
    "words": {
      "text": "A finance site draws the vaccine map.",
      "x": 5,
      "y": 44
    }
  },
  {
    "id": "IMG_0831",
    "date": "2026-09-14",
    "image": "images/IMG_0831.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: National Geographic. Headline: Why Do POTS and Long Covid Look So Much Like Autoimmune Disorders?",
    "record": {
      "source": "National Geographic",
      "format": "Apple News article",
      "byline": "Rachel Fairbank",
      "published": "Sep 10, 2026",
      "captured": "2026-09-14 16:48"
    },
    "words": {
      "text": "Research, opened with one doctor's symptoms.",
      "x": 5,
      "y": 92
    }
  },
  {
    "id": "IMG_0832",
    "date": "2026-09-14",
    "image": "images/IMG_0832.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: Reuters. Headline: FDA holds public hearing on psychedelic drugs as Trump-driven push gathers pace",
    "record": {
      "source": "Reuters",
      "format": "Apple News article",
      "byline": "Puyaan Singh, Kamal Choudhury",
      "published": "Sep 14, 2026, 4:23 pm UTC",
      "captured": "2026-09-14 16:49"
    },
    "words": {
      "text": "A policy push, summed up in three bullets.",
      "x": 5,
      "y": 34
    }
  },
  {
    "id": "IMG_0857",
    "date": "2026-09-16",
    "image": "images/IMG_0857.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: The Guardian, via Google. Headline: Ferritin face: the new health scare taking social media by storm",
    "record": {
      "source": "The Guardian, via Google",
      "format": "Google search results, opened from a notification",
      "byline": "The Guardian",
      "published": "3 hours before capture",
      "captured": "2026-09-16 15:46"
    },
    "redaction": "Covered my own account photo.",
    "words": {
      "text": "The trend reached me as a notification.",
      "x": 5,
      "y": 53
    },
    "watch": "Chain candidate. The social posts The Guardian describes weren't captured."
  },
  {
    "id": "IMG_1017",
    "date": "2026-09-22",
    "image": "images/IMG_1017.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: drmaryclaire, resharing USA Today. Headline: Exclusive: FDA warnings persisted as UTIs turned deadly in menopause",
    "record": {
      "source": "drmaryclaire, resharing USA Today",
      "format": "Instagram post",
      "byline": "creator reshare",
      "published": "13h before capture",
      "captured": "2026-09-22 21:15"
    },
    "redaction": "Covered the story row (accounts I follow) and one commenter's name. Neither is a public communicator in this chain.",
    "words": {
      "text": "A newspaper exclusive, relayed by a doctor.",
      "x": 5,
      "y": 83.5
    }
  }
];

const outOfScope = [
  {
    "id": "IMG_0813",
    "date": "2026-09-12",
    "image": "images/IMG_0813.jpg",
    "w": 720,
    "h": 1565,
    "alt": "Screenshot: aaronparnas. Headline: AI CEO worried that AI bot swarms could take over the entire internet in 6-12 months",
    "record": {
      "source": "aaronparnas",
      "format": "Instagram Reel",
      "byline": "creator",
      "published": "not visible",
      "captured": "2026-09-12 15:40"
    },
    "caption": "Out of scope. Not a health story. Kept on file because the urgency language, a deadline measured in months, is the same register as the health captures, and I want that comparison available later."
  }
];

