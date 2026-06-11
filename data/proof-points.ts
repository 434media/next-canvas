// Single source of truth for Digital Canvas "Part A" proof points — the real-world
// credibility, capital, and pipeline behind the program. Consumed by demo-days,
// underwriters, builders, and about so the numbers live in ONE place.
//
// ─────────────────────────────────────────────────────────────────────────────
// CLEARANCE DISCIPLINE — read before publishing:
//   • Figures attributed to a partner are THEIR track record, not Digital Canvas
//     outcomes. Always render the `source`. Never imply DC deployed the capital or
//     ran the summit.
//   • Each entry tagged @clearance needs a green light before it goes live:
//       - Alamo Angels stats: confirmed partner, but confirm Alamo is OK to display.
//       - AIM/BRDG figures: pulled from a WORKING-DRAFT impact report (had "XX+"
//         placeholders). Use only finalized counts cleared by 434 Media.
//       - Named communities / student orgs: confirm DevSA can publicly attach each
//         (esp. DEFCON Group, BSides, RowdyHacks, ACM-UTSA, university names).
// ─────────────────────────────────────────────────────────────────────────────

export type ProofStat = {
  value: string
  label: string
  source: string
}

// The capital + ecosystem the demo-day room plugs into. Investor-facing proof:
// "the room is real, and the people convening it have a track record."
export const ecosystemStats: ProofStat[] = [
  // @clearance: Alamo Angels — confirmed capital partner (434 holds a board seat).
  { value: "$7M+", label: "Deployed across 50+ startups", source: "Alamo Angels" },
  { value: "140+", label: "Accredited investors in-network", source: "Alamo Angels" },
  // @clearance: AIM/BRDG impact report (working draft) — finalized counts only.
  {
    value: "3,100+",
    label: "Registrations to the dual-use innovation summit 434 helped build, since 2023",
    source: "434 Media · BRDG",
  },
  {
    value: "~90%",
    label: "Of 2026 attendees reported meaningful new connections",
    source: "434 Media · BRDG",
  },
]

// One-line credit establishing 434 as a recognized ecosystem-builder in the exact
// verticals Digital Canvas runs cohorts in (military medicine, health, dual-use).
export const ecosystemCredit =
  "434 Media helped build BRDG — San Antonio's dual-use innovation ecosystem spanning military medicine, academic research, and government. The same convening, storytelling, and stakeholder work powers every Digital Canvas cohort."

// Talent pipeline — DevSA's reach, SORTED BY WHAT IT PROVES (not a flat logo wall).
// Each cohort pitch surfaces the relevant cluster; cyber leads with DEFCON + BSides.
export type PipelineCluster = {
  key: string
  label: string
  note: string
  communities: string[]
}
export const talentPipeline: PipelineCluster[] = [
  {
    key: "cyber",
    label: "Security community",
    note: "Anchor vertical. Recruited from San Antonio's actual security practitioners — not a generalist pool.",
    communities: ["DEFCON Group", "BSides SATX"], // @clearance
  },
  {
    key: "builders",
    label: "Builder funnel",
    note: "Where weekend builders live — hackathons, language and framework communities across the city.",
    communities: [
      "RowdyHacks", // @clearance
      "ACM-UTSA", // @clearance
      "Alamo Python",
      "Google Developer Groups",
      ".NET User Group",
      "Datanauts",
    ],
  },
  {
    key: "startups",
    label: "Startups + capital",
    note: "Founder formation and the capital fabric the program plugs into.",
    communities: ["Geekdom", "Tech Bloc"],
  },
  {
    key: "universities",
    label: "Universities",
    note: "Talent from across San Antonio's full pyramid — research universities to community colleges.",
    communities: [
      "UTSA", // @clearance
      "Texas A&M San Antonio",
      "St. Mary's University",
      "St. Philip's College",
      "Alamo Colleges",
    ],
  },
  {
    key: "access",
    label: "Access",
    note: "Tied into the full talent pyramid — from kids learning to code to founders pitching investors.",
    communities: ["Youth Code Jam"],
  },
]
