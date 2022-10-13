import { Metric } from '@db/models/metric';

export const METRIC_STUBS: Array<
	Pick<Metric, 'id' | 'metricTypeId' | 'metricKeyId' | 'value' | 'gamePlayerId'>
> = [
	{
		id: '0057b228-4aa3-11ed-b878-0242ac120002',
		metricTypeId: '8936cf64-4aa0-11ed-b878-0242ac120002',
		metricKeyId: 'b15944c0-4aa2-11ed-b878-0242ac120002',
		value: 'Charizard',
		gamePlayerId: 'b8ba90e6-4b3a-11ed-b878-0242ac120002',
	},
	{
		id: '040a9908-4aa3-11ed-b878-0242ac120002',
		metricTypeId: '8cc07cfc-4aa0-11ed-b878-0242ac120002',
		metricKeyId: 'ab4b691e-4aa2-11ed-b878-0242ac120002',
		value: '151',
		gamePlayerId: 'b8ba90e6-4b3a-11ed-b878-0242ac120002',
	},
	{
		id: '14411732-4aa5-11ed-b878-0242ac120002',
		metricTypeId: '8936cf64-4aa0-11ed-b878-0242ac120002',
		metricKeyId: 'b15944c0-4aa2-11ed-b878-0242ac120002',
		value: 'Blastoise',
		gamePlayerId: 'dc075f20-4b3a-11ed-b878-0242ac120002',
	},
	{
		id: '18c9d1d6-4aa5-11ed-b878-0242ac120002',
		metricTypeId: '8cc07cfc-4aa0-11ed-b878-0242ac120002',
		metricKeyId: 'ab4b691e-4aa2-11ed-b878-0242ac120002',
		value: '57',
		gamePlayerId: 'dc075f20-4b3a-11ed-b878-0242ac120002',
	},
];
