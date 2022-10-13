import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { METRIC_TYPE_STUBS } from '@db/stubs/metric-type';

export class MetricType extends Model {
	public id: string;
	public name: string;
}

export async function initMetricType(sequelize: Sequelize) {
	sequelize.define(
		'metricType',
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
			tableName: 'metricTypes',
			modelName: 'MetricType',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedMetricType(DB: db) {
	const metricType = await DB.metricType.findAndCountAll();
	if (!metricType.count) {
		const data: Array<Pick<MetricType, 'id' | 'name'>> = METRIC_TYPE_STUBS;
		await DB.metricType.bulkCreate(data);
	}
}
