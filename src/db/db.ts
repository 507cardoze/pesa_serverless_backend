import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import { dbInterface } from '@db/interface/dbInterface';
import { initPlayer, seedPlayer } from '@db/models/player';

export class db implements dbInterface {
	sequelize: Sequelize;
	player: any;

	constructor() {
		this.sequelize = new Sequelize(
			process.env.PG_DB_NAME ?? '',
			process.env.PG_DB_USER ?? '',
			process.env.PG_DB_PASSWORD ?? '',
			{
				host: process.env.PG_DB_HOST ?? '',
				dialect: 'postgres',
				dialectModule: pg,
				logging: false,
			}
		);

		initPlayer(this.sequelize);
		this.player = this.sequelize.models.Player;
	}

	async associate() {
		// // Book has many authors (1 to n)
		// this.book.belongsToMany(this.author, { through: 'book_author' });
		// // Book has 1 publisher (1 to 1)
		// this.book.belongsTo(this.publisher, { foreignKey: 'publisher_id' });
		// // Author has many books (1 to n)
		// this.author.belongsToMany(this.book, { through: 'book_author' });
		// // Publisher has many books (1 to n)
		// this.publisher.hasMany(this.book, { foreignKey: 'publisher_id' });
	}

	async seed() {
		await seedPlayer(this);
	}

	async authenticate() {
		try {
			//Create associations
			//await this.associate();

			//Sync DB
			await this.sequelize
				.sync({ force: false })
				.then(() => console.log('DB Connection established successfully.'))
				.catch((err) =>
					console.error(`DB Sequelize Connection Failed: ${err}`)
				);
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}
}

export const getDBInstance = async () => {
	const DB = new db();
	await DB.authenticate();
	await DB.seed();
	return DB;
};
