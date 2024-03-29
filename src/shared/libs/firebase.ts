import admin from 'firebase-admin';
import { PolicyDocument } from 'aws-lambda';

export const initializeSdk = () => {
	// Check if Firebase Admin SDK is already initialized, if not, then do it
	if (admin.apps.length == 0) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: process.env.FIREBASE_PROJECT_ID,
				clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
				privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/gm, '\n'),
			}),
		});
	}
};

// Helper funtion for generating the response API Gateway requires to handle the token verification
export const generateIamPolicy = (
	effect: string,
	resource: string,
	uid?: string
): {
	principalId: string;
	policyDocument: PolicyDocument;
} => {
	const authResponse = {
		principalId: uid || 'user',
		policyDocument: {
			Version: '2012-10-17',
			Statement: [
				{
					Action: 'execute-api:Invoke',
					Effect: effect,
					Resource: [resource],
				},
			],
		},
	};

	return authResponse;
};
