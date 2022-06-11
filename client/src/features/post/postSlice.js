import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	loading: false,
	errors: {},
	posts: []
};

const postSlice = createSlice({
	name: "post",
	initialState,
	reducers: {
		setPosts: (state, action) => {
			state.loading = true;
			state.posts = action.payload;
		}
	}
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;