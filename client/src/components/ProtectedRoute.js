import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
	const [isAuth, cred] = useAuth();
	const location = useLocation();
	console.log("isAuth: ", isAuth);
	console.log("cred: ", cred);
	if (!isAuth) {
		return <Navigate to="/login" state={{ from: location }} replace />;
	}

	return children;
}

export default ProtectedRoute