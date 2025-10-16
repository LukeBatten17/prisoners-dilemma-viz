import { Routes, Route, BrowserRouter } from "react-router";
import Game from "./pages/Game";
import About from "./pages/About";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Main content goes here */}
          <Route path="/" element={<Game />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
