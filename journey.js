/*
  JOURNEY — the order the log is read in. Chains are grouped into legs by
  what drifts, not by date. Each chain is named by its title in entries.js.

  A chain that isn't listed here still shows up, in its own section after the
  last leg ("Not placed in a leg yet"), until it's added to a leg.

  offRamp: the early exit after each leg. ending: the off-ramp from the feed,
  at the bottom of "The last stop."
*/

const journey = {
  legs: [
    {
      id: "place",
      name: "Place",
      title: "The story gets closer",
      opener: [
        "These chains start somewhere else and end up near me. The rabies story starts at a petting zoo in North Carolina and ends with a coyote in Westchester. Along the way the place drops out, comes back, and gets more specific the closer it gets to home.",
        "What I notice most is that the local version reads like its own story, not the next chapter of the first one. If you only saw the post from your area, you wouldn't know there was a national story behind it."
      ],
      chains: [
        "Rabies",
        "Dengue, Hillsborough County",
        "Brain-eating amoeba, North Carolina",
        "Orange County drill outbreak"
      ]
    },
    {
      id: "words",
      name: "Words",
      title: "The story stays put. The words don't.",
      opener: [
        "In these chains, nothing new happened between versions. The event is the same. What changed is the language around it. 71.5% becomes “nearly 3 in 4.” “Young people” becomes “teenage.” A feed card turns an argument into a confession.",
        "Most of these changes are small on their own. But they add up, and I don't think I would have caught them reading one version at a time."
      ],
      chains: [
        "CDC fatigue report",
        "Young donors' stem cells",
        "One Prevention story, two headlines",
        "A flu season without a push",
        "Mayim Bialik and GLP-1, one article"
      ]
    },
    {
      id: "truth",
      name: "Truth",
      title: "The versions stop agreeing",
      opener: [
        "This is where a story splits. In these two chains, the versions don't just simplify or reword. They disagree about what's true. An AI summary says there's no thyroid recall to find, four weeks after the FDA posted one. The health secretary says the measles coverage is trying to scare people, and then a coroner and the state disagree about one of the deaths.",
        "If you'd only seen one of these versions, which one would you have believed?"
      ],
      chains: [
        "Thyroid tablet recall",
        "Measles deaths, Pennsylvania"
      ]
    }
  ],

  offRamp: {
    link: "I've seen enough. Take me to the last stop.",
    note: "You'll skip the chains below, but you won't miss the ending."
  },

  offRampLast: {
    link: "Take me to the last stop.",
    note: "You'll skip the captures that never linked to another version."
  },

  unplaced: {
    title: "Not placed in a leg yet",
    note: "New chains land here until I decide which leg they belong to."
  },

  ending: {
    title: "Getting off the feed",
    text: [
      "This is the end of the log. A feed wouldn't have one.",
      "So here's what I'd ask you to take with you. The next time a health alert reaches you, look for the version above it: the full article behind the push, or the agency's own notice. In my thyroid chain, the alert left out the one line a patient needed, and the article put it back. Four weeks later, an AI summary said there was no recall at all. The FDA's notice said there was.",
      "You don't have to distrust what reached you. Just ask which version it is."
    ]
  }
};
