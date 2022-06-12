import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

export const createPost = createAsyncThunk("post/createPost", postService.creatPostService);


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
			state.posts = action.payload;
		},
		setLoading: (state) => {
			state.loading = true;
		},
		setUnloading: (state) => {
			state.loading = false;
		}
	},
	extraReducers: {
		[createPost.pending]: (state) => {
			state.loading = true;
		},
		[createPost.fulfilled]: (state, action) => {
			console.log(action);
			if (action.payload.success) {
				state.posts.unshift(action.payload.post)
			}
			state.loading = false;
		},
		[createPost.rejected]: (state, action) => {
			state.loading = false;
			console.log(action);
		}
	}
});

export const { setPosts, setLoading, setUnloading } = postSlice.actions;

export default postSlice.reducer;