export type Tallies = {
  capVotes: number;
  noCapVotes: number;
  capStake: number; // PYUD (reviewers)
  noCapStake: number; // PYUD (reviewers)
  posterStake: number; // PYUD
};

export type EconParams = {
  emission: number; // E
  commentBonusRate: number; // β
  posterShareWhenTrue: number; // δ
  loseFee: number; // τ
  redistributionRate: number; // γ
  loserConfiscationRate: number; // λ
  stakePower: number; // α
  repPower: number; // βr
  avgRep: number; // assumed avg rep of others on a side
};

export const DEFAULT_ECON_PARAMS: EconParams = {
  emission: 50,
  commentBonusRate: 0.1,
  posterShareWhenTrue: 0.6,
  loseFee: 0,
  redistributionRate: 1,
  loserConfiscationRate: 1,
  stakePower: 1,
  repPower: 1,
  avgRep: 1,
};

export type Preview = {
  winReturn: number;
  winPool: number; // share of rewards excluding principal
  loseReturn: number; // returned amount if the chosen side loses (usually 0)
};

export function previewReturn(
  choice: "cap" | "nocap",
  myStake: number,
  tallies: Tallies,
  params: EconParams = DEFAULT_ECON_PARAMS,
  myRep = 1
): Preview {
  const { emission, commentBonusRate, posterShareWhenTrue, loseFee, redistributionRate, loserConfiscationRate, stakePower, repPower, avgRep } = params;

  const Ecomment = emission * commentBonusRate;
  const Eprime = emission - Ecomment;

  const sideStake = choice === "cap" ? tallies.capStake : tallies.noCapStake;
  const otherSideStake = choice === "cap" ? tallies.noCapStake : tallies.capStake;

  const loseStakeConfiscated = loserConfiscationRate * otherSideStake;
  const redistributedFromLosers = redistributionRate * loseStakeConfiscated * (1 - loseFee);
  const feeBurn = loseStakeConfiscated * loseFee; // not used further; for visibility only

  const posterToWinners = choice === "cap" ? 0 : tallies.posterStake; // poster loses stake if outcome false
  const posterBonusWhenTrue = posterShareWhenTrue * Eprime; // poster gets this if Cap wins (assuming Cap == True outcome for demo)
  const toReviewersFromEmission = (1 - posterShareWhenTrue) * Eprime;

  const winnersPool = redistributedFromLosers + toReviewersFromEmission + posterToWinners;

  // Weighting approximation: my weight vs side sum
  const myWeight = Math.pow(myStake, stakePower) * Math.pow(myRep, repPower);
  const othersWeight = Math.pow(sideStake, stakePower) * Math.pow(avgRep, repPower);
  const wSum = myWeight + othersWeight || 1;

  const myShare = (myWeight / wSum) * winnersPool;
  const winReturn = myStake + myShare;
  const loseReturn = Math.max(0, myStake * (1 - loserConfiscationRate));

  return { winReturn, winPool: myShare, loseReturn };
}


