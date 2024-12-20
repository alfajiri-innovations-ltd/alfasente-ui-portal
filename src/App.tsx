import { Routes, Route, BrowserRouter } from "react-router-dom";
import Client from "./pages/Client";
import Beneficiaries from "./pages/Beneficiaries";
import Transactions from "./pages/Transactions";
import Staff from "./pages/Staff";
import AuditLogs from "./pages/AuditLogs";
import LandingPage from "./pages/LandingPage";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Client />} />
          <Route path="/beneficiaries" element={<Beneficiaries />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
