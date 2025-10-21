import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import Button from "./Button";
import Select from "./Select";

type ChartData = {
  name: string;
  score: number;
  totalRounds?: number;
  avgScore?: number;
  totalMatches?: number;
};

type ChartCardProps = {
  strategy1: { name: string };
  strategy2: { name: string };
  scores: { strat_one: number; strat_two: number };
  matchComplete: boolean;
  currentRound: number;
};

const ChartCard: React.FC<ChartCardProps> = ({
  strategy1,
  strategy2,
  scores,
  matchComplete,
  currentRound,
}) => {
  const [scoreData, setScoreData] = useState<ChartData[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("name");

  const handleChartClear = () => {
    if (confirm("Are you sure you want to clear the chart data?")) {
      setScoreData([
        {
          name: "Always Cooperate",
          score: 0,
          totalRounds: 0,
          avgScore: 0,
        },
        {
          name: "Always Defect",
          score: 0,
          totalRounds: 0,
          avgScore: 0,
        },
      ]);
    }
  };

  const handleSortData = (criteria: string) => {
    const sorted = [...scoreData];
    if (criteria === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "totalRounds") {
      sorted.sort((a, b) => (b.totalRounds || 0) - (a.totalRounds || 0));
    } else if (criteria === "score") {
      sorted.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (criteria === "avgScore") {
      sorted.sort((a, b) => (b.avgScore || 0) - (a.avgScore || 0));
    }
    setScoreData(sorted);
    setSortCriteria(criteria);
  };

  useEffect(() => {
    if (scoreData.length > 0) {
      localStorage.setItem("chartData", JSON.stringify(scoreData));
    }
  }, [scoreData]);

  // Load data on component mount
  useEffect(() => {
    const stored = localStorage.getItem("chartData");
    if (stored) {
      setScoreData(JSON.parse(stored));
    } else {
      setScoreData([
        {
          name: "Always Cooperate",
          score: 0,
          totalRounds: 0,
          avgScore: 0,
        },
        {
          name: "Always Defect",
          score: 0,
          totalRounds: 0,
          avgScore: 0,
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (!matchComplete) return;

    setScoreData((prev) => {
      const existing = prev.map((item) => ({ ...item }));

      const updateOrInsert = (name: string, score: number) => {
        const index = existing.findIndex((e) => e.name === name);
        if (index >= 0) {
          existing[index] = {
            ...existing[index],
            score: existing[index].score + score,
            totalRounds: (existing[index].totalRounds || 0) + currentRound,
            avgScore:
              Math.round(
                ((existing[index].score + score) /
                  ((existing[index].totalRounds || 0) + currentRound)) *
                  100
              ) / 100,
          };
        } else {
          existing.push({
            name,
            score,
            totalRounds: currentRound,
            avgScore: Math.round((score / currentRound) * 100) / 100,
          });
        }
      };

      updateOrInsert(strategy1.name, scores.strat_one);
      updateOrInsert(strategy2.name, scores.strat_two);

      return existing;
    });
  }, [matchComplete]);

  return (
    <div className="border w-full overflow-x-auto p-2">
      <div className="flex flex-col md:flex-row md:justify-between md:gap-2 mb-4">
        <h1 className="font-bold text-lg">Strategy Performance</h1>
        <div className="flex flex-col md:flex-row gap-2 w-fit">
          <Select
            name="sort-by"
            id="sort-by"
            onChange={(e) => handleSortData(e.target.value)}
            defaultValue=""
            className="bg-background"
          >
            <option value="" disabled hidden>
              Sort by:
            </option>
            <option value="name">Name</option>
            <option value="avgScore">Average Score</option>
            <option value="score">Total Score</option>
            <option value="totalRounds">Total Rounds</option>
          </Select>
          <Button className="px-2" onClick={handleChartClear}>
            Clear Chart Data
          </Button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={scoreData}
          layout="vertical"
          margin={{ left: 30, right: 20 }}
        >
          <XAxis
            type="number"
            tick={{ fill: "var(--color-text)" }}
            tickLine={{ stroke: "var(--color-text)" }}
          />
          <YAxis
            width={80}
            type="category"
            dataKey="name"
            tick={{ fill: "var(--color-text)" }}
            tickLine={{ stroke: "var(--color-text)" }}
            axisLine={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: "var(--color-primary)", opacity: 0.2 }}
          />
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="var(--color-text)"
            strokeOpacity={0.2}
            strokeDasharray="3 3"
          />
          <Bar
            dataKey={sortCriteria === "name" ? "avgScore" : sortCriteria}
            className="fill-none stroke-text "
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;

type TooltipContentProps = {
  active?: boolean;
  payload?: { name: string; value: number; payload: any }[];
  label?: string | number;
};

const CustomTooltip: React.FC<TooltipContentProps> = ({
  active,
  payload,
  label,
}) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <div className="bg-background p-2 border ">
          <p className="label font-bold">{`${label}`}</p>
          <p className="intro">{`Avg Score: ${payload[0].payload.avgScore}`}</p>
          <p className="intro">{`Total Score: ${payload[0].payload.score}`}</p>
          <p className="intro">{`Total Rounds: ${payload[0].payload.totalRounds}`}</p>
        </div>
      )}
    </div>
  );
};
