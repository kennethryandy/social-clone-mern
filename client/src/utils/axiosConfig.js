import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api'
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axiosInstance;