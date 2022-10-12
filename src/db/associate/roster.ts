import { db } from '@db/db';

export const rosterAssociation = async (DB: db) => {
	await DB.player.belongsToMany(DB.team, {
		through: DB.roster,
		foreignKey: 'playerId',
	});

	await DB.player.hasMany(DB.roster, {
		foreignKey: 'playerId',
	});

	await DB.roster.belongsTo(DB.player, {
		foreignKey: 'playerId',
	});
};
