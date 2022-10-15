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
				authorizer: {
					name: 'authorizer',
				},
			},
		},
	],
};
