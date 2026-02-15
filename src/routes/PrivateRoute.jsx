import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loader from "../components/shared/Loader";

const PrivateRoute = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if (loading) {
        return <Loader/>;
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to="/login" />
};

export default PrivateRoute;