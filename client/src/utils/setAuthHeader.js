import axios from './axiosConfig';

const setAuthHeader = (token) => {
	const userToken = `Bearer ${token}`;
	localStorage.setItem('token', userToken);
	axios.defaults.headers.common['Authorization'] = userToken;
}

const removeAuthHeader = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('cred');
	delete axios.defaults.headers.common['Authorization'];
}

export { setAuthHeader, removeAuthHeader };