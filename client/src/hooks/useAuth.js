import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, logoutUser } from '../features/user/userSlice';

const useAuth = () => {
	const { authenticated } = useSelector(store => store.user);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	if (token) {
		const decodedToken = jwtDecode(token)
		if (decodedToken.exp * 4000 < Date.now()) {
			dispatch(logoutUser());
		} else {
			dispatch(setAuth());
			axios.defaults.headers.common['Authorization'] = token;
		}
	}

	return authenticated;

}

export default useAuth;