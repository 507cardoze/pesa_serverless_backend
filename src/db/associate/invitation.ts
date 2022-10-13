import { db } from '@db/db';

export const invitationAssociation = async (DB: db) => {

	await DB.player.hasMany(DB.invitation, {
		foreignKey: 'playerId',
	});

	await DB.invitation.belongsTo(DB.player, {
		foreignKey: 'playerId',
	});

	await DB.team.hasMany(DB.invitation, {
		foreignKey: 'teamId',
	});

	await DB.invitation.belongsTo(DB.team, {
		foreignKey: 'teamId',
	});
};
