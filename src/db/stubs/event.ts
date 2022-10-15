import { Event } from '@db/models/event';

export const EVENT_STUBS: Array<
	Pick<
		Event,
		| 'id'
		| 'name'
		| 'description'
		| 'inscripInitDate'
		| 'inscripEndDate'
		| 'isCoaching'
		| 'isLive'
		| 'bannerUrl'
		| 'videoGameId'
		| 'gameModeId'
		| 'entryCost'
		| 'inscripInitDate'
		| 'inscripEndDate'
		| 'eventInitDate'
		| 'eventEndDate'
		| 'maxEntry'
		| 'additionalInfo'
	>
> = [
	{
		id: 'a42653b4-4a71-11ed-b878-0242ac120002',
		name: 'Torneo de fin de año',
		description: 'Torneo de fin de año de League of Legends',
		inscripInitDate: new Date(),
		inscripEndDate: new Date(),
		isCoaching: false,
		isLive: false,
		bannerUrl: 'https://www.google.com',
		videoGameId: '7b4bfd14-4a3e-11ed-b878-0242ac120002',
		gameModeId: 'f15dd444-4a68-11ed-b878-0242ac120002',
		entryCost: 0,
		eventInitDate: new Date(),
		eventEndDate: new Date(),
		maxEntry: 25,
		additionalInfo: 'Gratis',
	},
	{
		id: 'd0c073e4-4a73-11ed-b878-0242ac120002',
		name: 'Torneo de Inauguración',
		description: 'Torneo de Inauguración de Overwatch',
		inscripInitDate: new Date(),
		inscripEndDate: new Date(),
		isCoaching: false,
		isLive: false,
		bannerUrl: 'https://www.google.com',
		videoGameId: '7fa6cf2e-4a3e-11ed-b878-0242ac120002',
		gameModeId: 'f733c23e-4a68-11ed-b878-0242ac120002',
		entryCost: 500,
		eventInitDate: new Date(),
		eventEndDate: new Date(),
		maxEntry: 15,
		additionalInfo: 'No es gratis dude!',
	},
];
