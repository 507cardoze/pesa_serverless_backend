import { VideoGame } from '@db/models/video-game';

export const VIDEO_GAME_STUBS: Array<Pick<VideoGame, 'id' | 'displayName'>> = [
	{
		id: '7b4bfd14-4a3e-11ed-b878-0242ac120002',
		displayName: 'League of Legends',
	},
	{
		id: '7fa6cf2e-4a3e-11ed-b878-0242ac120002',
		displayName: 'Overwatch',
	},
	{
		id: '828d8cc8-4a3e-11ed-b878-0242ac120002',
		displayName: 'Counter-Strike: Global Offensive',
	},
	{
		id: '853c28e4-4a3e-11ed-b878-0242ac120002',
		displayName: 'Dota 2',
	},
	{
		id: '890a8d76-4a3e-11ed-b878-0242ac120002',
		displayName: 'Hearthstone',
	},
];
