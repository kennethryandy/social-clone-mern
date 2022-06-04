const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	fullname: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		min: 6,
		required: true
	},
	img: String
});

module.exports = mongoose.model('User', userSchema);;