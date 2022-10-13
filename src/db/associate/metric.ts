import { db } from '@db/db';

export const metricAssociation = async (DB: db) => {
	await DB.metricKey.hasMany(DB.metric, {
		foreignKey: 'metricKeyId',
	});

	await DB.metric.belongsTo(DB.metricKey, {
		foreignKey: 'metricKeyId',
	});

	await DB.metricType.hasMany(DB.metric, {
		foreignKey: 'metricTypeId',
	});

	await DB.metric.belongsTo(DB.metricType, {
		foreignKey: 'metricTypeId',
	});


	await DB.gamePlayer.hasMany(DB.metric, {
		foreignKey: 'gamePlayerId',
	});

	await DB.metric.belongsTo(DB.gamePlayer, {
		foreignKey: 'gamePlayerId',
	});
};
