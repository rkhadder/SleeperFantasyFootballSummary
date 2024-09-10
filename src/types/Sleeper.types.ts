export interface SleeperApi_Roster {
  roster_id: string;
  league_id: string;
  owner_id: string;
  settings: {
    waiver_position: number;
    wins: number;
    ties: number;
    losses: number;
  };
}

export interface SleeperApi_User {
  user_id: string;
  display_name: string;
  metadata: {
    team_name: string;
  };
}

export interface SleeperApi_Matchup {
  matchup_id: string;
  roster_id: string;
  points: number;
}

export interface MatchSide {
  roster_id: string;
  user_id: string;
  display_name: string;
  team_name: string;
  points: number;
}
export interface Match {
  winner: MatchSide;
  loser: MatchSide;
}
