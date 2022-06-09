import axios from 'axios'

const register = async (userData, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/register', userData);
		return { data };
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
}

const login = async (cred, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/login', cred);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
}

const userService = { register, login };

export default userService;