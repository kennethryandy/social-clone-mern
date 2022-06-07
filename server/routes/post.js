const isAuth = require('../middleware/isAuth');
const Post = require('../model/post');
const router = require('express').Router();


// Get all post
router.get('/', isAuth, async (req, res, next) => {
	try {
		const posts = await Post.find();
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
			post: newPost
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
});


// Get post by id
router.get('/:id', isAuth, async (req, res, next) => {
	Post.findById(req.params.id, (err, post) => {
		if (err) {
			next(err);
		}
		if (!post) {
			res.status(404).json({
				success: 0,
				message: "Post not found."
			})
		}
		return res.json({
			success: 1,
			post
		});
	});
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