import React, { useState, useEffect } from "react";
import { strategies } from "../gameSettings/strategies";
import Select from "./Select";
import ScrollContainer from "react-indiana-drag-scroll";
import StickmanIdle from "../assets/icons/StickmanIdle";
import StickmanDefect from "../assets/icons/StickmanDefect";
import StickmanCoperate from "../assets/icons/StickmanCoperate";
import Stickman from "./Stickman";

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
  const [displayMove, setDisplayMove] = useState(null);

  useEffect(() => {
    if (recentMove) {
      setDisplayMove(recentMove);

      const timeout = setTimeout(() => {
        setDisplayMove(null); // go back to idle after 1 second
      }, delay * 0.5);

      return () => clearTimeout(timeout);
    }
  }, [recentMove, currentRound]);

  const onStrategyChange = (index: number) => {
    const selected = strategies[index];
    //console.log(`Strategy ${strategyNumber} changed to`, selected.name);
    setStrategy(selected);
  };

  const selectedIndex = strategies.findIndex((s) => s.name === strategy?.name);

  return (
    <div className="flex flex-col justify-between items-center p-2 border h-full">
      <h1 className="text-2xl font-bold mb-2 ">{`Strategy ${strategyNumber}`}</h1>

      <div className="flex flex-col items-center">
        <Select
          name="strategy"
          id={`strategy-${strategyNumber}`}
          value={selectedIndex >= 0 ? selectedIndex : 0}
          onChange={(e) => onStrategyChange(+e.target.value)}
          className={`bg-strategy-${strategyNumber}`}
        >
          {strategies.map((strat, index) => (
            <option key={index} value={index}>
              {strat.name}
            </option>
          ))}
        </Select>
        <ScrollContainer
          horizontal={false}
          className="h-18  overflow-y-auto scrollbar-hide"
        >
          <p className="text-center text-sm mt-1 ">{strategy?.description}</p>
        </ScrollContainer>
      </div>

      <div>
        <Stickman displayMove={displayMove} delay={delay} />
      </div>
      <h3 className="text-xl mt-6 font-bold">{`Score: ${score}`}</h3>
    </div>
  );
};

export default StrategyCard;
