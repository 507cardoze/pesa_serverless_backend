import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { EVENT_STUBS } from '@db/stubs/event';

export class Event extends Model {
	public id: string;
	public name: string;
	public description: string;
	public inscripInitDate: Date;
	public inscripEndDate: Date;
	public isCoaching: boolean;
	public isLive: boolean;
	public bannerUrl: string;
	public videoGameId: string;
	public gameModeId: string;
}

export async function initEvent(sequelize: Sequelize) {
	sequelize.define(
		'event',
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
			inscripInitDate: {
				type: new DataTypes.DATE(),
				allowNull: false,
			},
			inscripEndDate: {
				type: new DataTypes.DATE(),
				allowNull: false,
			},
			isCoaching: {
				type: new DataTypes.BOOLEAN(),
				allowNull: false,
			},
			isLive: {
				type: new DataTypes.BOOLEAN(),
				allowNull: false,
			},
			bannerUrl: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
			videoGameId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			gameModeId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
		},
		{
			tableName: 'events',
			modelName: 'Event',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedEvent(DB: db) {
	const event = await DB.event.findAndCountAll();
	if (!event.count) {
		const data: Array<
			Pick<
				Event,
				| 'id'
				| 'name'
				| 'description'
				| 'inscripInitDate'
				| 'inscripEndDate'
				| 'isCoaching'
				| 'isLive'
				| 'bannerUrl'
				| 'videoGameId'
				| 'gameModeId'
			>
		> = EVENT_STUBS;
		return await DB.event.bulkCreate(data, { returning: true });
	}
}
