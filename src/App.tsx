import NavBar from "./components/NavBar";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <div className=" flex flex-col bg-background min-h-screen">
        <NavBar />
        <main className="max-w-screen-xl mx-auto ">
          {/* Main content goes here */}
          Game Visualization Placeholder
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
