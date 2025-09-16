import { useAuth } from "../context/AuthContext"; // adjust import as needed
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    console.log(userData , "hello userdata")
  const { userData } = useAuth(); // or your auth logic
  if (!userData) {
    return <Navigate to="/B2BBulkOrders-login" replace />;
  }
  return children;
};

export default ProtectedRoute;
