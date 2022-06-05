const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {

	if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))) {
		res.status(403).send('Unauthorized');
		return;
	}

	let idToken;
	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
		// Read the ID Token from the Authorization header.
		idToken = req.headers.authorization.split('Bearer ')[1];
	} else {
		res.status(403).send('Unauthorized');
		return;
	}

	return jwt.verify(idToken, process.env.TOKEN_SECRET, (err, user) => {
		if (err) {
			// console.log(err);
			return res.status(403).send("Unauthorized");
		}
		// console.log(user);
		req.user = user;
		next();
		return;
	});

};
