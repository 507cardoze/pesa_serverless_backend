import { db } from '@db/db';

export const eventAssociation = async (DB: db) => {
	await DB.gameMode.hasMany(DB.event, {
		foreignKey: 'gameModeId',
	});

	await DB.event.belongsTo(DB.gameMode, {
		foreignKey: 'gameModeId',
	});

	await DB.videoGame.hasMany(DB.event, {
		foreignKey: 'videoGameId',
	});

	await DB.event.belongsTo(DB.videoGame, {
		foreignKey: 'videoGameId',
	});
};
