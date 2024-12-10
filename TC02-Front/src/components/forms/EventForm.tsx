import React, { useState, useEffect } from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { z } from 'zod';
import { Alert } from '@/components/ui/alert';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { PlusCircle, XIcon } from 'lucide-react';
import { EventMap } from '../utils/EventMap';
import { CheckedState } from '@radix-ui/react-checkbox';
import { Modal } from '@/components/ui/modal';

interface EventFormProps {
	formMethods: UseFormReturn<z.infer<typeof eventFormSchema>>;
	onSubmit: (values: z.infer<typeof eventFormSchema>) => Promise<void>;
	isLoading?: boolean;
	error: string | null;
	data: any;
	message: string | null;
	statusOptions: { value: string; label: string }[];
	courses: { courseId: number; courseName: string }[];
	selectedCourses: CourseInterface[];
	isEditMode?: boolean;
}

export const EventForm: React.FC<EventFormProps> = ({
	formMethods,
	onSubmit,
	isLoading,
	error,
	data,
	message,
	statusOptions = [],
	courses,
	isEditMode = false,
}) => {
	const { fields, append, remove } = useFieldArray({
		control: formMethods.control,
		name: 'eventActivities',
	});

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [submitValues, setSubmitValues] = useState<z.infer<
		typeof eventFormSchema
	> | null>(null);
	const [hasLocation, setHasLocation] = useState(false);

	useEffect(() => {
		const latitude = formMethods.getValues('eventLatitude');
		const longitude = formMethods.getValues('eventLongitude');

		if (latitude !== 0 && longitude !== 0) {
			setHasLocation(true);
		}
	}, [formMethods]);

	const handleFormSubmit = (values: z.infer<typeof eventFormSchema>) => {
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

	React.useEffect(() => {
		if (fields.length === 0) {
			append({
				eventActivityTitle: '',
				eventActivityDescription: '',
				eventActivityStartDate: '',
				eventActivityEndDate: '',
			});
			remove(1);
		}
	}, [fields, append, remove]);

	const handleCheckboxChange = (course: CourseInterface) => {
		const currentValue = formMethods.getValues('selectedCourses') || [];
		const updatedValue = currentValue.some(
			(selectedCourse: CourseInterface) => selectedCourse.courseId === course.courseId
		)
			? currentValue.filter(
					(selectedCourse: CourseInterface) => selectedCourse.courseId !== course.courseId
			  )
			: [...currentValue, course];

		formMethods.setValue('selectedCourses', updatedValue);
	};

	const handleLocationCheckboxChange = (checked: CheckedState) => {
		const isChecked = checked === true;
		setHasLocation(isChecked);

		if (isChecked) {
			formMethods.setValue(
				'eventLatitude',
				formMethods.getValues('eventLatitude') || -27.026563
			);
			formMethods.setValue(
				'eventLongitude',
				formMethods.getValues('eventLongitude') || -51.144409
			);
			formMethods.setValue('eventRadius', formMethods.getValues('eventRadius') || 50);
		} else {
			formMethods.setValue('eventLatitude', 0);
			formMethods.setValue('eventLongitude', 0);
			formMethods.setValue('eventRadius', 50);
		}
	};

	return (
		<div className='container mx-auto py-10'>
			{isLoading && <div>Carregando...</div>}
			{error && <Alert className='text-red-500 my-4 p-2 text-center'>{error}</Alert>}
			{data && <Alert className='text-green-500 my-4 p-2 text-center'>{message}</Alert>}

			<Form {...formMethods}>
				<form onSubmit={formMethods.handleSubmit(handleFormSubmit)} className='space-y-8'>
					<div className='flex flex-col lg:flex-row w-full'>
						<div className='flex-1 p-4'>
							<h3 className='text-center mb-8'>Dados do Evento</h3>

							<FormField
								control={formMethods.control}
								name='eventTitle'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Título do Evento</FormLabel>
										<FormControl>
											<Input type='text' required placeholder='Título' {...field} />
										</FormControl>
									</FormItem>
								)}
							/>

							<div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
								<FormField
									control={formMethods.control}
									name='eventStartDate'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Data de Início</FormLabel>
											<FormControl>
												<Input
													required
													type='datetime-local'
													{...field}
													className='w-full'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
								<FormField
									control={formMethods.control}
									name='eventEndDate'
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormLabel>Data de Fim</FormLabel>
											<FormControl>
												<Input
													required
													type='datetime-local'
													{...field}
													className='w-full'
												/>
											</FormControl>
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={formMethods.control}
								name='eventStatus'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status do Evento</FormLabel>
										<FormControl>
											<select
												disabled={!isEditMode}
												required
												value={formMethods.watch('eventStatus') || ''}
												onChange={(e) => {
													field.onChange(e.target.value);
												}}
												className='w-full p-2 border rounded'>
												<option value='' disabled>
													Selecione um Status
												</option>
												{statusOptions.map((status) => (
													<option key={status.value} value={status.value}>
														{status.label}
													</option>
												))}
											</select>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>

						<div className='border-l border-gray-300'></div>

						<div className='flex-1 p-4'>
							<h3 className='text-center mb-8'>Cursos Participantes</h3>
							<FormField
								control={formMethods.control}
								name='selectedCourses'
								render={() => (
									<FormItem>
										<FormLabel>Cursos Permitidos</FormLabel>
										<FormControl>
											<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
												{courses.map((course) => (
													<div key={course.courseId} className='flex items-center'>
														<Checkbox
															checked={formMethods
																.watch('selectedCourses')
																.some(
																	(selectedCourse: CourseInterface) =>
																		selectedCourse.courseId === course.courseId
																)}
															onCheckedChange={() => handleCheckboxChange(course)}
														/>
														<span className='ml-2'>{course.courseName}</span>
													</div>
												))}
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</div>

					<hr className='my-8 border-gray-300' />

					<div className='flex flex-col lg:flex-row w-full mt-8'>
						<div className='flex-1 p-4'>
							<h3 className='text-center mb-8'>Atividades do Evento</h3>
							{fields.map((item, index) => (
								<div key={item.id} className='space-y-4'>
									<FormField
										control={formMethods.control}
										name={`eventActivities.${index}.eventActivityTitle`}
										render={({ field }) => (
											<FormItem className='flex-1'>
												<FormLabel>Título da Atividade</FormLabel>
												<FormControl>
													<Input
														required
														type='text'
														placeholder='Título da Atividade'
														{...field}
														className='w-full'
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={formMethods.control}
										name={`eventActivities.${index}.eventActivityDescription`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>Descrição da Atividade</FormLabel>
												<FormControl>
													<Input
														required
														type='text'
														placeholder='Descrição'
														{...field}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
										<FormField
											control={formMethods.control}
											name={`eventActivities.${index}.eventActivityStartDate`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormLabel>Data de Início</FormLabel>
													<FormControl>
														<Input
															required
															type='datetime-local'
															{...field}
															className='w-full'
														/>
													</FormControl>
												</FormItem>
											)}
										/>
										<FormField
											control={formMethods.control}
											name={`eventActivities.${index}.eventActivityEndDate`}
											render={({ field }) => (
												<FormItem className='flex-1'>
													<FormLabel>Data de Fim</FormLabel>
													<FormControl>
														<Input
															required
															type='datetime-local'
															{...field}
															className='w-full'
														/>
													</FormControl>
												</FormItem>
											)}
										/>
									</div>

									<div className='flex flex-col md:flex-row md:space-x-4'>
										<Button
											variant='destructive'
											className='my-2 flex-1'
											type='button'
											onClick={() => remove(index)}
											disabled={fields.length === 1}>
											<XIcon className='pr-1' />
											Remover Atividade
										</Button>

										<Button
											variant='default'
											type='button'
											className='my-2 flex-1'
											onClick={() =>
												append({
													eventActivityTitle: '',
													eventActivityDescription: '',
													eventActivityStartDate: '',
													eventActivityEndDate: '',
												})
											}>
											<PlusCircle className='pr-1' /> Adicionar Nova Atividade
										</Button>
									</div>
								</div>
							))}
						</div>

						<div className='border-l border-gray-300'></div>

						<div className='flex-1 p-4'>
							<h3 className='text-center mb-8'>Localização do Evento</h3>
							<div className='flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0'>
								<FormField
									control={formMethods.control}
									name='eventRadius'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Raio do Evento (em metros)</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Raio'
													{...field}
													onChange={(e) => {
														const radius = Number(e.target.value);
														field.onChange(radius);
													}}
												/>
											</FormControl>
										</FormItem>
									)}
								/>

								<div className='flex items-center relative top-4'>
									<Checkbox
										checked={!!hasLocation}
										onCheckedChange={(checked) => handleLocationCheckboxChange(!!checked)}
									/>
									<span className='ml-2'>Adicionar Localização</span>
								</div>
							</div>

							{hasLocation && (
								<span className='m-4'>
									<EventMap formMethods={formMethods} />
								</span>
							)}
						</div>
					</div>

					<Button type='submit' variant='default'>
						{isEditMode ? 'Salvar Alterações' : 'Criar Evento'}
					</Button>
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
