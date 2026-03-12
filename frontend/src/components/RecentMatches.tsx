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
    <div className=" flex justify-between items-center border border-text p-2 rounded shadow-sm shadow-text bg-background">
      <div>
        <span className="text-sm text-text/70">
          {new Date(match.playedAt).toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2 text-text">
        <div
          className={`flex flex-col items-center font-semibold ${match.winner === match.strategyOneId ? "text-green-500" : "text-red-500"}`}
        >
          <span>{match.strategyOneId}</span>
          <span>{match.strategyOnePoints}</span>
        </div>
        -
        <div
          className={`flex flex-col items-center font-semibold ${match.winner === match.strategyTwoId ? "text-green-500" : "text-red-500"}`}
        >
          <span>{match.strategyTwoId}</span>
          <span>{match.strategyTwoPoints}</span>
        </div>
      </div>
      <div className="flex flex-col items-center text-sm text-text/70">
        <p className="">Winner: {match.winner}</p>
        <span className="">Total Rounds: {match.totalRounds}</span>
      </div>
    </div>
  );
};
