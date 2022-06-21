import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr'
import axios from '../utils/axiosConfig';

// MUI
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
// Components
import { PostSkeleton, ProfileSkeleton } from '../components/Skeletons';
import SideProfile from '../components/Profile/SideProfile';
import Posts from '../components/Posts/Posts';
import { setNotifications } from '../features/user/userSlice';
import { setPosts, setLoading, setUnloading } from '../features/post/postSlice';
import SinglePostDialog from '../components/Posts/SinglePostDialog';

const fetcher = (...args) => axios.get(args).then(res => res.data);
const devOptions = { shouldRetryOnError: true, revalidateOnFocus: true, revalidateOnMount: true };

const Home = () => {
	const { loading } = useSelector(store => store.post);
	const { data } = useSWR('http://localhost:5000/api/post/all', fetcher, devOptions);
	const { data: notifData } = useSWR('http://localhost:5000/api/notification/user', fetcher, devOptions);
	const dispatch = useDispatch();

	useEffect(() => {
		if (notifData?.success) {
			dispatch(setNotifications(notifData.notifications));
		}
	}, [dispatch, notifData]);

	useEffect(() => {
		if (!loading) {
			dispatch(setLoading());
		}
		if (data?.posts) {
			dispatch(setPosts(data.posts));
			dispatch(setUnloading());
		}
	}, [loading, data, dispatch]);

	return (
		<>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item md={4}>
						{data ? <SideProfile /> : <ProfileSkeleton />}
					</Grid>
					<Grid item md={8}>
						{data ? <Posts /> : <PostSkeleton />}
					</Grid>
				</Grid>
			</Container>
			<SinglePostDialog />
		</>
	)
}

export default Home