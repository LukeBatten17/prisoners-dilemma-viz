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
    updateDelay,
    updateMaxRounds,
    delay,
    payoff,
    matchComplete,
  } = useGameLogic();

  return (
    <div className="flex flex-col bg-background w-full min-h-screen text-text">
      <NavBar />
      <main className="flex flex-col justify-center items-center mx-auto p-4 pb-8 max-w-6xl">
        {/* Options Panel */}
        <div className=" mb-4">
          <OptionsPanel
            startGame={startGame}
            resetGame={resetGame}
            pauseGame={pauseGame}
            isRunning={isRunning}
            updateDelay={updateDelay}
            updateMaxRounds={updateMaxRounds}
          />
        </div>

        {/* Main Content Grid */}
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Strategy Card 1 */}
          <div className="flex-1 lg:w-xs">
            <StrategyCard
              strategyNumber={1}
              strategy={strategyOne}
              setStrategy={setStrategyOne}
              score={scores.strat_one}
              recentMove={
                stratOneHistory.length > 0
                  ? stratOneHistory[stratOneHistory.length - 1]?.move
                  : null
              }
              delay={delay}
              currentRound={currentRound}
            />
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-4 w-[348px] sm:w-[384px] md:w-[404] ">
            <TimelinePanel
              currentRound={currentRound}
              maxRounds={maxRounds}
              stratOneHistory={stratOneHistory}
              stratTwoHistory={stratTwoHistory}
            />
            <PayoffMatrix
              recentPayoff={payoff}
              delay={delay}
              currentRound={currentRound}
            />
          </div>

          {/* Strategy Card 2 */}
          <div className="flex-1 lg:w-xs ">
            <StrategyCard
              strategyNumber={2}
              strategy={strategyTwo}
              setStrategy={setStrategyTwo}
              score={scores.strat_two}
              recentMove={
                stratTwoHistory.length > 0
                  ? stratTwoHistory[stratTwoHistory.length - 1]?.move
                  : null
              }
              delay={delay}
              currentRound={currentRound}
            />
          </div>
        </div>

        {/* Chart */}
        <div className="w-full">
          <ChartCard
            strategy1={strategyOne}
            strategy2={strategyTwo}
            matchComplete={matchComplete}
            scores={scores}
            currentRound={currentRound}
          />
        </div>
      </main>
    </div>
  );
};

export default Game;
