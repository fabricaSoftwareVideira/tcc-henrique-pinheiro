import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { courseFormSchema } from '@/@types/course/courseFormSchema';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { CourseForm } from '@/components/forms/CourseForm';
import { useEditCourse } from '@/hooks/course/useEditCourse';
import { useGetCourseById } from '@/hooks/course/useGetCourseById';

export const EditCoursePage: React.FC = () => {
	const { courseId } = useParams<{ courseId: string }>();
	const id = Number(courseId);
	const { handleEditCourse, error, data, message } = useEditCourse();
	const navigate = useNavigate();
	const formMethods = useForm<z.infer<typeof courseFormSchema>>({
		resolver: zodResolver(courseFormSchema),
	});

	const { course, isLoading, error: fetchError } = useGetCourseById(id);
	useEffect(() => {
		if (course) {
			formMethods.reset({
				coordinatorEmail: course.courseCoordinatorEmail,
				courseName: course.courseName,
				courseId: course.courseId,
			});
		}
	}, [course, formMethods]);

	const onSubmit = async (values: z.infer<typeof courseFormSchema>) => {
		await handleEditCourse(values.courseName, values.coordinatorEmail, values.courseId);
		if (data) {
			formMethods.reset();
			navigate('/cursos');
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (fetchError || !course) {
		return <div>Course not found</div>;
	}

	return (
		<div className='flex flex-col items-center justify-start min-h-screen'>
			<Header />
			<div className='flex items-center justify-center h-screen'>
				<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-white'>
					<h2 className='my-5 text-center'>Editar Curso</h2>
					<CourseForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditCoursePage;
