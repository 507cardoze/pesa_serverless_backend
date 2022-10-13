import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { METRIC_STUBS } from '@db/stubs/metric';

export class Metric extends Model {
	public id: string;
	public metricTypeId: string;
	public metricKeyId: string;
	public value: string;
	public gamePlayerId: string;
}

export async function initMetric(sequelize: Sequelize) {
	sequelize.define(
		'metric',
		{
			id: {
				type: new DataTypes.UUID(),
				primaryKey: true,
				allowNull: false,
				unique: true,
				defaultValue: DataTypes.UUIDV1,
			},
			metricTypeId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			metricKeyId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
			value: {
				type: new DataTypes.STRING(256),
				allowNull: false,
			},
			gamePlayerId: {
				type: new DataTypes.UUID(),
				allowNull: false,
			},
		},
		{
			tableName: 'metrics',
			modelName: 'Metric',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedMetric(DB: db) {
	const metric = await DB.metric.findAndCountAll();
	if (!metric.count) {
		const data = METRIC_STUBS;
		await DB.metric.bulkCreate(data);
	}
}
