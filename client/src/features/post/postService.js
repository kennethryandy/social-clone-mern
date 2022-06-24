import axios from '../../utils/axiosConfig';

const creatPostService = async (postData, thunkAPI) => {
	try {
		const { data } = await axios.post("/post/add", postData);
		return {
			data,
			user: thunkAPI.getState().user.user
		};
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
}

const addCommentService = async (body, thunkAPI) => {
	try {
		const { data } = await axios.post('/comment/add', body);
		return data;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
};

const likePostService = async (postId, thunkAPI) => {
	try {
		const { data } = await axios.post(`/like/${postId}`);
		return data;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
}

const unlikePostService = async (postId, thunkAPI) => {
	try {
		const { data } = await axios.delete(`/like/${postId}`);
		return data;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
}

const postServices = { addCommentService, creatPostService, likePostService, unlikePostService };
export default postServices;