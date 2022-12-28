import express from 'express';
import db, { feedDB, find2022 } from './mongodb';

const app = express();
const PORT = 8000;
const ENV = process.env.KITSU_ENV;

const root = ENV === 'dev' ? '/api' : '';

// Handling GET / Request
app.get(`${root}/`, (req, res) => {
	res.send('Welcome to typescript backend!');
});

// Server setup
app.listen(PORT, async () => {
	console.log('The application is listening on port http://localhost:' + PORT);

	feedDB(db);
	console.log(await find2022(db));
});
