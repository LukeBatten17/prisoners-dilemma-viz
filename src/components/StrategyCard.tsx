import React, { useState, useEffect, use } from "react";
import { strategies } from "../gameSettings/strategies";
import Select from "./Select";
import ScrollContainer from "react-indiana-drag-scroll";
import Stickman from "./Stickman";
import { useSpring, motion } from "motion/react";

type StrategyCardProps = {
  strategyNumber: number;
  score: number;
  setStrategy: any;
  strategy: any;
  recentMove: string | null;
  delay: number;
  currentRound: number;
};

const StrategyCard: React.FC<StrategyCardProps> = ({
  strategyNumber,
  score,
  setStrategy,
  strategy,
  recentMove,
  delay,
  currentRound,
}) => {
  const [displayMove, setDisplayMove] = useState<string | null>(null);
  const [displayScore, setDisplayScore] = useState(0);

  const springConfig = useSpring(0, { bounce: 0.1, duration: delay / 2 });

  springConfig.on("change", (value) => {
    setDisplayScore(Math.round(value));
  });

  useEffect(() => {
    springConfig.set(score);
  }, [score]);

  useEffect(() => {
    if (recentMove) {
      setDisplayMove(recentMove);

      const timeout = setTimeout(() => {
        setDisplayMove(null);
      }, delay * 0.5);

      return () => clearTimeout(timeout);
    }
  }, [recentMove, currentRound]);

  const onStrategyChange = (index: number) => {
    const selected = strategies[index];
    setStrategy(selected);
  };

  const selectedIndex = strategies.findIndex((s) => s.name === strategy?.name);

  return (
    <div className="flex flex-col justify-around items-center p-2 border h-full">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-2 ">{`Strategy ${strategyNumber}`}</h1>
        <label htmlFor={`strategy-${strategyNumber}`} className="sr-only">
          {`Select strategy ${strategyNumber}`}
        </label>
        <Select
          name="strategy"
          id={`strategy-${strategyNumber}`}
          value={selectedIndex >= 0 ? selectedIndex : 0}
          onChange={(e) => onStrategyChange(+e.target.value)}
          className={`text-black ${
            strategyNumber === 1 ? "bg-strategy-1" : "bg-strategy-2"
          }`}
        >
          {strategies.map((strat, index) => (
            <option key={index} value={index}>
              {strat.name}
            </option>
          ))}
        </Select>
        <ScrollContainer
          horizontal={false}
          className="h-16  overflow-y-auto scrollbar-hide"
        >
          <p className="text-center text-sm/3.5 mt-2">
            {strategy?.description}
          </p>
        </ScrollContainer>
      </div>

      <div>
        <Stickman displayMove={displayMove} delay={delay} />
      </div>

      <p className="text-xl font-bold">{`Score: ${displayScore}`}</p>
    </div>
  );
};

export default StrategyCard;
