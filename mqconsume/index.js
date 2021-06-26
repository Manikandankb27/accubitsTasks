import express from 'express';
import { mongoURI } from './Config/config';
import mongoose from 'mongoose';
import user from './Controllers/user';
const app = express();

const port = 3001;

const mongoOptions = {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
};

mongoose.connect(mongoURI, mongoOptions).then(
	response => {
		console.log('MongoDB connected');
	},
	err => {
		console.log(err);
	}
);

app.get('/', (req, res) => {
return res.end('Api Working');
});

app.listen(port, () => {
	console.log(`app running in port ${port} `);
});