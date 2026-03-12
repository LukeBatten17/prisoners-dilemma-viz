import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import type { LeaderboardData } from "../gameSettings/types";
import RankingsTable from "../components/RankingsTable";
import RecentMatches from "../components/RecentMatches";

const Leaderboard = () => {
  const [data, setData] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    fetch("/api/leaderboard")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div className="flex flex-col bg-background min-h-screen bg-pattern ">
      <NavBar />
      <main className="flex flex-col justify-center items-center mx-auto p-4 pb-8 max-w-6xl w-full">
        <h1 className="text-3xl font-bold mb-3 text-left uppercase w-full tracking-wide text-text">
          Leaderboard
        </h1>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-3 md:flex-row text-text">
            <Card
              title="Top Strategy"
              data={data?.summary?.topStrategy || "Loading..."}
              subtext={`with ${data?.summary?.topStrategyAvgPointsPerRound ?? "Loading..."} points per round`}
            />
            <Card
              title="Total Matches"
              data={data?.summary?.totalMatches || "Loading..."}
              subtext="across all users"
            />
            <Card
              title="Total Rounds"
              data={data?.summary?.totalRounds || "Loading..."}
              subtext="across all matches"
            />
            <Card
              title="Average Points per Round"
              data={
                data?.summary?.avgPointsPerRound?.toFixed(2) || "Loading..."
              }
              subtext="across all strategies"
            />
          </div>
          <div>
            <RankingsTable data={data?.rankings ?? []} />
          </div>
          <div>
            <RecentMatches data={data?.recentMatches ?? []} />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Leaderboard;
