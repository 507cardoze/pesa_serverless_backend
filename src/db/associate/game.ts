import { db } from '@db/db';

export const gameAssociation = async (DB: db) => {
	await DB.event.hasMany(DB.game, {
		foreignKey: 'eventId',
	});

	await DB.game.belongsTo(DB.event, {
		foreignKey: 'eventId',
	});
};
