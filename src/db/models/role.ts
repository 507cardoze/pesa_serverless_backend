import { Model, DataTypes, Sequelize } from 'sequelize';
import { db } from '@db/db';
import { ROLE_STUBS } from '@db/stubs/role';

export class Role extends Model {
	public id: string;
	public name: string;
}

export async function initRole(sequelize: Sequelize) {
	sequelize.define(
		'role',
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
			tableName: 'roles',
			modelName: 'Role',
			paranoid: true,
			timestamps: true,
			freezeTableName: true,
		}
	);
}

export async function seedRole(DB: db) {
	const role = await DB.role.findAndCountAll();
	if (!role.count) {
		const data = ROLE_STUBS;
		await DB.role.bulkCreate(data);
	}
}
