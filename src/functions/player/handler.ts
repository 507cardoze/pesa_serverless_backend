import { db, getDBInstance } from '@db/db';
import {
	formatJSONResponse,
	internalServerError,
} from '@shared/libs/api-gateway';
import { middyfy } from '@shared/libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';

let DB: any;

const player: APIGatewayProxyHandler = async (event) => {
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
			case 'POST':
				const body =
					typeof event.body === 'string' ? JSON.parse(event.body) : event.body;

				if (!body || !body.uid || !body.displayName || !body.email)
					throw new Error('Body schema error');

				const { uid, displayName, email, photoURL } = body;

				return await handlePost(
					{
						uid,
						displayName,
						email,
						photoURL: photoURL ? photoURL : null,
					},
					DB
				);
			default:
				throw new Error('Method not supported');
		}
	} catch (error) {
		console.error('error: ', error);
		return internalServerError({
			message: error.message,
		});
	} finally {
		await DB.close();
	}
};

const handlePost = async (
	userInfo: {
		uid: string;
		displayName: string;
		email: string;
		photoURL?: string | null;
	},
	DB: db
) => {
	try {
		const playerVerification = await DB.player.findByPk(userInfo.uid);

		if (playerVerification) {
			return formatJSONResponse({
				message: 'Player already exists',
				userInfo: playerVerification,
			});
		}

		const newPlayer = await DB.player.create({
			uid: userInfo.uid,
			displayName: userInfo.displayName,
			email: userInfo.email,
			photoURL: userInfo.photoURL,
		});

		return formatJSONResponse({
			message: 'player created.',
			userInfo: newPlayer,
		});
	} catch (error) {
		console.error('error: ', error);
		return internalServerError({
			message: error.message,
		});
	}
};

export const main = middyfy(player);
