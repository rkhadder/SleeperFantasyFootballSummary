# Sleeper Fantasty Football Weekly Summary

Get an AI generated summary for your Sleeper Fantasy Football League.

## How to run

1. Install dependencies by running `bun install`.
2. Add your Anthropic API key to your `.env`.
3. Get your Sleeper League Id. This can be found in the URL `https://sleeper.com/leagues/<league_id>/league`.
4. Run `bun index.ts <league_id> <week>`. For example, `bun index.ts 1124832391295139840 1`.
5. The script will return the standings and an Claude generated summary of your league's week formatted for Facebook Messenger.

## Development

### High Level

1. Query Sleeper to get all components of the league (matchs, user, rosters).
2. Format raw Sleeper data into an object that makes sense for Claude.

   > Sleeper returns 3 arrays of data that are joinable by distinct ids, such as a user_id or a roster_id. Additionally, Sleeper returns the matches as an array of single side outcomes. We take this raw data and join the information on ids to create a `Match` object that contains the winner and loser and correct references to the user's display name, their team name, and their score.

3. Use Claude to generate a funny and brief summary of the matches.

   > We use the following query :
   >
   > You are a sassy, funny sports writer responsible to write a brief summary of 5 weekly matchups. The data will be provided in json with descriptive results. Your job is to write no more than 3 sentences per match where you clarify the winner, the loser, the difference in scores, and highlight any anomalies in the score. Include a bolded title for each match in the format "Team Name (Username) Score vs Team Name (Username) Score". We are not landing rockets or writing a Shakespearean play please act accordingly.

4. Apply some simple formatting rules to create the final summary.

### Folder Structure

| Path or File             | Description                                                            |
| ------------------------ | ---------------------------------------------------------------------- |
| ./index.ts               | The main CLI. Will be expanded to support multiple formatting options. |
| ./src/                   | The source code.                                                       |
| ./src/services/          | Typescript wrappers for Sleeper/Claude APIs.                           |
| ./src/types/             | Typescript types used throughout the codebase.                         |
| ./src/utils/             | Utils for transforming data.                                           |
| ./src/getMatchSummary.ts | Business logic for generating the summary.                             |
