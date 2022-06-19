import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setAuthHeader, removeAuthHeader } from "../../utils/setAuthHeader";
import userService from './userService'


const initialState = {
	authenticated: false,
	loading: false,
	loadingProfilePicture: false,
	previewProfileImage: null,
	userDetailsUpdated: false,
	user: {},
	errors: {},
	credentials: JSON.parse(localStorage.getItem('cred')) || {},
	notifications: []
};


export const loginUser = createAsyncThunk('user/loginUser', userService.login);

export const registerUser = createAsyncThunk('user/registerUser', userService.register);

// export const getAllUsers = createAsyncThunk('user/getAllUsers', userService.getAllUsers);

export const getUserById = createAsyncThunk('user/getUserById', userService.getUserById);

export const updateProfilePicture = createAsyncThunk('user/updateProfilePicture', userService.updateProfilePicture);

export const updateUserDetails = createAsyncThunk('user/updateUserDetails', userService.updateUserDetails);

export const readNotifications = createAsyncThunk('user/readNotifications', userService.readNotifications);

export const deleteNotification = createAsyncThunk('user/deleteNotification', userService.deleteNotification);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuth: (state) => {
			state.authenticated = true;
		},
		logoutUser: () => {
			removeAuthHeader();
			return {
				...initialState,
				credentials: {}
			};
		},
		setLoading: (state, { payload }) => {
			state.loading = payload;
		},
		setError: (state, action) => {
			state.errors = action.payload
		},
		clearErrors: (state) => {
			state.errors = {};
		},
		// setUsers: (state, action) => {
		// 	state.users = action.payload;
		// },
		setNotifications: (state, { payload }) => {
			state.notifications = payload;
			state.loading = false;
		},
		setPreviewProfileImage: (state, { payload }) => {
			state.previewProfileImage = payload;
		},
		resetUserDetailsUpdated: state => { state.userDetailsUpdated = false; },
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
		// Get User By Id
		[getUserById.pending]: (state) => {
			state.loading = true;
		},
		[getUserById.fulfilled]: (state, { payload }) => {
			if (payload.success) {
				state.user = payload.user;
			}
			state.loading = false;
		},
		[getUserById.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
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
		},
		// Update User
		[updateUserDetails.pending]: (state) => {
			state.loading = true;
		},
		[updateUserDetails.fulfilled]: (state, { payload }) => {
			if (payload.success) {
				const newCred = {
					...state.credentials,
					...payload.userDetails
				}
				localStorage.setItem("cred", JSON.stringify(newCred));
				state.credentials = newCred;
			}
			state.userDetailsUpdated = true;
			state.loading = false;
		},
		[updateUserDetails.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		},
		// Change Profile Picture
		[updateProfilePicture.pending]: (state) => { state.loadingProfilePicture = true; },
		[updateProfilePicture.fulfilled]: (state, { payload }) => {
			console.log(payload);
			if (payload.success) {
				localStorage.setItem("cred", JSON.stringify({ ...state.credentials, img: payload.imgUrl }));
				state.credentials.img = payload.imgUrl;
			}
			state.loadingProfilePicture = false;
			state.previewProfileImage = null;
		},
		[updateProfilePicture.rejected]: (state, action) => {
			console.log(action);
			state.loadingProfilePicture = false;
		}
	}
});

export const { setError, setAuth, logoutUser, clearErrors, setUsers, setNotifications, setLoading, resetUserDetailsUpdated, setPreviewProfileImage } = userSlice.actions;

export default userSlice.reducer;