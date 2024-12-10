import React from 'react';
import { Header } from '@/utils/Header';
import { UserTable } from '@/components/tables/users/UserTable';

export const ListUsersPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-start min-h-screen'>
			<Header />
			<h2 className='mt-24 text-center'>Usuários</h2>
			<UserTable />
		</div>
	);
};
