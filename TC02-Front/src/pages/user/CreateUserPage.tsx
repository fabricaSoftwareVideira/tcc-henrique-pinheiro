import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Header } from '../../utils/Header';
import { UserForm } from '@/components/forms/UserForm';
import { userFormSchema } from '@/@types/user/userFormSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateUser } from '@/hooks/user/useCreateUser';
import { useFetchRoles } from '@/hooks/role/useFetchRoles';

export const CreateUserPage: React.FC = () => {
	const { handleCreateUser, error, data, message } = useCreateUser();
	const formMethods = useForm<z.infer<typeof userFormSchema>>({
		resolver: zodResolver(userFormSchema),
		defaultValues: {
			userName: '',
			userEmail: '',
			userPassword: '',
			roleId: 0,
			roleTitle: '',
		},
	});

	const [roles, setRoles] = useState<{ roleId: number; roleTitle: string }[]>([]);
	const { data: rolesData, loading: rolesLoading } = useFetchRoles();

	useEffect(() => {
		if (rolesData) {
			setRoles(rolesData);
		}
	}, [rolesData]);

	const onSubmit = async (values: z.infer<typeof userFormSchema>) => {
		await handleCreateUser(
			values.userName,
			values.userEmail,
			values.userPassword,
			values.roleId,
			values.roleTitle
		);
	};

	useEffect(() => {
		if (data) {
			formMethods.reset();
		}
	}, [data, formMethods]);

	return (
		<>
			<div className='flex flex-col items-center justify-start min-h-screen'>
				<Header />
				<div className='flex items-center justify-center h-screen my-28 w-full'>
					<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground'>
						<h2 className='my-5 text-center'>Cadastrar Usuário</h2>
						<UserForm
							formMethods={formMethods}
							onSubmit={onSubmit}
							error={error}
							data={data}
							message={message}
							roles={roles}
							isLoading={rolesLoading}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
