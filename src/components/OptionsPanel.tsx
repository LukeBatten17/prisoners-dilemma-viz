import React from "react";
import Button from "../components/Button";
import DEFAULT_CONFIG from "../gameSettings/config";
import Select from "./Select";

type OptionsPanelProps = {
  startGame: any;
  resetGame: any;
  pauseGame: any;
  isRunning: boolean;
  updateDelay: any;
  updateMaxRounds: any;
  setNoise: any;
};

const OptionsPanel: React.FC<OptionsPanelProps> = ({
  startGame,
  resetGame,
  pauseGame,
  isRunning,
  updateDelay,
  updateMaxRounds,
  setNoise,
}) => {
  return (
    <div className="h-none  border flex flex-col items-start gap-4 md:flex-row md:justify-between md:items-center md:gap-10 p-4">
      <div>
        <label htmlFor="num-of-rounds" className="text-lg mr-1">
          # of Rounds
        </label>
        <Select
          name="rounds"
          id="num-of-rounds"
          onChange={(e) => updateMaxRounds(e.target.value)}
          defaultValue={DEFAULT_CONFIG.maxRounds}
          className="bg-background"
          ariaLabel="number of rounds"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={200}>200</option>
          <option value={Math.floor(Math.random() * 200)}>Random</option>
        </Select>
      </div>
      <div className="flex justify-center items-center gap-1">
        <label htmlFor="noise">Noise</label>
        <input
          type="checkbox"
          id="noise"
          value="noise"
          onChange={(e) => setNoise(e.target.checked)}
        />
      </div>
      <div>
        <label htmlFor="speed-select" className="text-lg mr-1">
          Speed
        </label>
        <Select
          name="speed"
          id="speed-select"
          onChange={(e) => updateDelay(e.target.value)}
          defaultValue={DEFAULT_CONFIG.delay}
          className="bg-background"
          ariaLabel="Speed Select"
        >
          <option value={2500}>0.5x</option>
          <option value={2000}>0.75x</option>
          <option value={1500}>1x</option>
          <option value={1000}>1.5x</option>
          <option value={500}>2x</option>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={resetGame}
          className="px-4 text-lg active:bg-background-100 dark:active:bg-background-800"
          ariaLabel="Reset"
        >
          Reset
        </Button>
        <Button
          className="px-6 bg-primary text-lg active:bg-primary-300 dark:active:bg-primary-400"
          onClick={() => (isRunning ? pauseGame() : startGame())}
          ariaLabel="Start"
        >
          {isRunning ? "Pause" : "Start"}
        </Button>
      </div>
    </div>
  );
};

export default OptionsPanel;
