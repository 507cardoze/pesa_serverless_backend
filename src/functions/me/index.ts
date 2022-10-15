import { handlerPath } from '@shared/libs/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	timeout: 30,
	events: [
		{
			http: {
				method: 'GET',
				path: 'me',
				cors: {
					origin: '*',
					headers: [
						'Content-Type',
						'X-Amz-Date',
						'Authorization',
						'X-Api-Key',
						'X-Amz-Security-Token',
						'X-Amz-User-Agent',
					],
				},
				summary: 'User Profile Information',
				description: 'Get the user profile information',
				swaggerTags: ['Logged User'],
				responseData: {
					200: {
						description: 'Success',
						bodyType: 'UserInfoResponse',
					},
					403: {
						description: 'Forbidden',
						bodyType: 'ErrorResponse',
					},
					500: {
						description: 'internalServerError',
						bodyType: 'ErrorResponse',
					},
				},
				authorizer: {
					name: 'authorizer',
				},
			},
		},
	],
};
