import { db } from '@db/db';

export const gameAssociation = async (DB: db) => {
	await DB.event.hasMany(DB.game, {
		foreignKey: 'eventId',
	});

	await DB.game.belongsTo(DB.event, {
		foreignKey: 'eventId',
	});


	await DB.game.hasMany(DB.gamePlayer, {
		foreignKey: 'gameId',
	});

	await DB.gamePlayer.belongsTo(DB.game, {
		foreignKey: 'gameId',
	});

	await DB.team.hasMany(DB.gamePlayer, {
		foreignKey: 'teamId',
	});

	await DB.gamePlayer.belongsTo(DB.team, {
		foreignKey: 'teamId',
	});

	await DB.player.hasMany(DB.gamePlayer, {
		foreignKey: 'playerId',
	});

	await DB.gamePlayer.belongsTo(DB.player, {
		foreignKey: 'playerId',
	});
};
