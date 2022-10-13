import { Game } from '@db/models/game';

export const GAME_STUB: Array<
	Pick<Game, 'id' | 'gameNum' | 'eventId' | 'teamId' | 'playerId'>
> = [
	{
		id: '1c382b48-4aa4-11ed-b878-0242ac120002',
		gameNum: 1,
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
		teamId: 'b91da178-49ea-11ed-b878-0242ac120002',
		playerId: '1',
	},
	{
		id: '2312bfdc-4aa4-11ed-b878-0242ac120002',
		gameNum: 2,
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
		teamId: 'b91da178-49ea-11ed-b878-0242ac120002',
		playerId: '1',
	},
];
