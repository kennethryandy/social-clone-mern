require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorHandlers');
const user = require('./routes/user');
const Grid = require("gridfs-stream");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


try {
	mongoose.connect(process.env.DATABASE_URI);
	// { userNewUrlParse: true, useCreateIndex: true, useUnifiedTopology: true }
	console.log('Database connected');

} catch (error) {
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


// media routes
app.get("/file/:filename", async (req, res) => {
	try {
		const file = await gfs.files.findOne({ filename: req.params.filename });
		// const readStream = gfs.createReadStream(file.filename);
		const readStream = gridfsBucket.openDownloadStream(file._id);
		readStream.pipe(res);
	} catch (error) {
		console.log(error);
		res.send("not found");
	}
});

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));