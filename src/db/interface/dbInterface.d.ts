import { Event } from '@db/models/event';
import { Game } from '@db/models/game';
import { GameMode } from '@db/models/game-mode';
import { GamePlayer } from '@db/models/game-player';
import { Hardware } from '@db/models/hardware';
import { Inscription } from '@db/models/inscription';
import { Invitation } from '@db/models/invitation';
import { Metric } from '@db/models/metric';
import { MetricKey } from '@db/models/metric-key';
import { MetricType } from '@db/models/metric-type';
import { Player } from '@db/models/player';
import { Role } from '@db/models/role';
import { Roster } from '@db/models/roster';
import { Team } from '@db/models/team';
import { VideoGame } from '@db/models/video-game';
import { VideoGameHardware } from '@db/models/video-game-hardware';
import { Sequelize } from 'sequelize';

export interface dbInterface {
	// Sequelize ORM object
	sequelize: Sequelize;
	// Use this function to establish connection with DB
	authenticate: Function;
	// Use this function to create associations between tables
	associate: Function;
	// Use this function to prefill data into tables when empty
	seed: Function;
	// Use this function to close connection with DB
	close: Function;

	// Models for this project
	player: Player;
	team: Team;
	roster: Roster;
	invitation: Invitation;
	videoGame: VideoGame;
	hardware: Hardware;
	videoGameHardware: VideoGameHardware;
	gameMode: GameMode;
	event: Event;
	game: Game;
	metric: Metric;
	metricType: MetricType;
	metricKey: MetricKey;
	gamePlayer: GamePlayer;
	role: Role;
	inscription: Inscription;
}
