import { useState } from 'react';
import { editCourse } from '../../services/course/editCourseService';

export const useEditCourse = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleEditCourse = async (
		courseName: string,
		courseCoordinatorEmail: string,
		courseId: number
	) => {
		setError(null);
		try {
			const result = await editCourse(courseName, courseCoordinatorEmail, courseId);
			setData(result);
			setMessage('Curso Editado com sucesso!');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		}
	};

	return { handleEditCourse, error, data, message };
};
