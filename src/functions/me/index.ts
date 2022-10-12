import { handlerPath } from '@libs/handler-resolver';
import postSchema from '@functions/me/schema/post-schema';

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
		{
			http: {
				method: 'GET',
				path: 'me/{id}',
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
		{
			http: {
				method: 'POST',
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
				request: {
					schemas: {
						'application/json': postSchema,
					},
				},
			},
		},
	],
};
