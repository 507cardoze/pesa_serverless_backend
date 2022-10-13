import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { TEAM_STUBS } from '@db/stubs/team';

export class Team extends Model {
	public id: string;
	public displayName: string;
	public logoUrl: string;
}

export async function initTeam(sequelize: Sequelize) {
	sequelize.define(
		'team',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			displayName: {
				type: new DataTypes.STRING(256),
				allowNull: false,
				unique: true,
			},
			logoUrl: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
		},
		{
			tableName: 'teams',
			modelName: 'Team',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedTeam(DB: db) {
	const teams = await DB.team.findAndCountAll();
	if (!teams.count) {
		const data = TEAM_STUBS;
		return await DB.team.bulkCreate(data, { returning: true });
	}
}
