import { createSlice } from "@reduxjs/toolkit";

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

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAuth: (state) => state.authenticated = true,
		setUnAuth: () => initialState,
	}
});

export default userSlice.reducer;