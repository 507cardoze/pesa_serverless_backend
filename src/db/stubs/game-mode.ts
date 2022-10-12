import { GameMode } from '@db/models/game-mode';

export const GAMEMODE_STUBS: Array<
	Pick<GameMode, 'id' | 'name' | 'description'>
> = [
	{
		id: 'f15dd444-4a68-11ed-b878-0242ac120002',
		name: 'Classic',
		description: 'Classic game mode',
	},
	{
		id: 'f733c23e-4a68-11ed-b878-0242ac120002',
		name: 'Quick',
		description: 'Quick game mode',
	},
];
