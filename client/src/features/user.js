import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	fullname: "",
	email: "",
	img: ""
};

const userSlice = createSlice({
	name: "user",
	initialState
});

export default userSlice.reducer;