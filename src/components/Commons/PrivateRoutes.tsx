import { isAuthenticated } from "@/lib/cookies/UserMangementCookie";
import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = () => {
  let auth = isAuthenticated();
  return auth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
