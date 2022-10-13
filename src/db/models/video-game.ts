import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { VIDEO_GAME_STUBS } from '@db/stubs/video-game';

export class VideoGame extends Model {
	public id: string;
	public displayName: string;
}

export async function initVideoGame(sequelize: Sequelize) {
	sequelize.define(
		'videoGame',
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
		},
		{
			tableName: 'videoGames',
			modelName: 'VideoGame',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedVideoGame(DB: db) {
	const videoGames = await DB.videoGame.findAndCountAll();
	if (!videoGames.count) {
		const data = VIDEO_GAME_STUBS;
		return await DB.videoGame.bulkCreate(data, { returning: true });
	}
}
