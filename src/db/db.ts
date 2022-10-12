import * as pg from 'pg';
import { Sequelize } from 'sequelize';
import { dbInterface } from '@db/interface/dbInterface';
import { initPlayer, seedPlayer } from '@db/models/player';
import { initTeam, seedTeam } from '@db/models/team';
import { initRoster, seedRoster } from '@db/models/roster';
import { initInvitation, seedInvitation } from '@db/models/invitation';
import { initVideoGame, seedVideoGame } from '@db/models/video-game';
import { initHardware, seedHardware } from '@db/models/hardware';
import {
	initVideoGameHardware,
	seedVideoGameHardware,
} from '@db/models/video-game-hardware';
import { rosterAssociation } from '@db/associate/roster';
import { invitationAssociation } from '@db/associate/invitation';
import { videoGameHardwareAssociation } from '@db/associate/videogame-hardware';

export class db implements dbInterface {
	sequelize: Sequelize;
	player: any;
	team: any;
	roster: any;
	invitation: any;
	videoGame: any;
	hardware: any;
	videoGameHardware: any;

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
		initVideoGame(this.sequelize);
		initHardware(this.sequelize);
		initVideoGameHardware(this.sequelize);
		this.player = this.sequelize.models.player;
		this.team = this.sequelize.models.team;
		this.roster = this.sequelize.models.roster;
		this.invitation = this.sequelize.models.invitation;
		this.videoGame = this.sequelize.models.videoGame;
		this.hardware = this.sequelize.models.hardware;
		this.videoGameHardware = this.sequelize.models.videoGameHardware;
	}

	async associate() {
		await rosterAssociation(this);
		await invitationAssociation(this);
		await videoGameHardwareAssociation(this);
	}

	async seed() {
		await seedPlayer(this);
		await seedTeam(this);
		await seedRoster(this);
		await seedInvitation(this);
		await seedVideoGame(this);
		await seedHardware(this);
		await seedVideoGameHardware(this);
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
