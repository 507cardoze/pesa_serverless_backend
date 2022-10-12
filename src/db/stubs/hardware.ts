import { Hardware } from '@db/models/hardware';

export const HARDWARE_STUBS: Array<Pick<Hardware, 'id' | 'displayName'>> = [
	{
		id: '238a9c72-4a41-11ed-b878-0242ac120002',
		displayName: 'PS4',
	},
	{
		id: '273b74e0-4a41-11ed-b878-0242ac120002',
		displayName: 'PS5',
	},
	{
		id: '2a487d22-4a41-11ed-b878-0242ac120002',
		displayName: 'Xbox One',
	},
	{
		id: '2d2ce398-4a41-11ed-b878-0242ac120002',
		displayName: 'Xbox Series X',
	},
	{
		id: '304a6316-4a41-11ed-b878-0242ac120002',
		displayName: 'Nintendo Switch',
	},
	{
		id: '33c9e840-4a41-11ed-b878-0242ac120002',
		displayName: 'PC',
	},
];
