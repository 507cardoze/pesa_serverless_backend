import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { HandlePostProps } from './interface/handlePost';

const me: APIGatewayProxyHandler = async (event) => {
	try {
		switch (event.httpMethod) {
			case 'GET':
				return formatJSONResponse({
					message: 'GET method not implemented',
					event,
				});
			case 'POST':
				return formatJSONResponse({
					message: 'POST method not implemented',
					event,
				});
			case 'PUT':
				return formatJSONResponse({
					message: 'PUT method not implemented',
					event,
				});
			case 'DELETE':
				return formatJSONResponse({
					message: 'DELETE method not implemented',
					event,
				});
			default:
				throw new Error('Method not supported');
		}
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({
				message: error.message,
			}),
		};
	}
};

const handlePOST = ({
	uid,
	email,
	displayName,
	photoUrl,
	phoneNumber,
}: HandlePostProps) => {};

export const main = middyfy(me);
