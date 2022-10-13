export default {
	type: 'object',
	properties: {
		displayName: { type: 'string' },
		email: { type: 'string' },
		photoURL: { type: 'string' },
		phoneNumber: { type: 'string' },
		uid: { type: 'string' },
	},
	required: ['displayName', 'email', 'uid'],
} as const;
