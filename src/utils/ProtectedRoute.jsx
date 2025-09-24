// import { useAuth } from "../context/AuthContext"; // adjust import as needed
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { userData } = useAuth(); // or your auth logic
//   console.log(userData , "hello userdata")
//   if (!userData) {
//     return <Navigate to="/B2BBulkOrders-login" replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { userRole, loading } = useAuth();
console.log(userRole, "userRole in ProtectedRoute");
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!auth.currentUser) {
    // Redirect unauthenticated users to the appropriate login page
    return <Navigate to={requiredRole === "B2B" ? "/B2BBulkOrders-login" : "/B2c-login"} />;
  }

  if (requiredRole && userRole !== requiredRole) {
    // Redirect users with incorrect role to their homepage or login
    return <Navigate to={userRole === "B2C" ? "/" : userRole === "B2B" ? "/B2BBulkOrders-home" : "/B2c-login"} />;
  }

  return children;
};

export default ProtectedRoute;

