import { Routes, Route } from "react-router";
import "./App.css";
import { Home } from "./pages/Home/Home";
import { Roadmap } from "./pages/Roadmap/Roadmap";
import { Demo } from "./pages/Demo/Demo";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/contact" element={<Home />} />
          <Route path="/pricing" element={<Home />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
