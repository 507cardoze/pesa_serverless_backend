import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { GAME_STUB } from '@db/stubs/game';

export class Game extends Model {
	public id: string;
	public gameNum: number;
	public eventId: string;
}

export async function initGame(sequelize: Sequelize) {
	sequelize.define(
		'game',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			gameNum: {
				type: new DataTypes.INTEGER(),
				allowNull: false,
			},
			eventId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
		},
		{
			tableName: 'games',
			modelName: 'Game',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedGame(DB: db) {
	const game = await DB.game.findAndCountAll();
	if (!game.count) {
		const data: Array<Pick<Game, 'id' | 'gameNum' | 'eventId'>> = GAME_STUB;
		return await DB.game.bulkCreate(data, { returning: true });
	}
}
