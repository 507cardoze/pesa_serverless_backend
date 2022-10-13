import { GamePlayer } from '@db/models/game-player';

export const GAMER_PLAYER_STUBS: Array<
	Pick<GamePlayer, 'id' | 'gameId' | 'playerId' | 'teamId'>
> = [
	{
		id: 'b8ba90e6-4b3a-11ed-b878-0242ac120002',
		gameId: '1c382b48-4aa4-11ed-b878-0242ac120002',
		playerId: '1',
		teamId: 'b91da178-49ea-11ed-b878-0242ac120002',
	},
	{
		id: 'dc075f20-4b3a-11ed-b878-0242ac120002',
		gameId: '1c382b48-4aa4-11ed-b878-0242ac120002',
		playerId: '2',
		teamId: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
	},
];
