import ChartCard from "../components/ChartCard";
import NavBar from "../components/NavBar";
import OptionsPanel from "../components/OptionsPanel";
import PayoffMatrix from "../components/PayoffMatrix";
import StrategyCard from "../components/StrategyCard";
import TimelinePanel from "../components/TimelinePanel";
import { ThemeProvider } from "../context/ThemeContext";

const Game = () => {
  return (
    <ThemeProvider>
      <div className=" flex flex-col bg-background min-h-screen text-text">
        <NavBar />
        <main className="max-w-screen-xl mx-auto w-full">
          {/* Top row - 3 boxes */}
          <div className="w-fit place-self-center mb-4">
            <OptionsPanel />
          </div>
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <StrategyCard strategy={1} score={200} />
            </div>
            <div className=" flex  flex-col flex-1 gap-4">
              <TimelinePanel />
              <PayoffMatrix />
            </div>
            <div className="flex-1">
              <StrategyCard strategy={2} score={150} />
            </div>
          </div>

          {/* Bottom row - full width */}
          <div className="w-full">
            <ChartCard />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default Game;
