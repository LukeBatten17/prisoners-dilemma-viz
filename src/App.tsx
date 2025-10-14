import { Routes, Route, BrowserRouter } from "react-router";
import Game from "./pages/Game";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main content goes here */}
        <Route path="/" element={<Game />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
