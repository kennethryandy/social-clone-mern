const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
	url: process.env.DATABASE_URI,
	options: { useNewUrlParser: true, useUnifiedTopology: true },
	file: (req, file) => {
		const match = ["image/png", "image/jpeg"];

		if (match.indexOf(file.mimetype) === -1) {
			const filename = `${Date.now()}-${req.user.id}-${file.originalname}`;
			return filename;
		}

		return {
			bucketName: "photos",
			filename: `${Date.now()}-${req.user.id}-${file.originalname}`,
		};
	},
});

module.exports = multer({ storage });