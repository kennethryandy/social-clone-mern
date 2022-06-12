import axios from 'axios';

const creatPostService = async (postData, thunkAPI) => {
	try {
		const { data } = await axios.post("/post/add", postData);
		return data;
	} catch (err) {
		thunkAPI.error(err.message);
	}
}

const addCommentService = async (body, thunkAPI) => {
	try {
		const { data } = await axios.post('/comment/add', body);
		return data;
	} catch (err) {
		thunkAPI.error(err.message);
	}
};

const postServices = { addCommentService, creatPostService };
export default postServices;