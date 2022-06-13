const mongoose = require('mongoose');
const Schema = mongoose.Schema

const notificationsSchema = new Schema({
	recipient: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	read: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		required: true,
	},
	post: {
		type: Schema.Types.ObjectId,
		ref: "Post",
		required: true
	},
}, {
	timestamps: true
})

module.exports = mongoose.model('Notification', notificationsSchema)