import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { z } from 'zod';
import { courseFormSchema } from '@/@types/course/courseFormSchema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DefaultWarning } from '@/utils/DefaultWarning';
import { Alert } from '../ui/alert';
import { Modal } from '@/components/ui/modal';

interface CourseFormProps {
	formMethods: UseFormReturn<z.infer<typeof courseFormSchema>>;
	onSubmit: (values: z.infer<typeof courseFormSchema>) => Promise<void>;
	isLoading?: boolean;
	error: string | null;
	data: any;
	message: string | null;
}

export const CourseForm: React.FC<CourseFormProps> = ({
	formMethods,
	onSubmit,
	isLoading,
	error,
	data,
	message,
}) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitValues, setSubmitValues] = useState<z.infer<
		typeof courseFormSchema
	> | null>(null);

	const handleFormSubmit = (values: z.infer<typeof courseFormSchema>) => {
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
		<div className='max-w-sm mx-auto'>
			{isLoading && <DefaultWarning message='Carregando...' />}
			{error && <Alert className='text-red-500 my-4 p-2 text-center'>{error}</Alert>}
			{data && <Alert className='text-green-500 my-4 p-2 text-center'>{message}</Alert>}
			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(handleFormSubmit)}>
					<FormField
						control={formMethods.control}
						name='courseName'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Nome do Curso</FormLabel>
								<FormControl>
									<Input
										type='text'
										placeholder='Nome do Curso'
										required
										{...field}
										value={field.value || ''}
									/>
								</FormControl>
							</FormItem>
						)}
					/>

					<FormField
						control={formMethods.control}
						name='coordinatorEmail'
						render={({ field }) => (
							<FormItem className='my-6'>
								<FormLabel>Email do Coordenador do Curso</FormLabel>
								<FormControl>
									<Input
										type='email'
										placeholder='coordenador@email.com'
										{...field}
										value={field.value || ''}
										required
									/>
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
