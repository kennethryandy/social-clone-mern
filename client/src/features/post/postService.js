import axios from 'axios';

const creatPostService = async (postData, thunkAPI) => {
	try {
		const { data } = await axios.post("/post/add", postData);
		return data;
	} catch (err) {
		thunkAPI.error(err.message);
	}
}


export default { creatPostService };