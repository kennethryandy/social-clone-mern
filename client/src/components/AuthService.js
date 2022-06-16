import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const AuthService = ({ children }) => {
	const location = useLocation();
	const [isAuth, cred] = useAuth();

	if (isAuth || cred) {
		return <Navigate to='/' state={{ from: location }} replace />
	}

	return children;
}

export default AuthService