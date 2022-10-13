import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { METRIC_KEY_STUBS } from '@db/stubs/metric-key';

export class MetricKey extends Model {
	public id: string;
	public name: string;
}

export async function initMetricKey(sequelize: Sequelize) {
	sequelize.define(
		'metricKey',
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
		},
		{
			tableName: 'metricKeys',
			modelName: 'MetricKey',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedMetricKey(DB: db) {
	const metricKey = await DB.metricKey.findAndCountAll();
	if (!metricKey.count) {
		const data: Array<Pick<MetricKey, 'id' | 'name'>> = METRIC_KEY_STUBS;
		await DB.metricKey.bulkCreate(data);
	}
}
