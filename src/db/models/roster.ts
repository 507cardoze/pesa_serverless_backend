import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { ROSTER_STUBS } from '@db/stubs/roster';

export class Roster extends Model {
	public id: string;
	public teamId: string;
	public playerId: string;
	public roleId: string;
}

export async function initRoster(sequelize: Sequelize) {
	sequelize.define(
		'roster',
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
			roleId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
		},
		{
			tableName: 'rosters',
			modelName: 'Roster',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedRoster(DB: db) {
	const roster = await DB.roster.findAndCountAll();
	if (!roster.count) {
		const data = ROSTER_STUBS;
		return await DB.roster.bulkCreate(data, { returning: true });
	}
}
