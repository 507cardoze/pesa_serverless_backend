import { Roster } from '@db/models/roster';

export const ROSTER_STUBS: Array<
	Pick<Roster, 'id' | 'teamId' | 'playerId' | 'roleId'>
> = [
	{
		id: '343058c4-49eb-11ed-b878-0242ac120002',
		teamId: 'b91da178-49ea-11ed-b878-0242ac120002',
		playerId: '1',
		roleId: '80c0b58e-4b40-11ed-b878-0242ac120002',
	},
	{
		id: '37d67986-49eb-11ed-b878-0242ac120002',
		teamId: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
		playerId: '2',
		roleId: '83ffeb3e-4b40-11ed-b878-0242ac120002',
	},
	{
		id: '3afe1984-49eb-11ed-b878-0242ac120002',
		teamId: 'e0628172-49ea-11ed-b878-0242ac120002',
		playerId: '3',
		roleId: '8dd32612-4b40-11ed-b878-0242ac120002',
	},
];
