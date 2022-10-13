import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { GAMER_PLAYER_STUBS } from '@db/stubs/game-player';

export class GamePlayer extends Model {
	public id: string;
	public gameId: string;
	public playerId: string;
	public teamId: string;
}

export async function initGamePlayer(sequelize: Sequelize) {
	sequelize.define(
		'gamePlayer',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			gameId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			playerId: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
			teamId: {
				type: new DataTypes.UUID(),
				allowNull: true,
			},
		},
		{
			tableName: 'gamePlayers',
			modelName: 'GamePlayer',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedGamePlayer(DB: db) {
	const gamePlayer = await DB.gamePlayer.findAndCountAll();
	if (!gamePlayer.count) {
		const data = GAMER_PLAYER_STUBS;
		return await DB.gamePlayer.bulkCreate(data, { returning: true });
	}
}
