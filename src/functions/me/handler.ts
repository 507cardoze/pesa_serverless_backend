import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';

const me: APIGatewayProxyHandler = async (
	event,
	_context,
	callback
): Promise<APIGatewayProxyResult> => {
	try {
		switch (event.httpMethod) {
			case 'GET':
				return formatJSONResponse({
					message: 'User data',
				});
			case 'POST':
				const { uid, email, displayName, photoUrl, phoneNumber } = JSON.parse(
					event.body
				);

				return formatJSONResponse({
					message: 'User created',
					user: { uid, email, displayName, photoUrl, phoneNumber },
				});
			default:
				callback(new Error('Method not allowed'), null);
				return;
		}
	} catch (error) {
		callback(error, null);
		return;
	}
};

export const main = middyfy(me);
