import { Team } from '@db/models/team';

export const TEAM_STUBS: Array<Pick<Team, 'displayName' | 'logoUrl'>> = [
	{
		displayName: 'Team 1',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
	{
		displayName: 'Team 2',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
	{
		displayName: 'Team 3',
		logoUrl: 'https://i.imgur.com/3w7V3s0.png',
	},
];
