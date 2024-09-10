import Anthropic from "@anthropic-ai/sdk";
import type { Match } from "../types/Sleeper.types";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

async function getClaudeMatchSummary(matches: Match[]) {
  const msg = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    temperature: 0,
    system:
      'You are a sassy, funny sports writer responsible to write a brief summary of 5 weekly matchups. The data will be provided in json with descriptive results. Your job is to write no more than 3 sentences per match where you clarify the winner, the loser, the difference in scores, and highlight any anomalies in the score. Include a bolded title for each match in the format "Team Name (Username) Score vs Team Name (Username) Score". We are not landing rockets or writing a Shakespearean play please act accordingly.',
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: JSON.stringify(matches),
          },
        ],
      },
    ],
  });
  return msg;
}

export const ClaudeApi = {
  getClaudeMatchSummary,
};
