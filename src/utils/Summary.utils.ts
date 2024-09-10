import type {
  Match,
  SleeperApi_Roster,
  SleeperApi_User,
} from "../types/Sleeper.types";

interface FormatSummaryInput {
  week: number;
  rosters: SleeperApi_Roster[];
  userMap: Record<string, SleeperApi_User>;
  aiSummary: string;
}

export function formatSummary({
  week,
  rosters,
  userMap,
  aiSummary,
}: FormatSummaryInput) {
  const cleanedAiSummary = aiSummary
    .replaceAll("**", "*")
    .replaceAll("\n\n", "\n");
  const placements = rosters.sort((a, b) => b.settings.wins - a.settings.wins);
  return `\`Jager League -- Week ${week} Summary\`\n\nStandings:\n${placements
    .map((roster, idx) => {
      const user = userMap[roster.owner_id];
      const teamName = user.metadata.team_name ?? `Team ${user.display_name}`;
      return `${idx + 1}. ${teamName} (${roster.settings.wins}-${
        roster.settings.losses
      })`;
    })
    .join("\n")}\n\n${cleanedAiSummary}`;
}
