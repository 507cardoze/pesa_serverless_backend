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
import { initGame, seedGame } from '@db/models/game';
import { initMetric, seedMetric } from '@db/models/metric';
import { initMetricType, seedMetricType } from '@db/models/metric-type';
import { initMetricKey, seedMetricKey } from '@db/models/metric-key';
import { gameAssociation } from '@db/associate/game';
import { metricAssociation } from '@db/associate/metric';
import { initGamePlayer, seedGamePlayer } from '@db/models/game-player';
import { initRole, seedRole } from '@db/models/role';

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
	game: any;
	metric: any;
	metricType: any;
	metricKey: any;
	gamePlayer: any;
	role: any;

	constructor() {
		this.sequelize = new Sequelize(
			process.env.PG_DB_NAME ?? '',
			process.env.PG_DB_USER ?? '',
			process.env.PG_DB_PASSWORD ?? '',
			{
				host: process.env.PG_DB_HOST ?? '',
				dialect: 'postgres',
				dialectModule: pg,
				logging: console.log,
				pool: {
					max: 2,
					min: 0,
					acquire: 3000,
					idle: 0,
					evict: 900,
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
		initGame(this.sequelize);
		initMetric(this.sequelize);
		initMetricType(this.sequelize);
		initMetricKey(this.sequelize);
		initGamePlayer(this.sequelize);
		initRole(this.sequelize);
		this.player = this.sequelize.models.player;
		this.team = this.sequelize.models.team;
		this.role = this.sequelize.models.role;
		this.roster = this.sequelize.models.roster;
		this.invitation = this.sequelize.models.invitation;
		this.videoGame = this.sequelize.models.videoGame;
		this.hardware = this.sequelize.models.hardware;
		this.videoGameHardware = this.sequelize.models.videoGameHardware;
		this.gameMode = this.sequelize.models.gameMode;
		this.event = this.sequelize.models.event;
		this.game = this.sequelize.models.game;
		this.gamePlayer = this.sequelize.models.gamePlayer;
		this.metricType = this.sequelize.models.metricType;
		this.metricKey = this.sequelize.models.metricKey;
		this.metric = this.sequelize.models.metric;
	}

	async associate() {
		await rosterAssociation(this);
		await invitationAssociation(this);
		await videoGameHardwareAssociation(this);
		await eventAssociation(this);
		await gameAssociation(this);
		await metricAssociation(this);
	}

	async seed() {
		await seedPlayer(this);
		await seedTeam(this);
		await seedRole(this);
		await seedRoster(this);
		await seedInvitation(this);
		await seedVideoGame(this);
		await seedHardware(this);
		await seedVideoGameHardware(this);
		await seedGameMode(this);
		await seedEvent(this);
		await seedGame(this);
		await seedGamePlayer(this);
		await seedMetricType(this);
		await seedMetricKey(this);
		await seedMetric(this);
	}

	async authenticate() {
		try {
			//Create associations
			await this.associate();

			//Sync DB
			try {
				await this.sequelize.sync({ force: true });
				console.log('Database & tables created!');
			} catch (error) {
				console.error(`DB Sequelize Connection Failed: ${error}`);
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
	await DB.seed();
	return DB;
};