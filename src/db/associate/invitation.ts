import { db } from '@db/db';

export const invitationAssociation = async (DB: db) => {
	await DB.player.belongsToMany(DB.team, {
		through: DB.invitation,
		foreignKey: 'playerId',
	});

	await DB.player.hasMany(DB.invitation, {
		foreignKey: 'playerId',
	});

	await DB.invitation.belongsTo(DB.player, {
		foreignKey: 'playerId',
	});

	await DB.team.belongsToMany(DB.player, {
		through: DB.invitation,
		foreignKey: 'teamId',
	});

	await DB.team.hasMany(DB.invitation, {
		foreignKey: 'teamId',
	});

	await DB.invitation.belongsTo(DB.team, {
		foreignKey: 'teamId',
	});
};
