require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const Grid = require("gridfs-stream");
const { errorHandler, notFound } = require('./middleware/errorHandlers');
const user = require('./routes/user');
const post = require('./routes/post');
const comment = require('./routes/comment');
const like = require('./routes/like');
const notification = require('./routes/notification');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

try {
	mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.DATABASE_URI : process.env.DATABASE_URI_LOCAL);
	// { userNewUrlParse: true, useCreateIndex: true, useUnifiedTopology: true }
	console.log('Database connected');

} catch (error) {
	app.send("An error occured.");
	console.log(error);
}


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", function () {
	gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'photos' });
	gfs = Grid(conn.db, mongoose.mongo);
	gfs.collection('photos');
});


// User routes
app.use('/api/user', user);
// Post routes
app.use('/api/post', post);
// Comment routes
app.use('/api/comment', comment);
// Like routes
app.use('/api/like', like);
// Notifications routes
app.use('/api/notification', notification);


// media routes
app.get("/file/:filename", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.params.filename });
		console.log(file);
		if (!file) {
			return res.send('noimagefound');
		}
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.pipe(res);
		// const readStream = gfs.createReadStream(file.filename);
	} catch (error) {
		console.log(error);
		res.send("not found");
	}
});


// Error Handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4001;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));