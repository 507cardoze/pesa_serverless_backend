import { Game } from '@db/models/game';

export const GAME_STUB: Array<Pick<Game, 'id' | 'gameNum' | 'eventId'>> = [
	{
		id: '1c382b48-4aa4-11ed-b878-0242ac120002',
		gameNum: 1,
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
	},
	{
		id: '2312bfdc-4aa4-11ed-b878-0242ac120002',
		gameNum: 2,
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
	},
];
