import axios from 'axios';

const axiosInstance = axios.create({
	// baseURL: 'http://localhost:5000/api'
	baseURL: 'https://social-clone-api-v2.herokuapp.com/api'
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axiosInstance;