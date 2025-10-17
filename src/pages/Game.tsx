import ChartCard from "../components/ChartCard";
import NavBar from "../components/NavBar";
import OptionsPanel from "../components/OptionsPanel";
import PayoffMatrix from "../components/PayoffMatrix";
import StrategyCard from "../components/StrategyCard";
import TimelinePanel from "../components/TimelinePanel";
import { useGameLogic } from "../hooks/useGameLogic";

const Game = () => {
  const {
    currentRound,
    maxRounds,
    scores,
    isRunning,
    startGame,
    strategyOne,
    strategyTwo,
    setStrategyOne,
    setStrategyTwo,
    resetGame,
    pauseGame,
    stratOneHistory,
    stratTwoHistory,
  } = useGameLogic();
  return (
    <div className=" flex flex-col bg-background min-h-screen text-text">
      <NavBar />
      <main className="max-w-screen-xl mx-auto w-full">
        {/* Top row - 3 boxes */}
        <div className="w-fit place-self-center mb-4">
          <OptionsPanel
            startGame={startGame}
            resetGame={resetGame}
            pauseGame={pauseGame}
            isRunning={isRunning}
          />
        </div>
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <StrategyCard
              strategyNumber={1}
              strategy={strategyOne}
              setStrategy={setStrategyOne}
              score={scores.strat_one}
            />
          </div>
          <div className=" flex  flex-col flex-1 gap-4 max-w-96">
            <TimelinePanel
              currentRound={currentRound}
              maxRounds={maxRounds}
              stratOneHistory={stratOneHistory}
              stratTwoHistory={stratTwoHistory}
            />
            <PayoffMatrix />
          </div>
          <div className="flex-1">
            <StrategyCard
              strategyNumber={2}
              strategy={strategyTwo}
              setStrategy={setStrategyTwo}
              score={scores.strat_two}
            />
          </div>
        </div>

        {/* Bottom row - full width */}
        <div className="w-full">
          <ChartCard />
        </div>
      </main>
    </div>
  );
};

export default Game;
