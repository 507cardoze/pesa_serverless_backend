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
import { videoGameHardwareAssociation } from '@db/associate/video-game-hardware';
import { initGameMode, seedGameMode } from '@db/models/game-mode';
import { initEvent, seedEvent } from '@db/models/event';
import { eventAssociation } from './associate/event';
import { ConnectionManager } from 'sequelize/types/dialects/abstract/connection-manager';

export class db implements dbInterface {
	sequelize: Sequelize;
	player: any;
	team: any;
	roster: any;
	invitation: any;
	videoGame: any;
	hardware: any;
	videoGameHardware: any;
	gameMode: any;
	event: any;

	constructor() {
		this.sequelize = new Sequelize(
			process.env.PG_DB_NAME ?? '',
			process.env.PG_DB_USER ?? '',
			process.env.PG_DB_PASSWORD ?? '',
			{
				host: process.env.PG_DB_HOST ?? '',
				dialect: 'postgres',
				dialectModule: pg,
				logging: true,
				pool: {
					max: 2,
					min: 0,
					acquire: 3000,
					idle: 0,
					evict: 3000,
				},
			}
		);

		initPlayer(this.sequelize);
		initTeam(this.sequelize);
		initRoster(this.sequelize);
		initInvitation(this.sequelize);
		initVideoGame(this.sequelize);
		initHardware(this.sequelize);
		initVideoGameHardware(this.sequelize);
		initGameMode(this.sequelize);
		initEvent(this.sequelize);
		this.player = this.sequelize.models.player;
		this.team = this.sequelize.models.team;
		this.roster = this.sequelize.models.roster;
		this.invitation = this.sequelize.models.invitation;
		this.videoGame = this.sequelize.models.videoGame;
		this.hardware = this.sequelize.models.hardware;
		this.videoGameHardware = this.sequelize.models.videoGameHardware;
		this.gameMode = this.sequelize.models.gameMode;
		this.event = this.sequelize.models.event;
	}

	async associate() {
		await rosterAssociation(this);
		await invitationAssociation(this);
		await videoGameHardwareAssociation(this);
		await eventAssociation(this);
	}

	async seed() {
		await seedPlayer(this);
		await seedTeam(this);
		await seedRoster(this);
		await seedInvitation(this);
		await seedVideoGame(this);
		await seedHardware(this);
		await seedVideoGameHardware(this);
		await seedGameMode(this);
		await seedEvent(this);
	}

	async authenticate() {
		try {
			//Create associations
			await this.associate();

			//Sync DB
			try {
				const sequelize = await this.sequelize.sync();
				console.log('Database & tables created!');
				return sequelize;
			} catch (error) {
				console.error(`DB Sequelize Connection Failed: ${error}`);
				return error;
			}
		} catch (error) {
			console.error('Unable to connect to the database:', error);
		}
	}

	async close() {
		await this.sequelize.close();
	}

	initPools() {
		this.sequelize.connectionManager.initPools();
	}
}

export const getDBInstance = async () => {
	const DB = new db();
	await DB.authenticate();
	//await DB.seed();
	return DB;
};