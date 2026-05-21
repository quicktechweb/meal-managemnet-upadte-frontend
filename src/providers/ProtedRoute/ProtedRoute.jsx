// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;