import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useFecthData from '../hooks/useFecthData';
import Paper from '@mui/material/Paper';
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

const Home = () => {
	const { loading } = useSelector(store => store.post);
	const { data: postsData, loading: postLoading } = useFecthData('https://social-clone-api-v2.herokuapp.com/api/post/all');
	const { data: notifData, loading: loadingNotif } = useFecthData('https://social-clone-api-v2.herokuapp.com/api/notification/user');
	// const { data: postsData, loading: postLoading } = useFecthData('http://localhost:5000/api/post/all');
	// const { data: notifData, loading: loadingNotif } = useFecthData('http://localhost:5000/api/notification/user');
	const dispatch = useDispatch();

	useEffect(() => {
		if (notifData?.success && !loadingNotif) {
			dispatch(setNotifications(notifData.notifications));
		}
	}, [dispatch, notifData, loadingNotif]);

	useEffect(() => {
		if (!loading) {
			dispatch(setLoading());
		}
		if (!postLoading) {
			dispatch(setPosts(postsData.posts));
			dispatch(setUnloading());
		}
	}, [loading, postsData, dispatch, postLoading]);

	return (
		<>
			<Container maxWidth="lg">
				<Grid container spacing={3}>
					<Grid item md={4} sx={{ display: { xs: "none", sm: "none", md: "block" }, width: "100%" }}>
						{!postLoading ? <Paper elevation={2}><SideProfile /></Paper> : <ProfileSkeleton />}
					</Grid>
					<Grid item md={8} sm={12} sx={{ width: "100%" }}>
						{!postLoading ? <Posts /> : <PostSkeleton />}
					</Grid>
				</Grid>
			</Container>
			<SinglePostDialog />
		</>
	)
}

export default Home