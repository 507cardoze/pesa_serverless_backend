import { generateIamPolicy, initializeSdk } from '@libs/firebase';
import { middyfy } from '@libs/lambda';
import admin from 'firebase-admin';
import { APIGatewayTokenAuthorizerHandler, AuthResponse } from 'aws-lambda';
import { getAuthToken } from '@libs/get-authtoken';

const authorizer: APIGatewayTokenAuthorizerHandler = async (
	event
): Promise<AuthResponse> => {
	try {
		const isOffline = process.env.IS_OFFLINE ?? '';

		if (isOffline)
			return generateIamPolicy('Allow', event.methodArn, {
				uid: '123',
				email: 'example@gmail.com',
				role: 'admin',
				aud: '',
				auth_time: 0,
				exp: 0,
				firebase: {
					identities: {},
					sign_in_provider: '',
					sign_in_second_factor: '',
					second_factor_identifier: '',
					tenant: '',
				},
				iat: 0,
				iss: '',
				sub: '',
			});

		const bearerToken = getAuthToken(event.authorizationToken);
		if (!bearerToken) return generateIamPolicy('Deny', event.methodArn);
		initializeSdk();
		const decodedData = await admin.auth().verifyIdToken(bearerToken);
		return generateIamPolicy('Allow', event.methodArn, decodedData);
	} catch (err) {
		return generateIamPolicy('Deny', event.methodArn);
	}
};

export const main = middyfy(authorizer);
