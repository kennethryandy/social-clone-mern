import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import postService from "./postService";

export const createPost = createAsyncThunk("post/createPost", postService.creatPostService);

export const deletePost = createAsyncThunk("post/deletePost", postService.deletePostService);

export const addComment = createAsyncThunk("comment/add", postService.addCommentService);

export const likePost = createAsyncThunk("post/likePost", postService.likePostService);

export const unlikePost = createAsyncThunk("post/unlikePost", postService.unlikePostService);

const initialState = {
	loading: false,
	loadingDeletePostId: null,
	loadingComment: false,
	loadingLike: false,
	addPostLoading: false,
	errors: {},
	posts: [],
	userPosts: []
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
		},
		setUserPosts: (state, { payload }) => {
			state.userPosts = payload;
		},
		setLoadingDeletePostId: (state, { payload }) => {
			state.loadingDeletePostId = payload;
		}
	},
	extraReducers: {
		// Post
		[createPost.pending]: (state) => {
			state.addPostLoading = true;
		},
		[createPost.fulfilled]: (state, { payload }) => {
			if (payload.data.success) {
				state.posts.unshift(payload.data.post);
				if (payload.user?.id === payload.data.post.creator.id) {
					state.userPosts.unshift(payload.data.post);
				}
			}
			state.addPostLoading = false;
		},
		[createPost.rejected]: (state, action) => {
			state.addPostLoading = false;
			console.log(action);
		},
		// Delete a post
		[deletePost.fulfilled]: (state, { payload }) => {
			console.log(payload);
			if (payload.data.success) {
				const postIdx = state.posts.findIndex(post => post._id === payload.postId);
				if (postIdx !== -1) {
					state.posts.splice(postIdx, 1);
				}
				const userPostIdx = state.userPosts.findIndex(post => post._id === payload.postId);
				if (userPostIdx !== -1) {
					state.userPosts.splice(userPostIdx, 1);
				}
			}
			state.loadingDeletePostId = null;
		},
		[deletePost.rejected]: (state, action) => {
			console.log(action);
			state.loadingDeletePostId = null;
		},
		// Comment
		[addComment.pending]: (state) => {
			state.loadingComment = true;
		},
		[addComment.fulfilled]: (state, action) => {
			if (action.payload.success) {
				const postIdx = state.posts.findIndex(post => post._id === action.payload.comment.postId);
				if (postIdx !== -1) {
					state.posts[postIdx].comments.push(action.payload.comment);
				}
				const userPostIdx = state.userPosts.findIndex(post => post._id === action.payload.comment.postId);
				if (userPostIdx !== -1) {
					state.userPosts[userPostIdx].comments.push(action.payload.comment);
				}
			}
			state.loading = false;
		},
		[addComment.rejected]: (state, action) => {
			console.log(action);
			state.loading = false;
		},
		// Like
		[likePost.pending]: (state) => {
			state.loadingLike = true;
		},
		[likePost.fulfilled]: (state, { payload }) => {
			if (payload.success) {
				const postIdx = state.posts.findIndex(post => post._id === payload.postId);
				const user = JSON.parse(localStorage.getItem('cred'));
				if (postIdx !== -1) {
					state.posts[postIdx].likes.push({
						...payload.like,
						creator: {
							...user,
							_id: user.id
						}
					});
				}
				const userPostIdx = state.userPosts.findIndex(post => post._id === payload.postId);
				if (userPostIdx !== -1) {
					state.userPosts[userPostIdx].likes.push({
						...payload.like,
						creator: {
							...user,
							_id: user.id
						}
					});
				}
			}
			state.loadingLike = false;
		},
		[likePost.rejected]: (state, action) => {
			console.log(action);
			state.loadingLike = false;
		},
		// Unlike
		[unlikePost.pending]: (state) => {
			state.loadingLike = true;
		},
		[unlikePost.fulfilled]: (state, { payload }) => {
			if (payload.success) {
				const postIdx = state.posts.findIndex(post => post._id === payload.postId);
				if (postIdx !== -1) {
					const likeIdx = state.posts[postIdx].likes.findIndex(like => like._id === payload.likeId);
					if (likeIdx !== -1) {
						state.posts[postIdx].likes.splice(likeIdx, 1);
					}
				}
				const userPostIdx = state.userPosts.findIndex(post => post._id === payload.postId);
				if (userPostIdx !== -1) {
					const userPostLikeIdx = state.userPosts[userPostIdx].likes.findIndex(like => like._id === payload.likeId);
					if (userPostLikeIdx !== -1) {
						state.userPosts[userPostIdx].likes.splice(userPostLikeIdx, 1);
					}
				}
			}
			state.loadingLike = false;
		},
		[unlikePost.rejected]: (state, action) => {
			console.log(action);
			state.loadingLike = false;
		}
	}
});

export const { setPosts, setLoading, setUnloading, setUserPosts, setLoadingDeletePostId } = postSlice.actions;

export default postSlice.reducer;