import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, removeAuthHeader } from "../../utils/setAuthHeader";
import userService from './userService'


const initialState = {
	authenticated: false,
	loading: false,
	errors: {},
	credentials: JSON.parse(localStorage.getItem('cred')) || {}
};


export const loginUser = createAsyncThunk('user/loginUser', userService.login);

export const registerUser = createAsyncThunk('user/registerUser', userService.register);


const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.authenticated = true;
		},
		logoutUser: () => {
			removeAuthHeader();
			return initialState;
		},
		setError: (state, action) => {
			state.errors = action.payload
		},
		clearErrors: (state) => {
			state.errors = {};
		},
	},
	extraReducers: {
		[loginUser.pending]: (state) => {
			state.loading = true;
		},
		[loginUser.fulfilled]: (state, action) => {
			if (!action.payload.success) {
				state.errors[action.payload.type || "general"] = action.payload.message;
			} else {
				setAuthHeader(action.payload.token);
				state.credentials = action.payload.user;
				state.authenticated = true;
				localStorage.setItem("cred", JSON.stringify(action.payload.user));
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
				localStorage.setItem("cred", JSON.stringify(action.payload.user));
			}
			state.loading = false;
		},
		[registerUser.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
			state.errors.general = action.payload;
		}
	}
});

export const { setError, setAuth, logoutUser, clearErrors } = userSlice.actions;

export default userSlice.reducer;