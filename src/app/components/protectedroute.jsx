import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
//asas
export default function ProtectedRoute({ children }) {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}