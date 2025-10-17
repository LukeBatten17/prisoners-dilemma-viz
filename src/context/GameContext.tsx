import { createContext, useContext, type ReactNode } from "react";
import { useGameLogic } from "../hooks/useGameLogic";

type GameContextType = ReturnType<typeof useGameLogic>;

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider = ({ children }: GameProviderProps) => {
  const game = useGameLogic();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export const useGameContext = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
