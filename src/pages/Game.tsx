import NavBar from "../components/NavBar";
import { ThemeProvider } from "../context/ThemeContext";

const Game = () => {
  return (
    <ThemeProvider>
      <div className=" flex flex-col bg-background min-h-screen">
        <NavBar />
        <main className="max-w-screen-xl mx-auto ">Game....</main>
      </div>
    </ThemeProvider>
  );
};

export default Game;
