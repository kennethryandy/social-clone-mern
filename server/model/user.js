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
	posts: [{ type: Schema.Types.ObjectId, ref: 'Post', required: true }],
	img: String,
	bio: String,
	website: String,
	location: String
});

module.exports = mongoose.model('User', userSchema);;