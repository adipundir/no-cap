import type { Fact, Tallies, ContextItem } from "@/types/fact";

export const SAMPLE_FACTS: Fact[] = [
  {
    id: "1",
    title: "Saturn's moon Enceladus contains hydrothermal vents in its subsurface ocean",
    summary: "Cassini data suggests warm hydrothermal activity, consistent with silica nanoparticles found in plumes.",
    status: "verified",
    votes: 1243,
    comments: 89,
    author: "anon-4f8c",
    updated: "2h ago",
  },
  {
    id: "2",
    title: "A new exoplanet has been found in Alpha Centauri",
    summary: "A circulating blog post claims a discovery, but no peer-reviewed source currently corroborates it.",
    status: "review",
    votes: 312,
    comments: 45,
    author: "anon-a21e",
    updated: "6h ago",
  },
  {
    id: "3",
    title: "Photosynthesis can operate efficiently under starlight intensity on exoplanets",
    summary: "Claim under dispute; dependent on stellar spectrum and atmospheric composition assumptions.",
    status: "flagged",
    votes: 158,
    comments: 23,
    author: "anon-9921",
    updated: "1d ago",
  },
];

export const SAMPLE_TALLIES: Tallies = {
  capVotes: 40,
  noCapVotes: 10,
  capStake: 320,
  noCapStake: 80,
  posterStake: 20,
};

export const SAMPLE_CONTEXTS: ContextItem[] = [
  { id: "c1", text: "Solid evidence from EIP data." },
  { id: "c2", text: "Need more sources." },
];


