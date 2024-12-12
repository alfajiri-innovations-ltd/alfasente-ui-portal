import { Routes, Route, BrowserRouter } from "react-router-dom";
import Client from "./pages/Client";
import Beneficiaries from "./pages/Beneficiaries";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
