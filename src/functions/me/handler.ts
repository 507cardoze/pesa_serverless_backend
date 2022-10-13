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
		throw new Error('authorizer is not present');

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
			include: [
				{
					model: DB.team,
				},
				{
					model: DB.invitation,
					include: [
						{
							model: DB.team,
						},
					],
				},
			],
		});

		if (!me) throw new Error('Player not found');

		return formatJSONResponse({
			message: 'Player found',
			userInfo: me,
		});
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	}
};

export const main = middyfy(me);
