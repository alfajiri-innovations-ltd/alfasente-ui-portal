import { HashRouter, Routes, Route } from "react-router-dom";
import Client from "./pages/Client";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Client />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
