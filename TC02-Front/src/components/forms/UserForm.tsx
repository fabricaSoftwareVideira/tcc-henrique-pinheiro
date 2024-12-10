import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { userFormSchema } from '@/@types/user/userFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectItem,
	SelectValue,
} from '@/components/ui/select';
import { DefaultWarning } from '@/utils/DefaultWarning';
import { Alert } from '@/components/ui/alert';
import { Modal } from '@/components/ui/modal';

interface UserFormProps {
	formMethods: UseFormReturn<z.infer<typeof userFormSchema>>;
	onSubmit: (values: z.infer<typeof userFormSchema>) => Promise<void>;
	isLoading?: boolean;
	error: string | null;
	data: any;
	message: string | null;
	roles: { roleId: number; roleTitle: string }[];
}

export const UserForm: React.FC<UserFormProps> = ({
	formMethods,
	onSubmit,
	isLoading,
	error,
	data,
	message,
	roles,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitValues, setSubmitValues] = useState<z.infer<typeof userFormSchema> | null>(
		null
	);

	const handleFormSubmit = (values: z.infer<typeof userFormSchema>) => {
		setSubmitValues(values);
		setIsModalOpen(true);
	};

	const handleConfirmSubmit = async () => {
		if (submitValues) {
			await onSubmit(submitValues);
			setIsModalOpen(false);

			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className='max-w-sm mx-auto '>
			{isLoading && <DefaultWarning message='Carregando...' />}
			{error && <Alert className='text-red-500 my-4 p-2 text-center'>{error}</Alert>}
			{data && <Alert className='text-green-500 my-4 p-2 text-center'>{message}</Alert>}
			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(handleFormSubmit)} className='space-y-8'>
					<FormField
						control={formMethods.control}
						name='userName'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Nome do Usuário</FormLabel>
								<FormControl>
									<Input required type='text' placeholder='Nome' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='userEmail'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Email do Usuário</FormLabel>
								<FormControl>
									<Input required type='email' placeholder='user@email.com' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='userPassword'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Senha</FormLabel>
								<FormControl>
									<Input required type='password' placeholder='Senha' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='roleId'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Role</FormLabel>
								<FormControl>
									<Select
										onValueChange={(value) => {
											const selectedRole = roles.find(
												(role) => role.roleId === Number(value)
											);
											if (selectedRole) {
												formMethods.setValue('roleTitle', selectedRole.roleTitle);
											}
											field.onChange(Number(value));
										}}
										value={String(field.value)}>
										<SelectTrigger>
											<SelectValue placeholder='Selecione uma Role' />
										</SelectTrigger>
										<SelectContent>
											{Array.isArray(roles) && roles.length > 0 ? (
												roles.map((role) => (
													<SelectItem key={role.roleId} value={String(role.roleId)}>
														{role.roleTitle}
													</SelectItem>
												))
											) : (
												<SelectItem value='Nenhum' disabled>
													Carregando...
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								</FormControl>
							</FormItem>
						)}
					/>

					<Button type='submit'>Enviar</Button>
				</form>
			</Form>

			{isModalOpen && (
				<Modal
					title='Confirmação de Envio'
					onClose={handleCancel}
					actions={
						<>
							<Button variant='destructive' onClick={handleCancel}>
								Cancelar
							</Button>
							<Button variant='default' onClick={handleConfirmSubmit}>
								Confirmar
							</Button>
						</>
					}>
					<p>Tem certeza de que deseja enviar o formulário?</p>
				</Modal>
			)}
		</div>
	);
};
