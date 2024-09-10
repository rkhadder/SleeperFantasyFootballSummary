import { ClaudeApi } from "./services/Claude";
import { getMatchups } from "./utils/Sleeper.utils";
import { formatSummary } from "./utils/Summary.utils";

interface GetMatchSummaryInput {
  leagueId: string;
  week: number;
}

export async function getMatchSummary({
  leagueId,
  week,
}: GetMatchSummaryInput): Promise<string> {
  const { matches, rawRosters, userMap } = await getMatchups(leagueId, week);
  const aiSummary =
    (await ClaudeApi.getClaudeMatchSummary(matches)).content?.[0].text ??
    "No summary found";
  const formattedSummary = formatSummary({
    week,
    rosters: rawRosters,
    userMap,
    aiSummary,
  });
  return formattedSummary;
}
