import { getMatchups } from "./utils/Sleeper.utils";

interface GetMatchSummaryInput {
  leagueId: string;
  week: number;
}

async function getMatchSummary({ leagueId, week }: GetMatchSummaryInput) {
  const matches = await getMatchups(leagueId, week);
  console.log(matches);
}

getMatchSummary({ leagueId: "1124832391295139840", week: 1 });
