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
import { s } from "motion/react-client";

type ChartData = {
  name: string;
  score: number;
  totalRounds?: number;
  avgScore?: number;
  totalMatches?: number;
};

const ChartCard = ({
  strategy1,
  strategy2,
  scores,
  matchComplete,
  currentRound,
}) => {
  const [scoreData, setScoreData] = useState<ChartData[]>([
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

  const handleChartClear = () => {
    localStorage.removeItem("chartData");
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
  };
  console.log("Score Data:", scoreData);
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
            totalRounds: existing[index].totalRounds + currentRound,
            avgScore:
              Math.round(
                ((existing[index].score + score) /
                  (existing[index].totalRounds + currentRound)) *
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
      <div className="flex justify-between mb-4">
        <h1 className="font-bold text-lg ">Average Score</h1>
        <Button className="px-2" onClick={handleChartClear}>
          Clear Chart Data
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
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
          <Tooltip content={CustomTooltip} />
          <CartesianGrid
            vertical={true}
            horizontal={false}
            stroke="var(--color-text)"
            strokeOpacity={0.2}
            strokeDasharray="3 3"
          />
          <Bar dataKey="avgScore" className="fill-none stroke-text " />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipContentProps<string | number, string>) => {
  const isVisible = active && payload && payload.length;
  return (
    <div
      className="custom-tooltip"
      style={{ visibility: isVisible ? "visible" : "hidden" }}
    >
      {isVisible && (
        <div className="bg-background p-2 border ">
          <p className="label font-bold">{`${label}`}</p>
          <p className="intro">{`Avg Score: ${payload![0].value}`}</p>
          <p className="intro">{`Total Score: ${payload![0].payload.score}`}</p>
          <p className="intro">{`Total Rounds: ${
            payload![0].payload.totalRounds
          }`}</p>
        </div>
      )}
    </div>
  );
};
