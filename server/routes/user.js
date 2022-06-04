const router = require('express').Router();
const User = require('../model/user');

// Get all user
router.get('/', async (req, res, next) => {
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

module.exports = router;