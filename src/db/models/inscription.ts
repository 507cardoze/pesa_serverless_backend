import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { INSCRIPTION_STUBS } from '@db/stubs/inscription';

export class Inscription extends Model {
	public id: string;
	public eventId: string;
	public teamId: string;
	public playerId: string;
}

export async function initInscription(sequelize: Sequelize) {
	sequelize.define(
		'inscription',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			eventId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			teamId: {
				type: new DataTypes.UUID(),
				allowNull: true,
			},
			playerId: {
				type: new DataTypes.STRING(),
				allowNull: true,
			},
		},
		{
			tableName: 'inscriptions',
			modelName: 'Inscription',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedInscription(DB: db) {
	const inscription = await DB.inscription.findAndCountAll();
	if (!inscription.count) {
		const data = INSCRIPTION_STUBS;
		return await DB.inscription.bulkCreate(data, { returning: true });
	}
}
