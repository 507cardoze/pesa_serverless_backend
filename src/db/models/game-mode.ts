import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { GAMEMODE_STUBS } from '@db/stubs/game-mode';

export class GameMode extends Model {
	public id: string;
	public name: string;
	public description: string;
}

export async function initGameMode(sequelize: Sequelize) {
	sequelize.define(
		'gameMode',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			name: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
			description: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
		},
		{
			tableName: 'gameModes',
			modelName: 'GameMode',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedGameMode(DB: db) {
	const gameMode = await DB.gameMode.findAndCountAll();
	if (!gameMode.count) {
		const data = GAMEMODE_STUBS;
		return await DB.gameMode.bulkCreate(data, { returning: true });
	}
}
