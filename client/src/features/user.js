import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setAuthHeader from "../utils/setAuthHeader";
import axios from 'axios';




const initialState = {
	authenticated: false,
	loading: false,
	errors: {},
	credentials: {
		fullname: "",
		email: "",
		img: ""
	}
};


export const loginUser = createAsyncThunk('user/loginUser', async (cred, thunkAPI) => {
	try {
		const { data } = await axios.post('/user/login', cred);
		return data;
	} catch (error) {
		return thunkAPI.rejectWithValue('something went wrong');
	}
});


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuth: (state) => state.authenticated = true,
		setUnAuth: () => initialState,
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.loading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			console.log(action);
			state.loading = false;
			if (!action.payload.success) {
				state.errors[action.payload.type || "general"] = action.payload.message;
			} else {
				setAuthHeader(action.payload.token);
				state.credentials = action.payload.user;
			}
		},
		[loginUser.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		}
	}
});


export default userSlice.reducer;