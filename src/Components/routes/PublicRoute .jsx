/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const accessToken = useSelector((state) => state.auth?.accessToken);



  if (accessToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};


export default PublicRoute;
