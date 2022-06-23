const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/upload');
const Post = require('../model/post');
const User = require('../model/user');
const router = require('express').Router();


// Get all post
router.get('/all', isAuth, async (req, res, next) => {
	try {
		const select = ['_id', 'fullname', 'email', 'img'];
		const posts = await Post.find().sort('-createdAt').populate({ path: 'creator', select }).populate({ path: 'comments', populate: { path: 'creator', select } }).populate({ path: 'likes', populate: { path: 'creator', select } });
		if (!posts) {
			next();
		}
		return res.json({
			success: 1,
			posts
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});

// Get all posts by user id
router.get('/user/:userId', isAuth, async (req, res, next) => {
	try {
		const userPosts = await Post.find({ creator: req.params.userId });
		if (!userPosts) {
			return res.status(404).json({ message: 'User post not found', success: 0 });
		}
		return res.json({ message: 'User post found', success: 1, posts: userPosts });
	} catch (err) {
		next(err);
	}
});

// Create post
router.post('/add', isAuth, upload.single('file'), async (req, res, next) => {
	try {
		const newPostObj = {
			content: req.body.content,
			type: "text",
			creator: req.user.id
		};
		if (req.file) {
			newPostObj.imgUrl = `${process.env.BASE_URL}/file/${req.file.filename}`;
		}
		const newPost = new Post(newPostObj);
		const appendPostToUser = await User.findById(req.user.id);
		appendPostToUser.posts.push(newPost);
		await appendPostToUser.save();
		await newPost.save();
		return res.status(201).json({
			message: "Posted",
			success: 1,
			post: {
				...newPost._doc,
				creator: {
					...req.user,
					iat: null,
					exp: null
				}
			}
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});


// Get post by id
router.get('/:id', isAuth, async (req, res, next) => {
	// Post.findById(req.params.id, (err, post) => {
	// 	if (err) {
	// 		next(err);
	// 	}
	// 	if (!post) {
	// 		res.status(404).json({
	// 			success: 0,
	// 			message: "Post not found."
	// 		})
	// 	}
	// 	return res.json({
	// 		success: 1,
	// 		post
	// 	});
	// });
	try {
		const post = await Post.findById(req.params.id).sort('-createdAt').populate({ path: 'creator', select: ['_id', 'fullname', 'email', 'img'] });
		if (!post) {
			next();
		}
		return res.json({
			success: 1,
			post
		});
	} catch (err) {
		next(err);
	}
});


// Update post
router.put('/:id', isAuth, (req, res, next) => {
	try {
		Post.findById(req.params.id, (err, post) => {
			if (err) {
				next(err)
			}
			if (post) {
				post.content = req.body.content;
				post.save();
				return res.json({
					success: 1,
					post
				});
			}
		});
	} catch (error) {
		console.log(error);
		next(error)
	}
});


// Delete post
router.delete('/:id', isAuth, (req, res, next) => {
	Post.findOneAndDelete({ _id: req.params.id }, (err, post) => {
		if (err) {
			next(err);
			return;
		}
		if (!post) {
			res.status(404).json({
				success: 0,
				message: "Post not found."
			})
		}
		return res.json({
			success: 1,
			message: "Post successfully deleted."
		});
	});
});


module.exports = router;