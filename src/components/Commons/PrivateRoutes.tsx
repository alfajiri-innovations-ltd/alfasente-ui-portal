import { isAuthenticated } from "@/lib/cookies/UserMangementCookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  const auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
