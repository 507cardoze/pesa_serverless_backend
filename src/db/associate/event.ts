import { db } from '@db/db';

export const eventAssociation = async (DB: db) => {
	await DB.event.belongsTo(DB.gameMode, {
		foreignKey: 'gameModeId',
	});

	await DB.event.belongsTo(DB.videoGame, {
		foreignKey: 'videoGameId',
	});
};
