import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, setUsers } from '../features/user/userSlice';
import useSWR from 'swr'
import axios from 'axios';
import { setAuthHeader } from '../utils/setAuthHeader';

const fetcher = (...args) => axios.get(args).then(res => res.data);
const devOptions = { shouldRetryOnError: false, revalidateOnFocus: false };

const Home = () => {
	const { data: userData } = useSWR('http://localhost:5000/api/user/all', fetcher, devOptions);
	const { data: postData } = useSWR('http://localhost:5000/api/post/all', fetcher, devOptions);
	const dispatch = useDispatch();
	const { users } = useSelector((store) => store.user);

	useEffect(() => {
		// dispatch(getAllUsers());
		if (userData.users && postData.posts) {
			dispatch(setUsers(userData?.users));
		}

	}, [userData, postData, dispatch]);

	return (
		<div>Home</div>
	)
}

export default Home