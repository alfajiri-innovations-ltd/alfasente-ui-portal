import { Routes, Route, BrowserRouter } from "react-router-dom";

import React from "react";

const BeneficiariesPage = React.lazy(() => import("@/pages/Beneficiaries"));
const ClientDashboard = React.lazy(() => import("@/pages/ClientDashboard"));
const Transactions = React.lazy(() => import("@/pages/Transactions"));
const Staff = React.lazy(() => import("@/pages/Staff"));
const AuditLogs = React.lazy(() => import("@/pages/AuditLogs"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));

import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/beneficiaries" element={<BeneficiariesPage />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
