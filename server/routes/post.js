const isAuth = require('../middleware/isAuth');
const Comment = require('../model/comment');
const Post = require('../model/post');
const router = require('express').Router();


// Get all post
router.get('/all', isAuth, async (req, res, next) => {
	try {
		const select = ['_id', 'fullname', 'email', 'img'];
		const posts = await Post.find().sort('-createdAt').populate({ path: 'creator', select }).populate({ path: 'comments', populate: { path: 'creator', select } });
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

// Create post
router.post('/add', isAuth, async (req, res, next) => {
	try {
		const newPost = new Post({
			content: req.body.content,
			type: "text",
			creator: req.user.id
		});
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