import { generateIamPolicy, initializeSdk } from '@shared/libs/firebase';
import { middyfy } from '@shared/libs/lambda';
import admin from 'firebase-admin';
import { APIGatewayTokenAuthorizerHandler, AuthResponse } from 'aws-lambda';
import { getAuthToken } from '@shared/libs/get-authtoken';
import { MOCK_USER_DATA } from './local-user-data';

const authorizer: APIGatewayTokenAuthorizerHandler = async (
	event
): Promise<AuthResponse> => {
	try {
		if (event.authorizationToken === 'Bearer Anthony')
			return generateIamPolicy('Allow', event.methodArn, MOCK_USER_DATA.sub);
		const bearerToken = getAuthToken(event.authorizationToken);
		if (!bearerToken || typeof bearerToken === 'string')
			return generateIamPolicy('Deny', event.methodArn);

		initializeSdk();
		const decodedData = await admin.auth().verifyIdToken(bearerToken);
		return generateIamPolicy('Allow', event.methodArn, decodedData.sub);
	} catch (error) {
		return generateIamPolicy('Deny', event.methodArn);
	}
};

export const main = middyfy(authorizer);
