import type { AWS } from '@serverless/typescript';

import me from '@functions/me';
import authorizer from '@functions/authorizer';

const serverlessConfiguration: AWS = {
	service: 'pesa-serverless-backend',
	frameworkVersion: '3',
	plugins: [
		'serverless-esbuild',
		'serverless-offline',
		'serverless-dotenv-plugin',
	],
	useDotenv: true,
	provider: {
		name: 'aws',
		runtime: 'nodejs14.x',
		apiGateway: {
			minimumCompressionSize: 1024,
			shouldStartNameWithService: true,
		},
		environment: {
			AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
			FIREBASE_PROJECT_ID: '${env:FIREBASE_PROJECT_ID}',
			FIREBASE_PRIVATE_KEY: '${env:FIREBASE_PRIVATE_KEY}',
			FIREBASE_CLIENT_EMAIL: '${env:FIREBASE_CLIENT_EMAIL}',
		},
	},
	// import the function via paths
	functions: { me, authorizer },
	package: { individually: true },
	custom: {
		esbuild: {
			bundle: true,
			minify: true,
			sourcemap: true,
			exclude: ['aws-sdk'],
			target: 'node14',
			define: { 'require.resolve': undefined },
			platform: 'node',
			concurrency: 10,
		},
	},
};

module.exports = serverlessConfiguration;
