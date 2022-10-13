import { db } from '@db/db';

export const videoGameHardwareAssociation = async (DB: db) => {
	await DB.videoGame.belongsToMany(DB.hardware, {
		through: DB.videoGameHardware,
		foreignKey: 'idVideoGame',
	});

	await DB.hardware.belongsToMany(DB.videoGame, {
		through: DB.videoGameHardware,
		foreignKey: 'idHardware',
	});
};
