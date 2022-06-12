import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, removeAuthHeader } from "../../utils/setAuthHeader";
import userService from './userService'


const initialState = {
	authenticated: false,
	loading: false,
	errors: {},
	credentials: JSON.parse(localStorage.getItem('cred')) || {},
	users: []
};


export const loginUser = createAsyncThunk('user/loginUser', userService.login);

export const registerUser = createAsyncThunk('user/registerUser', userService.register);

export const getAllUsers = createAsyncThunk('user/getAllUsers', userService.getAllUsers);

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
		setUsers: (state, action) => {
			state.users = action.payload;
		}
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
			state.loading = false;
			state.errors.general = action.payload;
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
			state.loading = false;
			state.errors.general = action.payload;
		},
		// [getAllUsers.pending]: (state) => { state.loading = true; },
		// [getAllUsers.fulfilled]: (state, action) => {
		// 	if (action.payload.success) {
		// 		state.users = action.payload.users;
		// 	}
		// 	state.loading = false;
		// },
		// [getAllUsers.rejected]: (state, action) => {
		// 	console.log(action);
		// 	state.loading = false;
		// }
	}
});

export const { setError, setAuth, logoutUser, clearErrors, setUsers } = userSlice.actions;

export default userSlice.reducer;