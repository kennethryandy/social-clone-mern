import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


try {
	mongoose.connect('mongodb://localhost:27017');
	console.log('Database connected');
} catch (error) {
	console.log(error);
}


const port = process.env.PORT ? process.env.PORT : 5000;

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));