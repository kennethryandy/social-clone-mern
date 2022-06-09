import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import setAuthHeader from "../../utils/setAuthHeader";
import userService from './userService'


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


export const loginUser = createAsyncThunk('user/loginUser', userService.login);

export const registerUser = createAsyncThunk('user/registerUser', userService.register);


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUnAuth: () => initialState,
		setError: (state, action) => {
			state.errors = action.payload
		}
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.loading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			console.log(action);
			if (!action.payload.success) {
				state.errors[action.payload.type || "general"] = action.payload.message;
			} else {
				setAuthHeader(action.payload.token);
				state.credentials = action.payload.user;
			}
			state.loading = false;
		},
		[loginUser.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		},
		[registerUser.pending]: (state) => { state.loading = true },
		[registerUser.fulfilled]: (state, action) => {
			if (!action.payload.success) {
				state.errors[action.payload.type || "general"] = action.payload.message;
			} else {
				setAuthHeader(action.payload.token);
				state.credentials = action.payload.user;
				state.authenticated = true;
			}
			state.loading = false;
		},
		[registerUser.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		}
	}
});

export const { setError } = userSlice.actions;

export default userSlice.reducer;