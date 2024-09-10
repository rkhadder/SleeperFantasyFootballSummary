import ky from "ky";
import type {
  SleeperApi_Matchup,
  SleeperApi_Roster,
  SleeperApi_User,
} from "../types/Sleeper.types";

async function getMatchups(
  leagueId: string,
  week: number
): Promise<SleeperApi_Matchup[]> {
  const res = await ky
    .get(`https://api.sleeper.app/v1/league/${leagueId}/matchups/${week}`)
    .json();
  return res as SleeperApi_Matchup[];
}

async function getRosters(leagueId: string): Promise<SleeperApi_Roster[]> {
  const res = await ky
    .get(`https://api.sleeper.app/v1/league/${leagueId}/rosters`)
    .json();
  return res as SleeperApi_Roster[];
}

async function getUsers(leagueId: string): Promise<SleeperApi_User[]> {
  const res = await ky
    .get(`https://api.sleeper.app/v1/league/${leagueId}/users`)
    .json();
  return res as SleeperApi_User[];
}

export const SleeperApi = {
  getMatchups,
  getRosters,
  getUsers,
};
