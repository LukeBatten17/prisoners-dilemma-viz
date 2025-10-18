import React from "react";
import { Figure } from "../assets/icons/Figure";
import { strategies } from "../gameSettings/strategies";

type StrategyCardProps = {
  strategyNumber: number;
  score: number;
  setStrategy: any;
  strategy: any;
};

const StrategyCard: React.FC<StrategyCardProps> = ({
  strategyNumber,
  score,
  setStrategy,
  strategy,
}) => {
  const onStrategyChange = (index: number) => {
    const selected = strategies[index];
    console.log(`Strategy ${strategyNumber} changed to`, selected.name);
    setStrategy(selected);
  };

  const selectedIndex = strategies.findIndex((s) => s.name === strategy?.name);

  return (
    <div className="flex flex-col justify-center items-center p-2 border max-w-sm">
      <h1 className="text-2xl font-bold mb-2">{`Strategy ${strategyNumber}`}</h1>

      <select
        name="strategy"
        id={`strategy-${strategyNumber}`}
        className="border p-1 shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] bg-background text-text"
        value={selectedIndex >= 0 ? selectedIndex : 0}
        onChange={(e) => onStrategyChange(+e.target.value)}
      >
        {strategies.map((strat, index) => (
          <option key={index} value={index}>
            {strat.name}
          </option>
        ))}
      </select>

      <p className="text-sm mt-1 text-ellipsis">{strategy?.description}</p>
      <Figure />
      <h3 className="text-xl mt-6 font-bold">{`Score: ${score}`}</h3>
    </div>
  );
};

export default StrategyCard;
