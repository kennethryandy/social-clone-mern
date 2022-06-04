const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const isAuth = require('../middleware/isAuth');
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


router.post('/login', async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (user) {
			const comparePw = await bcrypt.compare(password, user.password);
			if (comparePw) {
				const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, { expiresIn: '4h' });
				return res.json({
					message: "Logged in successfully",
					success: 1,
					token
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
		const token = jwt.sign({ userId: newUser._id }, process.env.TOKEN_SECRET, { expiresIn: '4h' });
		delete newUser.password;
		return res.status(201).json({
			message: "User created.",
			success: 1,
			token,
			user: newUser
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