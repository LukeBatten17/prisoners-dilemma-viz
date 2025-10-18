import React from "react";
import Button from "../components/Button";
import DEFAULT_CONFIG from "../gameSettings/config";

type OptionsPanelProps = {
  startGame: any;
  resetGame: any;
  pauseGame: any;
  isRunning: boolean;
  updateDelay: any;
  updateMaxRounds: any;
};

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  startGame,
  resetGame,
  pauseGame,
  isRunning,
  updateDelay,
  updateMaxRounds,
}) => {
  return (
    <div className="h-none md:h-12 border flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center md:gap-10 p-4">
      <div>
        <label htmlFor="num-of-rounds" className="text-lg mr-1">
          # of Rounds
        </label>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 bg-background text-text shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] "
          onChange={(e) => updateMaxRounds(e.target.value)}
          defaultValue={DEFAULT_CONFIG.maxRounds}
        >
          <option value={5}>5</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={Math.floor(Math.random() * 200)}>Random</option>
        </select>
      </div>
      <div className="flex gap-1">
        <input type="checkbox" name="noise" value="noise" />
        <label htmlFor="noise">noise</label>
      </div>
      <div>
        <label htmlFor="num-of-rounds" className="text-lg mr-1">
          Speed
        </label>
        <select
          name="rounds"
          id="num-of-rounds"
          className="border p-1 bg-background text-text shadow-sm dark:border-[#f3e2d8] dark:shadow-[#f3e2d8] "
          onChange={(e) => updateDelay(e.target.value)}
          defaultValue={DEFAULT_CONFIG.delay}
        >
          <option value={2500}>0.5x</option>
          <option value={2000}>0.75x</option>
          <option value={1500}>1x</option>
          <option value={1000}>1.5x</option>
          <option value={500}>2x</option>
        </select>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={resetGame}
          className="px-4 text-lg active:bg-background-100 dark:active:bg-background-800"
        >
          Reset
        </Button>
        <Button
          className="px-6 bg-primary text-lg active:bg-primary-300 dark:active:bg-primary-400"
          onClick={() => (isRunning ? pauseGame() : startGame())}
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default OptionsPanel;
