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
			PG_DB_HOST: '${env:PG_DB_HOST}',
			PG_DB_PORT: '${env:PG_DB_PORT}',
			PG_DB_NAME: '${env:PG_DB_NAME}',
			PG_DB_USER: '${env:PG_DB_USER}',
			PG_DB_PASSWORD: '${env:PG_DB_PASSWORD}',
		},
	},
	// import the function via paths
	functions: { authorizer, me },
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
			packager: 'yarn',
			packagePath: 'package.json',
			packagerOptions: {
				external: ['pg-native'],
			},
		},
	},
};

module.exports = serverlessConfiguration;
