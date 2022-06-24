import axios from 'axios';

// export const baseURL = 'https://social-clone-api-v2.herokuapp.com/api';
export const baseURL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
	baseURL
});
axiosInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
export default axiosInstance;