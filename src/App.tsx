import { Routes, Route } from "react-router-dom";
import Click from "./pages/Click";
import Scroll from "./pages/Scroll";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route element={<Click />} path="/:id" />
      <Route element={<Scroll />} path="/scroll" />
    </Routes>
  );
}

export default App;
