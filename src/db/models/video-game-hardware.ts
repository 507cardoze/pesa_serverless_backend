import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { VIDEO_GAME_HARDWARE_STUBS } from '@db/stubs/vide-game-hardware';

export class VideoGameHardware extends Model {
	public id: string;
	public idVideoGame: string;
	public idHardware: string;
}

export async function initVideoGameHardware(sequelize: Sequelize) {
	sequelize.define(
		'videoGameHardware',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			idVideoGame: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			idHardware: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
		},
		{
			tableName: 'videoGameHardwares',
			modelName: 'VideoGameHardware',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedVideoGameHardware(DB: db) {
	const videoGameHardwares = await DB.videoGameHardware.findAndCountAll();
	if (!videoGameHardwares.count) {
		const data = VIDEO_GAME_HARDWARE_STUBS;
		return await DB.videoGameHardware.bulkCreate(data, { returning: true });
	}
}
