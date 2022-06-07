const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const isAuth = require('../middleware/isAuth');
const upload = require('../middleware/upload');
// Get all user
router.get('/', isAuth, async (req, res, next) => {
	try {
		const users = await User.find();
		return res.json(users);
	} catch (error) {
		next(error)
	}
});

// Get user by id
router.get('/:id', async (req, res, next) => {
	try {
		const user = await User.findById(req.params.id);
		return res.json(user);
	} catch (error) {
		next(error);
	}
});

// Upload profile image
router.post('/profile', isAuth, upload.single("file"), async (req, res) => {
	if (req.file === undefined) return res.send("you must select a file.");
	const imgUrl = `http://localhost:5000/file/${req.file.filename}`;
	return res.send(imgUrl);
});


// Login a user
router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const comparePw = await bcrypt.compare(password, user.password);
			if (comparePw) {
				const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '4h' });
				const { _id: id, fullname, email, img } = user;
				return res.json({
					message: "Logged in successfully",
					success: 1,
					token,
					user: {
						id,
						fullname,
						email,
						img
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
		const newUser = new User({ fullname, email, password: hashedPw, img: 'no-man.jpg' });
		await newUser.save();
		const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '4h' });
		return res.status(201).json({
			message: "User created.",
			success: 1,
			token,
			user: {
				id: newUser._id,
				fullname: newUser.fullname,
				email: newUser.email,
				img: newUser.img
			}
		});
	} catch (error) {
		if (error.code === 11000) {
			return res.status(201).json({
				message: "Email already taken.",
				success: 0
			});
		}
		next(error);
	}
});



module.exports = router;