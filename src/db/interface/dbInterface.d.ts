import { Player } from '@db/models/player';
import { Roster } from '@db/models/roster';
import { Team } from '@db/models/team';
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
}
