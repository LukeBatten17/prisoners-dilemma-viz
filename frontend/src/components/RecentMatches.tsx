import React from "react";
import type { RecentMatch } from "../gameSettings/types";

type RecentMatchesProps = {
  data: RecentMatch[];
};

const RecentMatches: React.FC<RecentMatchesProps> = ({ data }) => {
  return (
    <div>
      <h3 className="text-lg font-bold">10 Most Recent Matches</h3>
      <ul className=" flex flex-col gap-4 mb-4">
        {data.map((match, index) => (
          <li key={index}>
            <MatchCard match={match} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentMatches;

const MatchCard: React.FC<{ match: RecentMatch }> = ({ match }) => {
  return (
    <div className="border border-text p-2 shadow-sm shadow-text bg-background flex flex-col gap-2 sm:flex-row sm:items-center">
      {/* Date */}
      <div className="sm:w-1/3 whitespace-nowrap">
        <span className="text-sm text-text/70">
          {new Date(match.playedAt).toLocaleString()}
        </span>
      </div>
      {/* Score */}
      <div className="sm:w-1/3 grid grid-cols-[1fr_auto_1fr] items-center gap-x-2 text-text min-w-0">
        <div
          className={`flex flex-col items-center min-w-0 ${match.winner === null ? "" : match.strategyOneName === match.winner ? "text-green-500" : "text-red-500"}`}
        >
          <span className="font-semibold truncate w-full text-center">
            {match.strategyOneName}
          </span>
          <span>{match.strategyOnePoints}</span>
        </div>
        <span>-</span>
        <div
          className={`flex flex-col items-center min-w-0 ${match.winner === null ? "" : match.strategyTwoName === match.winner ? "text-green-500" : "text-red-500"}`}
        >
          <span className="font-semibold truncate w-full text-center">
            {match.strategyTwoName}
          </span>
          <span>{match.strategyTwoPoints}</span>
        </div>
      </div>
      {/* Total Rounds */}
      <div className="sm:w-1/3 flex flex-col sm:items-end text-sm text-text/70 whitespace-nowrap">
        <span>Total Rounds: {match.totalRounds}</span>
      </div>
    </div>
  );
};
