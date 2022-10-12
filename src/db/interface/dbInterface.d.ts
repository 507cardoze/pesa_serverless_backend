import { Event } from '@db/models/event';
import { GameMode } from '@db/models/game-mode';
import { Hardware } from '@db/models/hardware';
import { Invitation } from '@db/models/invitation';
import { Player } from '@db/models/player';
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
}
