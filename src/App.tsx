import { Routes, Route, BrowserRouter } from "react-router-dom";
import Client from "./pages/Client";
import Beneficiaries from "./pages/Beneficiaries";
import Transactions from "./pages/Transactions";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Client />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
