import axios from '../../utils/axiosConfig';

const getAllUsers = async (_, thunkAPI) => {
	try {
		const { data } = await axios.get('/user/all');
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
};

const register = async (userData, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/register', userData);
		return data;
	} catch (err) {
		if (err.response.data) {
			return err.response.data;
		}
		return thunkAPI.rejectWithValue(err.message);
	}
};

const login = async (cred, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/login', cred);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
};

const updateProfilePicture = async (formData, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/profile', formData);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
};

const updateUserDetails = async (userDetails, thunkAPI) => {
	try {
		const { data } = await axios.put('/user/details', userDetails);
		return data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.message);
	}
};

const readNotifications = async (ids, thunkAPI) => {
	try {
		const { data } = await axios.put('/notification/read', ids);
		return data;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
};


const deleteNotification = async (id, thunkAPI) => {
	try {
		const { data } = await axios.delete(`/notification/${id}`);
		return data;
	} catch (err) {
		thunkAPI.rejectWithValue(err.message);
	}
};

const userService = { register, login, getAllUsers, readNotifications, deleteNotification, updateUserDetails, updateProfilePicture };

export default userService;