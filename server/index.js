require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { errorHandler, notFound } = require('./middleware/errorHandlers');
const user = require('./routes/user');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


try {
	mongoose.connect(process.env.DATABASE_URI);
	// { userNewUrlParse: true, useCreateIndex: true, useUnifiedTopology: true }
	console.log('Database connected');

	// User routes
	app.use('/api/user', user);

	// Error Handlers
	app.use(notFound);
	app.use(errorHandler);

	const port = process.env.PORT ? process.env.PORT : 5000;

	app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

} catch (error) {
	console.log(error);
}