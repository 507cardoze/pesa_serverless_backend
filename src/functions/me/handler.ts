import { db, getDBInstance } from '@db/db';
import {
	formatJSONResponse,
	internalServerError,
} from '@shared/libs/api-gateway';
import { middyfy } from '@shared/libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import {
	UpcomingEvent,
	UserInfo,
	UserInfoType,
} from './interfaces/me-response';

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
		const userInfo: UserInfo = await DB.player.findByPk(uid, {
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
					exclude: [
						{
							model: DB.inscription,
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

		if (!userInfo) throw new Error('User Session info not found.');

		const upcomingEvents: UpcomingEvent = await DB.event.findAll({
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
				{
					model: DB.player,
					attributes: [
						'uid',
						'displayName',
						'email',
						'phoneNumber',
						'photoURL',
						'isAdmin',
					],
					as: 'playersInscriptions',
				},
				{
					model: DB.team,
					attributes: ['id', 'displayName', 'logoUrl'],
					as: 'teamsInscriptions',
					include: [
						{
							model: DB.player,
						},
					],
				},
			],
		});

		return formatJSONResponse({
			message: 'User Session info found.',
			userInfo,
			upcomingEvents,
		});
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	}
};

export const main = middyfy(me);
