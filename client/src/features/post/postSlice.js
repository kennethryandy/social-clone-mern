import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

export const createPost = createAsyncThunk("post/createPost", postService.creatPostService);

export const addComment = createAsyncThunk("comment/add", postService.addCommentService)

const initialState = {
	loading: false,
	loadingComment: false,
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
		},
		[addComment.pending]: (state) => {
			state.loadingComment = true;
		},
		[addComment.fulfilled]: (state, action) => {
			if (action.payload.success) {
				const postIdx = state.posts.findIndex(post => post._id === action.payload.comment.postId);
				state.posts[postIdx].comments.push(action.payload.comment);
			}
			state.loading = false;
		},
		[addComment.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		}
	}
});

export const { setPosts, setLoading, setUnloading } = postSlice.actions;

export default postSlice.reducer;