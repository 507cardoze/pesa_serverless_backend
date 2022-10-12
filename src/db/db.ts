import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import { dbInterface } from '@db/interface/dbInterface';
import { initPlayer, seedPlayer } from '@db/models/player';
import { initTeam, seedTeam } from '@db/models/team';
import { initRoster, seedRoster } from '@db/models/roster';
import { initInvitation, seedInvitation } from '@db/models/invitation';

export class db implements dbInterface {
	sequelize: Sequelize;
	player: any;
	team: any;
	roster: any;
	invitation: any;

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
		initTeam(this.sequelize);
		initRoster(this.sequelize);
		initInvitation(this.sequelize);
		this.player = this.sequelize.models.player;
		this.team = this.sequelize.models.team;
		this.roster = this.sequelize.models.roster;
		this.invitation = this.sequelize.models.invitation;
	}

	async associate() {
		await this.player.belongsToMany(this.team, {
			through: this.roster,
			foreignKey: 'playerId',
		});
		await this.team.belongsToMany(this.player, {
			through: this.roster,
			foreignKey: 'teamId',
		});
		await this.roster.belongsTo(this.player, {
			foreignKey: 'playerId',
		});
		await this.roster.belongsTo(this.team, {
			foreignKey: 'teamId',
		});

		await this.player.belongsToMany(this.team, {
			through: this.invitation,
			foreignKey: 'playerId',
		});
		await this.team.belongsToMany(this.player, {
			through: this.invitation,
			foreignKey: 'teamId',
		});

		await this.invitation.belongsTo(this.player, {
			foreignKey: 'playerId',
		});

		await this.invitation.belongsTo(this.team, {
			foreignKey: 'teamId',
		});
	}

	async seed() {
		await seedPlayer(this);
		await seedTeam(this);
		await seedRoster(this);
		await seedInvitation(this);
	}

	async authenticate() {
		try {
			//Create associations
			await this.associate();

			//Sync DB
			await this.sequelize
				.sync({ alter: true })
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
