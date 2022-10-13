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

	await DB.role.belongsToMany(DB.team, {
		through: DB.roster,
		foreignKey: 'roleId',
	});

	await DB.team.belongsToMany(DB.role, {
		through: DB.roster,
		foreignKey: 'teamId',
	});

	await DB.role.belongsToMany(DB.player, {
		through: DB.roster,
		foreignKey: 'roleId',
	});

	await DB.player.belongsToMany(DB.role, {
		through: DB.roster,
		foreignKey: 'playerId',
	});
};
