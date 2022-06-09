import { useSelector } from 'react-redux';
// import {  } from '../features/user/userSlice';

export default function () {
	const authenticated = useSelector(store => store.user.authenticated);
	const token = JSON.parse(localStorage.getItem('token'));
	// console.log(token);
	if (!authenticated && !token) {
		return false;
	}

	// if(!authenticated && typeof token === 'string') {

	// }

	return true;

}