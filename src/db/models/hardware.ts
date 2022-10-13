import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { HARDWARE_STUBS } from '@db/stubs/hardware';

export class Hardware extends Model {
	public id: string;
	public displayName: string;
}

export async function initHardware(sequelize: Sequelize) {
	sequelize.define(
		'hardware',
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
			tableName: 'hardware',
			modelName: 'Hardware',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedHardware(DB: db) {
	const hardware = await DB.hardware.findAndCountAll();
	if (!hardware.count) {
		const data = HARDWARE_STUBS;
		return await DB.hardware.bulkCreate(data, { returning: true });
	}
}
