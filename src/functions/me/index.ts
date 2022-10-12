import { handlerPath } from '@libs/handler-resolver';
import POSTschema from './POST-schema';

export default {
	handler: `${handlerPath(__dirname)}/handler.main`,
	timeout: 900,
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
						'application/json': POSTschema,
					},
				},
			},
		},
	],
};
