const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		min: 6,
		required: true
	}
});

module.exports = mongoose.model('User', userSchema);;