import { readFileSync } from 'fs';
import { Db, MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017/';

const client = new MongoClient(uri);

const db = client.db('kitsu-awards-voting-dev');

export const feedDB = (db: Db) => {
	const file = readFileSync('./categories.json', 'utf8');
	const years: CategoriesJSON[] = JSON.parse(file);

	const dbYears = db.collection('years');

	dbYears.deleteMany({});
	dbYears.insertMany(years);
};

export const find2022 = async (db: Db) => {
	const dbYears = db.collection<CategoriesJSON>('years');

	return dbYears.findOne({ year: 2022 });
};

export default db;
