import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound";
import React from "react";

const BeneficiariesPage = React.lazy(() => import("@/pages/Beneficiaries"));
const Dashboard = React.lazy(() => import("@/pages/Dashboard"));
const Transactions = React.lazy(() => import("@/pages/Transactions"));
const Staff = React.lazy(() => import("@/pages/Staff"));
const AuditLogs = React.lazy(() => import("@/pages/AuditLogs"));
const LandingPage = React.lazy(() => import("@/pages/LandingPage"));
const ApplicationsPage = React.lazy(() => import("@/pages/Applications"));

const SettingsPage = React.lazy(() => import("@/pages/SettingsPage"));
const AboutUs = React.lazy(() => import("@/pages/AboutUs"));

const AdminDashboard = React.lazy(() => import("@/pages/Admin/DashboardPage"));

import Organisations from "@/pages/OrganisationsPage";
import { UserProvider } from "./hooks/UserContext";
import AdminTransactions from "./pages/Admin/TransactionsPage";
import ManualTransactions from "./pages/Admin/ManualsPage";
import { Toaster } from "./components/ui/toaster";
import PrivateRoutes from "./components/Commons/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import WaitScreen from "./pages/WaitScreen";
import { ClientProvider } from "./hooks/ClientContext";
// import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />

      <UserProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/beneficiaries" element={<BeneficiariesPage />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/organisations" element={<Organisations />} />
                <Route path="/settings" element={<SettingsPage />} />
                {/* //Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route
                  path="/admin/transactions"
                  element={<AdminTransactions />}
                />
                <Route path="/admin/manuals" element={<ManualTransactions />} />
              </Route>

              <Route path="/" element={<LandingPage />} />
              <Route path="*" element={<PageNotFound />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/wait-approval" element={<WaitScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </UserProvider>
    </>
  );
}

export default App;
