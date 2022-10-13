import { Team } from '@db/models/team';

export const TEAM_STUBS: Array<Pick<Team, 'id' | 'displayName' | 'logoUrl'>> = [
	{
		id: 'b91da178-49ea-11ed-b878-0242ac120002',
		displayName: 'Team 1',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
	{
		id: 'd9a70ce0-49ea-11ed-b878-0242ac120002',
		displayName: 'Team 2',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
	{
		id: 'e0628172-49ea-11ed-b878-0242ac120002',
		displayName: 'Team 3',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
];
