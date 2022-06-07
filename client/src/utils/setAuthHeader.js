import axios from 'axios';

const setAuthHeader = (token) => {
	const userToken = `Bearer ${token}`;
	localStorage.setItem('userToken', userToken);
	axios.defaults.headers.common['Authorization'] = userToken;
}

export default setAuthHeader;