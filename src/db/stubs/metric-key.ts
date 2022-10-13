import { MetricKey } from '@db/models/metric-key';

export const METRIC_KEY_STUBS: Array<Pick<MetricKey, 'id' | 'name'>> = [
	{
		id: 'ab4b691e-4aa2-11ed-b878-0242ac120002',
		name: 'Kill',
	},
	{
		id: 'b15944c0-4aa2-11ed-b878-0242ac120002',
		name: 'Pick',
	},
];
