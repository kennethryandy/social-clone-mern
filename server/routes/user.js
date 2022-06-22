// const mongoose = require('mongoose');
// const Grid = require("gridfs-stream");
const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/upload');
const { reduceUserDetails } = require('../utils/validators');

// let gfs;
// const conn = mongoose.connection;
// conn.once("open", function () {
// 	gfs = Grid(conn.db, mongoose.mongo);
// 	gfs.collection('photos');
// });

// Get all user
router.get('/all', isAuth, async (req, res, next) => {
	try {
		const users = await User.find();
		return res.json({
			success: 1,
			users
		});
	} catch (error) {
		next(error)
	}
});

// Get user by id
router.get('/:id', async (req, res, next) => {
	try {
		const creatorKeys = ['_id', 'fullname', 'email', 'img'];
		const photos = await gfs.files.find();
		console.log(photos);
		const user = await User.findById(req.params.id).populate({
			path: 'posts',
			populate: [
				{
					path: 'creator',
					select: creatorKeys
				},
				{
					path: 'comments likes',
					populate: {
						path: 'creator',
						select: creatorKeys
					}
				}
			],
			options: { sort: '-createdAt' }
		});
		return res.json({
			success: 1,
			user
		});
	} catch (error) {
		next(error);
	}
});

// Upload profile image
router.post('/profile', isAuth, upload.single("file"), async (req, res) => {
	if (req.file === undefined) {
		return res.status(405).json({
			success: 0,
			message: "you must select a file."
		});
	};
	const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
	await User.findByIdAndUpdate(req.user.id, { img: imgUrl });
	// await gfs.files.deleteOne({ filename: user.img });
	return res.status(201).json({
		success: 1,
		imgUrl
	});
});


// Login a user
router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const comparePw = await bcrypt.compare(password, user.password);
			if (comparePw) {
				const { _id: id, fullname, email, img, bio, website, location } = user;
				const token = jwt.sign({
					id,
					fullname,
					email,
					img
				}, process.env.TOKEN_SECRET, { expiresIn: '4h' });
				return res.json({
					message: "Logged in successfully",
					success: 1,
					token,
					user: {
						id,
						fullname,
						email,
						img,
						bio,
						website,
						location
					}
				});
			}
		}
		return res.json({
			message: "Invalid email or password",
			success: 0
		});
	} catch (error) {
		next(error);
	}
});

// Register a user
router.post('/register', async (req, res, next) => {
	const { fullname, email, password } = req.body;
	const hashedPw = await bcrypt.hash(password, 12);
	try {
		const newUser = new User({ fullname, email, password: hashedPw });
		await newUser.save();
		const token = jwt.sign({
			id: newUser._id,
			fullname: newUser.fullname,
			email: newUser.email,
		}, process.env.TOKEN_SECRET, { expiresIn: '4h' });
		return res.status(201).json({
			message: "User created.",
			success: 1,
			token,
			user: {
				id: newUser._id,
				fullname: newUser.fullname,
				email: newUser.email
			}
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(500).json({
				message: "Email already taken.",
				type: "email",
				success: 0
			});
		}
		next(error);
	}
});


// update user bio
router.put('/details', isAuth, async (req, res, next) => {
	try {
		const userDetails = reduceUserDetails(req.body);
		await User.findOneAndUpdate({ _id: req.user.id }, userDetails).orFail(new Error('No docs found!'));
		res.json({
			success: 1,
			userDetails
		});
	} catch (err) {
		next(err);
	}
});


module.exports = router;