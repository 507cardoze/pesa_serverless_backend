import { Invitation } from '@db/models/invitation';

export const INVITATION_STUBS: Array<Pick<Invitation, 'id' | 'teamId' | 'playerId'>> =
	[
		{
			id: 'b91da178-49ea-11ed-b878-0242ac120002',
			teamId: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
			playerId: '1',
		},
		{
			id: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
			teamId: 'e0628172-49ea-11ed-b878-0242ac120002',
			playerId: '1',
		},
	];
