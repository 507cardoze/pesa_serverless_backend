import { db, getDBInstance } from '@db/db';
import { Player } from '@db/models/player';
import {
	formatJSONResponse,
	internalServerError,
	parseBody,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { bodyPayloadType } from '@functions/me/interface/handlePost';

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

	try {
		switch (event.httpMethod) {
			case 'GET':
				if (event.pathParameters && event.pathParameters.id)
					return await handleGet(event.pathParameters.id, DB);

				if (!event.requestContext.authorizer)
					throw new Error('authorizer is not present');
				const uid: string = event.requestContext.authorizer.principalId;
				return await handleGet(uid, DB);
			case 'POST':
				const body: bodyPayloadType = parseBody(event.body);
				return await handleCreate(body, DB);
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

const handleCreate = async (
	{ uid, email, displayName, photoUrl, phoneNumber }: bodyPayloadType,
	DB: db
) => {
	try {
		const verifyUser: Array<Player> = await DB.player.findOne({
			where: {
				uid: uid,
			},
			include: [
				{
					model: DB.team,
				},
			],
		});

		if (verifyUser)
			return formatJSONResponse({
				message: 'Player already exists',
				createdUser: verifyUser,
			});

		const createdUser = await DB.player.create({
			uid: uid,
			email: email,
			displayName: displayName,
			photoUrl: photoUrl,
			phoneNumber: phoneNumber,
		});

		return formatJSONResponse({
			message: 'Player created',
			createdUser,
		});
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	}
};

export const main = middyfy(me);
