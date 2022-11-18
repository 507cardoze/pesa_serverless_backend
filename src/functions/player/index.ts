import { handlerPath } from '@shared/libs/handler-resolver';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	timeout: 30,
	events: [
		{
			http: {
				method: 'POST',
				path: 'player',
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
				summary: 'Create player if does not exist',
				description: 'Create player if does not exist',
				swaggerTags: ['Player'],
				bodyType: 'PlayerInitType',
				responseData: {
					200: {
						description: 'Success',
						bodyType: 'PlayerResponse',
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