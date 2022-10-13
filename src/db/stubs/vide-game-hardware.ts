import { VideoGameHardware } from '@db/models/video-game-hardware';

export const VIDEO_GAME_HARDWARE_STUBS: Array<
	Pick<VideoGameHardware, 'id' | 'idVideoGame' | 'idHardware'>
> = [
	{
		id: 'c0f9a9d0-1c8a-11eb-9a5b-4d6c9f6a9b6c',
		idVideoGame: '7b4bfd14-4a3e-11ed-b878-0242ac120002',
		idHardware: '33c9e840-4a41-11ed-b878-0242ac120002',
	},
	{
		id: 'c0f9a9d0-1c8a-11eb-9a5b-4d6c9f6a9b6d',
		idVideoGame: '7fa6cf2e-4a3e-11ed-b878-0242ac120002',
		idHardware: '238a9c72-4a41-11ed-b878-0242ac120002',
	},
	{
		id: 'c0f9a9d0-1c8a-11eb-9a5b-4d6c9f6a9b6e',
		idVideoGame: '7fa6cf2e-4a3e-11ed-b878-0242ac120002',
		idHardware: '273b74e0-4a41-11ed-b878-0242ac120002',
	},
	{
		id: 'c0f9a9d0-1c8a-11eb-9a5b-4d6c9f6a9b6f',
		idVideoGame: '7fa6cf2e-4a3e-11ed-b878-0242ac120002',
		idHardware: '304a6316-4a41-11ed-b878-0242ac120002',
	},
];
