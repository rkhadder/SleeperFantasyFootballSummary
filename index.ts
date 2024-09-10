import { getMatchSummary } from "./src/getMatchSummary";

const leagueId = process.argv?.[2] ?? "1124832391295139840";
const week = parseInt(process.argv?.[3]) ?? 1;
console.log(await getMatchSummary({ leagueId, week }));
