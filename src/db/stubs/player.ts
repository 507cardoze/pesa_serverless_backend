import { Player } from '@db/models/player';

export const PLAYER_STUB: Array<
	Pick<
		Player,
		'uid' | 'email' | 'displayName' | 'photoURL' | 'phoneNumber' | 'isAdmin'
	>
> = [
	{
		uid: '1',
		email: 'mirandacowley@gmail.com',
		displayName: 'Miranda Cowley Heller',
		photoURL: null,
		phoneNumber: '11 New Jersey, USA',
		isAdmin: true,
	},
	{
		uid: '2',
		email: 'christylefteri@gmail.com',
		displayName: 'Christy Lefteri',
		photoURL: null,
		phoneNumber: '22 Glasgow Street, UK',
		isAdmin: false,
	},
	{
		uid: '3',
		email: 'neilgaiman@gmail.com',
		displayName: 'Neil Gaiman',
		photoURL: '32 Yorkshire, UK',
		phoneNumber: '32 Yorkshire, UK',
		isAdmin: false,
	},
	{
		uid: '4',
		email: 'terrypratchett@gmail.com',
		displayName: 'Terry Pratchett',
		photoURL: null,
		phoneNumber: '11A Sussex Road, UK',
		isAdmin: false,
	},
];
