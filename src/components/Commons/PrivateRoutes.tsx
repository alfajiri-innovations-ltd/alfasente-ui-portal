// import { isAuthenticated } from "@/lib/cookies/UserMangementCookie";
import { authService } from "@/lib/services/AuthService";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const auth = authService.isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
