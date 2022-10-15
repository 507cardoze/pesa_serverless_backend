import { db } from '@db/db';

export const eventAssociation = async (DB: db) => {
	await DB.event.belongsTo(DB.gameMode, {
		foreignKey: 'gameModeId',
	});

	await DB.event.belongsTo(DB.videoGame, {
		foreignKey: 'videoGameId',
	});

	await DB.player.belongsToMany(DB.team, {
		through: DB.inscription,
		foreignKey: 'playerId',
	});

	await DB.team.belongsToMany(DB.player, {
		through: DB.inscription,
		foreignKey: 'teamId',
	});

	await DB.event.belongsToMany(DB.team, {
		through: DB.inscription,
		foreignKey: 'eventId',
		as: 'teamsInscriptions',
	});

	await DB.team.belongsToMany(DB.event, {
		through: DB.inscription,
		foreignKey: 'teamId',
		as: 'teamsInscriptions',
	});

	await DB.event.belongsToMany(DB.player, {
		through: DB.inscription,
		foreignKey: 'eventId',
		as: 'playersInscriptions',
	});

	await DB.player.belongsToMany(DB.event, {
		through: DB.inscription,
		foreignKey: 'playerId',
		as: 'playersInscriptions',
	});
	
};
