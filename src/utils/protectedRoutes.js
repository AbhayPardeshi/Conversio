import { Navigate } from "react-router-dom";

export const protectedRoutes = ({user,children}) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;    

};  
