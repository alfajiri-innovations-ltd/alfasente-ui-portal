import { Routes, Route, BrowserRouter } from "react-router-dom";

import React from "react";

const BeneficiariesPage = React.lazy(() => import("@/pages/Beneficiaries"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Transactions = React.lazy(() => import("@/pages/Transactions"));
const Staff = React.lazy(() => import("@/pages/Staff"));
const AuditLogs = React.lazy(() => import("@/pages/AuditLogs"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const ApplicationsPage = React.lazy(() => import("@/pages/Applications"));

const SettingsPage = React.lazy(() => import("@/pages/SettingsPage"));

import { Toaster } from "@/components/ui/sonner";
import Organisations from "@/pages/OrganisationsPage";
import { UserProvider } from "./hooks/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Toaster />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/beneficiaries" element={<BeneficiariesPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/applications" element={<ApplicationsPage />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default App;
