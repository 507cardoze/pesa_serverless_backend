import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { PLAYER_STUB } from '@db/stubs/player';

export class Player extends Model {
	public uid: string;
	public email: string;
	public displayName: string;
	public photoURL?: string | null;
	public phoneNumber?: string | null;
	public isAdmin: boolean;
	public nationality: string | null;
	public nationalityPrefix: string | null;
}

export async function initPlayer(sequelize: Sequelize) {
	sequelize.define(
		'player',
		{
			uid: {
				type: new DataTypes.STRING(256),
				primaryKey: true,
				unique: true,
				allowNull: false,
			},
			email: {
				type: new DataTypes.STRING(256),
				allowNull: false,
				unique: true,
			},
			displayName: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
			photoURL: {
				type: new DataTypes.STRING(256),
				allowNull: true,
				defaultValue: null,
			},
			phoneNumber: {
				type: new DataTypes.STRING(256),
				allowNull: true,
				defaultValue: null,
			},
			isAdmin: {
				type: new DataTypes.BOOLEAN(),
				allowNull: false,
				defaultValue: false,
			},
			nationality: {
				type: new DataTypes.STRING(256),
				allowNull: true,
				defaultValue: null,
			},
			nationalityPrefix: {
				type: new DataTypes.STRING(256),
				allowNull: true,
				defaultValue: null,
			},
		},
		{
			tableName: 'players',
			modelName: 'Player',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedPlayer(DB: db) {
	const players = await DB.player.findAndCountAll();
	if (!players.count) {
		const data = PLAYER_STUB;
		return await DB.player.bulkCreate(data, { returning: true });
	}
}
