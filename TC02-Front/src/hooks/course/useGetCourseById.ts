import { useState, useEffect } from 'react';
import { getCourseById } from '../../services/course/getCourseByIdService';

export const useGetCourseById = (courseId: number) => {
	const [course, setCourse] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchCourse = async () => {
			try {
				const response = await getCourseById(courseId);
				if (response && response.course) {
					setCourse(response.course);
				} else {
					setError('Course not found');
				}
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Erro desconhecido');
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (courseId) {
			fetchCourse();
		}
	}, [courseId]);

	return { course, isLoading, error };
};
