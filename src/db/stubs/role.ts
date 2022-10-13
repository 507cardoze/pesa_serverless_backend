import { Role } from '@db/models/role';

export const ROLE_STUBS: Array<Pick<Role, 'id' | 'name'>> = [
	{
		id: '80c0b58e-4b40-11ed-b878-0242ac120002',
		name: 'Owner',
	},
	{
		id: '83ffeb3e-4b40-11ed-b878-0242ac120002',
		name: 'Coach',
	},
	{
		id: '8924b770-4b40-11ed-b878-0242ac120002',
		name: 'Captain',
	},
	{
		id: '8dd32612-4b40-11ed-b878-0242ac120002',
		name: 'Titular',
	},
	{
		id: '9177dc86-4b40-11ed-b878-0242ac120002',
		name: 'Substitute',
	},
];
