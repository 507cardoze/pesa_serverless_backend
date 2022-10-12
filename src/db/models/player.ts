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
}

export async function initPlayer(sequelize: Sequelize) {
	sequelize.define(
		'Player',
		{
			uid: {
				type: new DataTypes.STRING(256),
				primaryKey: true,
				allowNull: false,
				unique: true,
			},
			email: {
				type: new DataTypes.STRING(256),
				allowNull: false,
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
		const data: Array<
			Pick<
				Player,
				'uid' | 'email' | 'displayName' | 'photoURL' | 'phoneNumber' | 'isAdmin'
			>
		> = PLAYER_STUB;
		return await DB.player.bulkCreate(data, { returning: true });
	}
}
