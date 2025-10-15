import React from "react";
import { Figure } from "../assets/icons/Figure";

type StrategyCardProps = {
  strategy: number;
  score: number;
};

const StrategyCard: React.FC<StrategyCardProps> = ({ strategy, score }) => {
  return (
    <div className="flex flex-col justify-center items-center p-2 border ">
      <h1 className="text-2xl font-bold mb-2">{`Strategy ${strategy}`}</h1>
      <div>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 rounded-full shadow-sm"
        >
          <option value="always_cooperate">Always Cooperate</option>
          <option value="always_defect">Always Defect</option>
          <option value="tit_for_tat">Tit for Tat</option>
          <option value="Random">Random</option>
        </select>
      </div>
      <p className="text-sm mt-1">
        Starts with “C”, then copies opponent's last move
      </p>
      <Figure />
      <h3 className="text-xl mt-6 font-bold">{`Score: ${score}`}</h3>
    </div>
  );
};

export default StrategyCard;
