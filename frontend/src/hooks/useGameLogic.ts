import { useEffect, useState } from "react";
import DEFAULT_CONFIG from "../gameSettings/config";
import type { HistoryEntry } from "../gameSettings/types";

export function useGameLogic() {
  const [currentRound, setCurrentRound] = useState(0);
  const [scores, setScores] = useState({ strat_one: 0, strat_two: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [maxRounds, setMaxRounds] = useState(DEFAULT_CONFIG.maxRounds);
  const [delay, setDelay] = useState(DEFAULT_CONFIG.delay);
  const [payoff, setPayoff] = useState<string | null>(null);
  const [matchComplete, setMatchComplete] = useState(false);
  const [noise, setNoise] = useState(DEFAULT_CONFIG.noise);

  const [stratOneHistory, setStratOneHistory] = useState<HistoryEntry[]>([]);
  const [stratTwoHistory, setStratTwoHistory] = useState<HistoryEntry[]>([]);

  const [strategyOne, setStrategyOne] = useState(
    DEFAULT_CONFIG.defaultStratOne,
  );
  const [strategyTwo, setStrategyTwo] = useState(
    DEFAULT_CONFIG.defaultStratTwo,
  );

  useEffect(() => {
    try {
      if (currentRound >= maxRounds) {
        setIsRunning(false);
        setMatchComplete(true);

        return;
      }
      if (!isRunning) return;

      const playRound = () => {
        let move_one = strategyOne.strategy(stratOneHistory, stratTwoHistory);
        let move_two = strategyTwo.strategy(stratTwoHistory, stratOneHistory);

        let affectedByNoiseOne = false;
        let affectedByNoiseTwo = false;

        // Simulate noise
        if (noise) {
          const noiseChance = DEFAULT_CONFIG.noiseChance;
          if (Math.random() < noiseChance) {
            move_one = move_one === "C" ? "D" : "C";
            affectedByNoiseOne = true;
            console.log("Noise altered move one");
          }
          if (Math.random() < noiseChance) {
            move_two = move_two === "C" ? "D" : "C";
            affectedByNoiseTwo = true;

            console.log("Noise altered move two");
          }
        }

        const key =
          `${move_one}${move_two}` as keyof typeof DEFAULT_CONFIG.payoffMatrix;
        const [payoff_one, payoff_two] = DEFAULT_CONFIG.payoffMatrix[key];

        setPayoff(`${payoff_one}${payoff_two}`);
        setStratOneHistory((prev) => [
          ...prev,
          {
            move: move_one,
            payoff: payoff_one,
            affectedByNoise: affectedByNoiseOne,
          },
        ]);
        setStratTwoHistory((prev) => [
          ...prev,
          {
            move: move_two,
            payoff: payoff_two,
            affectedByNoise: affectedByNoiseTwo,
          },
        ]);
        setScores((prev) => ({
          strat_one: prev.strat_one + payoff_one,
          strat_two: prev.strat_two + payoff_two,
        }));
        setCurrentRound((prev) => prev + 1);
      };
      if (currentRound === 0) {
        playRound(); // instant first round
      } else {
        const timer = setTimeout(playRound, delay);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.error(e);
      setIsRunning(false);
    }
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

  useEffect(() => {
    if (!matchComplete) return;

    // console.log({
    //   strategyOneId: strategyOne.id,
    //   strategyTwoId: strategyTwo.id,
    //   strategyOnePoints: scores.strat_one,
    //   strategyTwoPoints: scores.strat_two,
    //   totalRounds: parseInt(maxRounds.toString()),
    //   winnerId:
    //     scores.strat_one > scores.strat_two
    //       ? strategyOne.id
    //       : scores.strat_two > scores.strat_one
    //         ? strategyTwo.id
    //         : null,
    //   noise: noise,
    //   noiseChance: DEFAULT_CONFIG.noiseChance,
    //   rounds: stratOneHistory.map((entry, index) => ({
    //     roundNumber: index + 1,
    //     strategyOneMove: entry.move,
    //     strategyTwoMove: stratTwoHistory[index].move,
    //     strategyOnePoints: entry.payoff,
    //     strategyTwoPoints: stratTwoHistory[index].payoff,
    //     strategyOneAffectedByNoise:
    //       noise &&
    //       entry.move !==
    //         strategyOne.strategy(
    //           stratOneHistory.slice(0, index),
    //           stratTwoHistory.slice(0, index),
    //         ),
    //     strategyTwoAffectedByNoise:
    //       noise &&
    //       stratTwoHistory[index].move !==
    //         strategyTwo.strategy(
    //           stratTwoHistory.slice(0, index),
    //           stratOneHistory.slice(0, index),
    //         ),
    //   })),
    // });

    fetch("/api/matches", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        strategyOneId: strategyOne.id,
        strategyTwoId: strategyTwo.id,
        strategyOnePoints: scores.strat_one,
        strategyTwoPoints: scores.strat_two,
        totalRounds: parseInt(maxRounds.toString()),
        winnerId:
          scores.strat_one > scores.strat_two
            ? strategyOne.id
            : scores.strat_two > scores.strat_one
              ? strategyTwo.id
              : null,
        noise: noise,
        noiseChance: DEFAULT_CONFIG.noiseChance,
        rounds: stratOneHistory.map((entry, index) => ({
          roundNumber: index + 1,
          strategyOneMove: entry.move,
          strategyTwoMove: stratTwoHistory[index].move,
          strategyOnePoints: entry.payoff,
          strategyTwoPoints: stratTwoHistory[index].payoff,
          strategyOneAffectedByNoise:
            noise &&
            entry.move !==
              strategyOne.strategy(
                stratOneHistory.slice(0, index),
                stratTwoHistory.slice(0, index),
              ),
          strategyTwoAffectedByNoise:
            noise &&
            stratTwoHistory[index].move !==
              strategyTwo.strategy(
                stratTwoHistory.slice(0, index),
                stratOneHistory.slice(0, index),
              ),
        })),
      }),
    }).catch(console.error);
  }, [matchComplete]);

  const resetGame = () => {
    setIsRunning(false);
    setCurrentRound(0);
    setScores({ strat_one: 0, strat_two: 0 });
    setStratOneHistory([]);
    setStratTwoHistory([]);
    setPayoff(null);
    setMatchComplete(false);
  };

  const startGame = () => {
    if (currentRound >= maxRounds) {
      resetGame();
    }
    setIsRunning(true);
  };
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
    payoff,
    matchComplete,
    setNoise,
  };
}
