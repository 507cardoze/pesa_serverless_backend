import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { INVITATION_STUBS } from '@db/stubs/invitation';

export class Invitation extends Model {
	public id: string;
	public teamId: string;
	public playerId: string;
}

export async function initInvitation(sequelize: Sequelize) {
	sequelize.define(
		'invitation',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			teamId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			playerId: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
		},
		{
			tableName: 'invitations',
			modelName: 'Invitation',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedInvitation(DB: db) {
	const invitations = await DB.invitation.findAndCountAll();
	if (!invitations.count) {
		const data = INVITATION_STUBS;
		return await DB.invitation.bulkCreate(data, { returning: true });
	}
}
