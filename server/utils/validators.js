
const isEmail = (email) => {
	const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (email.match(regEx)) return true;

	return false;
};

const isEmpty = (string) => {
	if (string.trim() === '') return true;

	return false;
};

const reduceUserDetails = (data) => {
	let userDetails = {};

	if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
	if (!isEmpty(data.website.trim())) {
		// https://website.com
		if (data.website.trim().substring(0, 4) !== 'http') {
			userDetails.website = `http://${data.website.trim()}`;
		} else {
			userDetails.website = data.website;
		}

		if (userDetails.website.trim().substring(userDetails.website.trim().length, userDetails.website.trim().length - 4) !== ".com") {
			userDetails.website += ".com";
		}

	}
	if (!isEmpty(data.location.trim())) {
		userDetails.location = data.location.charAt(0).toUpperCase() + data.location.slice(1);
	}

	return userDetails;
};


module.exports = { reduceUserDetails };