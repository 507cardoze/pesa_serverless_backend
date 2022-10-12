import { db, getDBInstance } from '@db/db';
import { Player } from '@db/models/player';
import {
	formatJSONResponse,
	internalServerError,
	parseBody,
} from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { bodyPayloadType } from './interface/handlePost';

const me: APIGatewayProxyHandler = async (event) => {
	const DB = await getDBInstance();
	try {
		switch (event.httpMethod) {
			case 'GET':
				if (!event.requestContext.authorizer)
					throw new Error('principalId is not present');
				const uid: string = event.requestContext.authorizer.principalId;
				return handleGet(uid, DB);
			case 'POST':
				const body: bodyPayloadType = parseBody(event.body);
				return handleCreate(body, DB);
			default:
				throw new Error('Method not supported');
		}
	} catch (error) {
		return internalServerError({
			message: error.message,
		});
	}
};

const handleGet = async (uid: string, DB: db) => {
	const me: Array<Player> = await DB.player.findOne({
		where: {
			uid: uid,
		},
	});

	if (!me)
		return internalServerError({
			message: 'User not found',
		});

	return formatJSONResponse({
		message: 'GET method not implemented',
		userInfo: me,
	});
};

const handleCreate = async (
	{ uid, email, displayName, photoUrl, phoneNumber }: bodyPayloadType,
	DB: db
) => {
	const verifyUser: Array<Player> = await DB.player.findOne({
		where: {
			uid: uid,
		},
	});

	if (verifyUser)
		return internalServerError({
			message: 'User already exists',
		});

	const createdUser = await DB.player.create({
		uid: uid,
		email: email,
		displayName: displayName,
		photoUrl: photoUrl,
		phoneNumber: phoneNumber,
	});

	return formatJSONResponse({
		message: 'POST method not implemented',
		createdUser,
	});
};

export const main = middyfy(me);
