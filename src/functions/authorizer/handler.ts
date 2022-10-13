import { generateIamPolicy, initializeSdk } from '@libs/firebase';
import { middyfy } from '@libs/lambda';
import admin from 'firebase-admin';
import { APIGatewayTokenAuthorizerHandler, AuthResponse } from 'aws-lambda';
import { getAuthToken } from '@libs/get-authtoken';
import { MOCK_USER_DATA } from './local-user-data';

const authorizer: APIGatewayTokenAuthorizerHandler = async (
	event
): Promise<AuthResponse> => {
	try {
		const isOffline = Boolean(process.env.IS_OFFLINE) ? true : false;

		if (isOffline)
			return generateIamPolicy('Allow', event.methodArn, MOCK_USER_DATA);

		const bearerToken = getAuthToken(event.authorizationToken);
		if (!bearerToken || typeof bearerToken === 'string')
			return generateIamPolicy('Deny', event.methodArn);
		initializeSdk();
		const decodedData = await admin.auth().verifyIdToken(bearerToken);
		return generateIamPolicy('Allow', event.methodArn, decodedData);
	} catch (err) {
		return generateIamPolicy('Deny', event.methodArn);
	}
};

export const main = middyfy(authorizer);
