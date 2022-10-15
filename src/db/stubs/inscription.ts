import { Inscription } from '@db/models/inscription';

export const INSCRIPTION_STUBS: Array<
	Pick<Inscription, 'id' | 'eventId' | 'teamId' | 'playerId'>
> = [
	{
		id: 'a0beab14-4c0a-11ed-bdc3-0242ac120002',
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
		teamId: 'b91da178-49ea-11ed-b878-0242ac120002',
		playerId: '1',
	},
	{
		id: 'aecdefa8-4c0a-11ed-bdc3-0242ac120002',
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
		teamId: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
		playerId: '2',
	},

	{
		id: 'c07f2f28-4c0a-11ed-bdc3-0242ac120002',
		eventId: 'a42653b4-4a71-11ed-b878-0242ac120002',
		teamId: 'e0628172-49ea-11ed-b878-0242ac120002',
		playerId: '3',
	},
];
