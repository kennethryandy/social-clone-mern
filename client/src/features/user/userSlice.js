import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, removeAuthHeader } from "../../utils/setAuthHeader";
import userService from './userService'


const initialState = {
	authenticated: false,
	loading: false,
	errors: {},
	credentials: JSON.parse(localStorage.getItem('cred')) || {},
	notifications: []
};


export const loginUser = createAsyncThunk('user/loginUser', userService.login);

export const registerUser = createAsyncThunk('user/registerUser', userService.register);

// export const getAllUsers = createAsyncThunk('user/getAllUsers', userService.getAllUsers);

export const readNotifications = createAsyncThunk('user/readNotifications', userService.readNotifications);

export const deleteNotification = createAsyncThunk('user/deleteNotification', userService.deleteNotification);

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
		setLoading: (state) => {
			state.loading = true;
		},
		setError: (state, action) => {
			state.errors = action.payload
		},
		clearErrors: (state) => {
			state.errors = {};
		},
		setUsers: (state, action) => {
			state.users = action.payload;
		},
		setNotifications: (state, { payload }) => {
			state.notifications = payload;
			state.loading = false;
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
		// Read notifications
		[readNotifications.fulfilled]: (state, { payload }) => {
			if (payload.success) {
				const readNotifs = state.notifications.map(notification => payload.notification_ids.includes(notification._id) ? { ...notification, read: true } : notification);
				state.notifications = readNotifs;
			}
		},
		[readNotifications.rejected]: (state, action) => {
			console.log(action);
		},
		// Delete notifications
		[deleteNotification.fulfilled]: (state, { payload }) => {
			const notifIdx = state.notifications.findIndex(notification => notification._id === payload.notification_id);
			if (notifIdx !== -1) {
				state.notifications.splice(notifIdx, 1);
			}
		}
	}
});

export const { setError, setAuth, logoutUser, clearErrors, setUsers, setNotifications, setLoading } = userSlice.actions;

export default userSlice.reducer;