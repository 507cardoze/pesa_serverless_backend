import { db } from '@db/db';

export const rosterAssociation = async (DB: db) => {
	await DB.player.belongsToMany(DB.team, {
		through: DB.roster,
		foreignKey: 'playerId',
	});

	await DB.team.belongsToMany(DB.player, {
		through: DB.roster,
		foreignKey: 'teamId',
	});
};
