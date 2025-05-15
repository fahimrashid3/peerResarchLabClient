import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const PrivetRoute = ({ children }) => {
  const { user, loading, logOut } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loading></Loading>;
  }
  if (user) {
    return children;
  }
  if (!user) {
    logOut();
  }
  return <Navigate to="/login" state={{ form: location }} replace />;
};

export default PrivetRoute;
