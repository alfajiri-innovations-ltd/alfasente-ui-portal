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

import Organisations from "@/pages/OrganisationsPage";
import { UserProvider } from "./hooks/UserContext";

import { Toaster } from "./components/ui/toaster";
import PrivateRoutes from "./components/Commons/PrivateRoutes";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import ForgotPasswordPage from "./pages/ForgotPassword";
import WaitScreen from "./pages/WaitScreen";
import { ClientProvider } from "./hooks/ClientContext";
import MemebersPage from "./pages/Members";
import { FundWallet } from "./pages/FundWallet";
import { SendFunds } from "./pages/SendFunds";
import { UploadBeneficiaries } from "./components/Client/UploadBeneficiaries";

function App() {
  return (
    <>
      <Toaster />
      <UserProvider>
        <ClientProvider>
          <BrowserRouter>
            <Routes>
              {/* auth routes */}
              <Route element={<PrivateRoutes />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/beneficiaries" element={<BeneficiariesPage />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/audit-logs" element={<AuditLogs />} />
                <Route path="/applications" element={<ApplicationsPage />} />
                <Route path="/organisations" element={<Organisations />} />
                <Route path="/settings" element={<SettingsPage />} />

                <Route path="/fundwallet" element={<FundWallet />} />

                <Route path="/uploadlist" element={<UploadBeneficiaries />} />

                <Route path="/send-funds" element={<SendFunds />} />
              </Route>
              {/* end of auth routes */}

              {/* non auth routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/wait-approval" element={<WaitScreen />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/view-members/:listId" element={<MemebersPage />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              {/* end of non auth routes */}

              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </ClientProvider>
      </UserProvider>
    </>
  );
}

export default App;
