import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const AuthService = ({ children }) => {
	const isAuth = useAuth();

	if (isAuth) {
		return <Navigate to='/' />
	}

	return (
		<>
			{children}
		</>
	)
}

export default AuthService