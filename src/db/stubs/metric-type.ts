import { MetricType } from '@db/models/metric-type';

export const METRIC_TYPE_STUBS: Array<Pick<MetricType, 'id' | 'name'>> = [
	{
		id: '8936cf64-4aa0-11ed-b878-0242ac120002',
		name: 'String',
	},
	{
		id: '8cc07cfc-4aa0-11ed-b878-0242ac120002',
		name: 'Number',
	},
];
