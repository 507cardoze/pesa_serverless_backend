import { db, getDBInstance } from '@db/db';
import { formatJSONResponse, internalServerError } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

let DB: any;

const me: APIGatewayProxyHandler = async (event) => {
	if (!DB) {
		DB = await getDBInstance();
	} else {
		DB.sequelize.connectionManager.initPools();
		if (DB.sequelize.connectionManager.hasOwnProperty('getConnection')) {
			delete DB.sequelize.connectionManager.getConnection;
		}
	}

	if (!event.requestContext.authorizer)
		throw new Error('Authorizer is not present');

	try {
		switch (event.httpMethod) {
			case 'GET':
				const uid: string = event.requestContext.authorizer.principalId;
				return await handleGet(uid, DB);
			default:
				throw new Error('Method not supported');
		}
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	} finally {
		await DB.close();
	}
};

const handleGet = async (uid: string, DB: db) => {
	try {
		const me = await DB.player.findByPk(uid, {
			attributes: [
				'uid',
				'displayName',
				'email',
				'phoneNumber',
				'photoURL',
				'isAdmin',
			],
			include: [
				{
					model: DB.team,
					attributes: ['id', 'displayName', 'logoUrl'],
					include: [
						{
							model: DB.role,
							attributes: ['id', 'name'],
						},
					],
				},
				{
					model: DB.invitation,
					attributes: ['id'],
					include: [
						{
							model: DB.team,
							attributes: ['id', 'displayName', 'logoUrl'],
						},
					],
				},
			],
		});

		if (!me) throw new Error('User Session info not found.');

		const upcomingEvents = await DB.event.findAll({
			attributes: [
				'id',
				'name',
				'description',
				'inscripInitDate',
				'inscripEndDate',
				'isCoaching',
				'isLive',
				'bannerUrl',
			],
			include: [
				{
					model: DB.gameMode,
					attributes: ['name', 'description'],
				},
				{
					model: DB.videoGame,
					attributes: ['displayName'],
					include: [
						{
							model: DB.hardware,
							attributes: ['displayName'],
						},
					],
				},
			],
		});

		return formatJSONResponse({
			message: 'User Session info found.',
			userInfo: me,
			upcomingEvents,
		});
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	}
};

export const main = middyfy(me);
