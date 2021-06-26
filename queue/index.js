import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import userRoute from './Routes/userRoute';
import { mongoURI } from './Config/config';
const app = express();

const port = 3000;

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


app.use(cors());
//allow-cors
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
	res.header('access-control-expose-headers', 'x-total-count');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

	//console.log(req.method + req.originalUrl);
	if (req.method === 'OPTIONS') {
		res.sendStatus(200);
	} else {
		next();
	}
});
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json({ extended: true }));

app.use(express.static('public'));

// Implement Router
app.use(morgan('combined'));
app.use('/api', userRoute);

app.get('/', (req, res) => {
return res.end('Api Working');
});

app.listen(port, () => {
	console.log(`app running in port ${port} `);
});