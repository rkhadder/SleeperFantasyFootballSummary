import { SleeperApi } from "../services/Sleeper";
import type {
  Match,
  SleeperApi_Roster,
  SleeperApi_User,
} from "../types/Sleeper.types";

interface GetMatchupsOutput {
  matches: Match[];
  rawRosters: SleeperApi_Roster[];
  userMap: Record<string, SleeperApi_User>;
}

export async function getMatchups(
  leagueId: string,
  week: number
): Promise<GetMatchupsOutput> {
  const [rawMatches, rawRosters, rawUsers] = await Promise.all([
    SleeperApi.getMatchups(leagueId, week),
    SleeperApi.getRosters(leagueId),
    SleeperApi.getUsers(leagueId),
  ]);

  const userMap = rawUsers.reduce((acc, user) => {
    acc[user.user_id] = user;
    return acc;
  }, {} as Record<string, SleeperApi_User>);
  const rosterMap = rawRosters.reduce((acc, roster) => {
    acc[roster.roster_id] = roster;
    return acc;
  }, {} as Record<string, SleeperApi_Roster>);

  const matches: Match[] = Array(rawMatches.length / 2).map(
    () => ({} as Match)
  );
  rawMatches.forEach((match) => {
    const roster = rosterMap[match.roster_id];
    const user = userMap[roster.owner_id];
    const matcheside = {
      roster_id: match.roster_id,
      user_id: user.user_id,
      display_name: user.display_name,
      team_name: user.metadata.team_name ?? `Team ${user.display_name}`,
      points: match.points,
    };
    const matchIdx = parseInt(match.matchup_id) - 1;
    if (matches[matchIdx]?.winner) {
      if (matches[matchIdx].winner.points < match.points) {
        matches[matchIdx].loser = matches[matchIdx].winner;
        matches[matchIdx].winner = matcheside;
      } else {
        matches[matchIdx].loser = matcheside;
      }
    } else {
      matches[matchIdx] = { winner: matcheside, loser: null } as Match;
    }
  });

  return { matches, rawRosters, userMap };
}
