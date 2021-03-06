import { useEffect } from 'react'
import jwtDecode from 'jwt-decode';
import axios from '../utils/axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth, logoutUser } from '../features/user/userSlice';

const useAuth = () => {
	const { authenticated, credentials } = useSelector(store => store.user);
	const dispatch = useDispatch();
	const token = localStorage.getItem('token');

	useEffect(() => {
		if (token) {
			const decodedToken = jwtDecode(token);

			if (decodedToken.exp <= Date.now().valueOf() / 1000) {
				dispatch(logoutUser());
			} else {
				dispatch(setAuth());
				axios.defaults.headers.common['Authorization'] = token;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return [authenticated, Object.keys(credentials).length !== 0];

}

export default useAuth;