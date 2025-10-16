import React, { useState } from "react";
import { Figure } from "../assets/icons/Figure";
import { strategies } from "../gameSettings/strategies";

type StrategyCardProps = {
  strategy: number;
  score: number;
};

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, score }) => {
  const [currentStrategy, setCurrentStrategy] = useState(strategies[0]);

  console.log(strategies);
  console.log(currentStrategy);

  return (
    <div className="flex flex-col justify-center items-center p-2 border ">
      <h1 className="text-2xl font-bold mb-2">{`Strategy ${strategy}`}</h1>
      <div>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 rounded-full shadow-sm"
          onChange={(e) => setCurrentStrategy(strategies[+e.target.value])}
        >
          {strategies.map((strat, index) => (
            <option key={index} value={index}>
              {strat.name}
            </option>
          ))}
        </select>
      </div>
      <p className="text-sm mt-1 text-ellipsis">
        {currentStrategy.description}
      </p>
      <Figure />
      <h3 className="text-xl mt-6 font-bold">{`Score: ${score}`}</h3>
    </div>
  );
};

export default StrategyCard;
