import { useEffect, useState } from "react";
import DEFAULT_CONFIG from "../gameSettings/config";

// ...existing code...
type Move = "C" | "D" | string;

interface HistoryEntry {
  move: Move;
  payoff: number;
}

export function useGameLogic() {
  const [currentRound, setCurrentRound] = useState(0);
  const [scores, setScores] = useState({ strat_one: 0, strat_two: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [maxRounds, setMaxRounds] = useState(DEFAULT_CONFIG.maxRounds);
  const [delay, setDelay] = useState(DEFAULT_CONFIG.delay);

  const [stratOneHistory, setStratOneHistory] = useState<HistoryEntry[]>([]);
  const [stratTwoHistory, setStratTwoHistory] = useState<HistoryEntry[]>([]);

  const [strategyOne, setStrategyOne] = useState(
    DEFAULT_CONFIG.defaultStratOne
  );
  const [strategyTwo, setStrategyTwo] = useState(
    DEFAULT_CONFIG.defaultStratTwo
  );
  console.log(`Strategy 1 is ${strategyOne.name}`);
  console.log(`Strategy 2 is ${strategyTwo.name}`);
  try {
    useEffect(() => {
      if (!isRunning || currentRound >= maxRounds) return;

      const timer = setTimeout(() => {
        const move_one = strategyOne.strategy(stratOneHistory, stratTwoHistory);
        const move_two = strategyTwo.strategy(stratTwoHistory, stratOneHistory);

        const key =
          `${move_one}${move_two}` as keyof typeof DEFAULT_CONFIG.payoffMatrix;
        const [payoff_one, payoff_two] = DEFAULT_CONFIG.payoffMatrix[key];
        //const { payoffOne: number, payoffTwo: number } = DEFAULT_CONFIG.payoffMatrix[move_one+move_two]

        setStratOneHistory((prev) => [
          ...prev,
          { move: move_one, payoff: payoff_one },
        ]);
        setStratTwoHistory((prev) => [
          ...prev,
          { move: move_two, payoff: payoff_two },
        ]);
        setScores((prev) => ({
          strat_one: prev.strat_one + payoff_one,
          strat_two: prev.strat_two + payoff_two,
        }));
        setCurrentRound((prev) => prev + 1);
      }, delay);

      return () => clearTimeout(timer);
    }, [
      isRunning,
      currentRound,
      stratOneHistory,
      stratTwoHistory,
      strategyOne,
      strategyTwo,
      delay,
      maxRounds,
    ]);
  } catch (e) {
    console.error(e);
    setIsRunning(false);
  }
  useEffect(() => {
    console.log("History updated:", stratOneHistory);
  }, [stratOneHistory]);

  const resetGame = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setScores({ strat_one: 0, strat_two: 0 });
    setStratOneHistory([]);
    setStratTwoHistory([]);
    setStrategyOne(DEFAULT_CONFIG.defaultStratOne);
    setStrategyTwo(DEFAULT_CONFIG.defaultStratTwo);
  };

  const startGame = () => setIsRunning(true);
  const pauseGame = () => setIsRunning(false);
  const updateMaxRounds = (rounds: number) => setMaxRounds(rounds);
  const updateDelay = (newDelay: number) => setDelay(newDelay);

  return {
    currentRound,
    stratOneHistory,
    stratTwoHistory,
    scores,
    isRunning,
    maxRounds,
    delay,
    strategyOne,
    strategyTwo,
    resetGame,
    startGame,
    pauseGame,
    updateMaxRounds,
    updateDelay,
    setStrategyOne,
    setStrategyTwo,
  };
}
