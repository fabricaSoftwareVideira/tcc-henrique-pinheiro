import { ColumnDef } from '@tanstack/react-table';

export type User = {
	courseId: number;
	courseName: string;
	courseCoordinatorEmail: string;
};

export const columns: ColumnDef<User>[] = [
	{
		accessorKey: 'userName',
		header: 'Nome',
	},
	{
		accessorKey: 'userEmail',
		header: 'Email do Usuário',
	},
	{
		accessorKey: 'role.roleTitle',
		header: 'Cargo do Usuário',
	},
];
