import { SleeperApi } from "../services/Sleeper";
import type {
  Match,
  SleeperApi_Roster,
  SleeperApi_User,
} from "../types/Sleeper.types";

export async function getMatchups(
  leagueId: string,
  week: number
): Promise<Match[]> {
  const [raw_matches, raw_rosters, raw_users] = await Promise.all([
    SleeperApi.getMatchups(leagueId, week),
    SleeperApi.getRosters(leagueId),
    SleeperApi.getUsers(leagueId),
  ]);

  const userMap = raw_users.reduce((acc, user) => {
    acc[user.user_id] = user;
    return acc;
  }, {} as Record<string, SleeperApi_User>);
  const rosterMap = raw_rosters.reduce((acc, roster) => {
    acc[roster.roster_id] = roster;
    return acc;
  }, {} as Record<string, SleeperApi_Roster>);

  const matchs: Match[] = Array(raw_matches.length / 2).map(
    () => ({} as Match)
  );
  raw_matches.forEach((match) => {
    const roster = rosterMap[match.roster_id];
    const user = userMap[roster.owner_id];
    const matchSide = {
      roster_id: match.roster_id,
      user_id: user.user_id,
      display_name: user.display_name,
      team_name: user.metadata.team_name ?? `Team ${user.display_name}`,
      points: match.points,
    };
    const matchIdx = parseInt(match.matchup_id) - 1;
    if (matchs[matchIdx]?.winner) {
      if (matchs[matchIdx].winner.points < match.points) {
        matchs[matchIdx].loser = matchs[matchIdx].winner;
        matchs[matchIdx].winner = matchSide;
      } else {
        matchs[matchIdx].loser = matchSide;
      }
    } else {
      matchs[matchIdx] = { winner: matchSide, loser: null } as Match;
    }
  });

  return matchs;
}
