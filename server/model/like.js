const mongoose = require('mongoose');
const Schema = mongoose.Schema

const likeSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	postId: {
		type: Schema.Types.ObjectId,
		ref: 'Post',
		required: true
	}
}, { timestamps: true }
);

module.exports = mongoose.model('Like', likeSchema);