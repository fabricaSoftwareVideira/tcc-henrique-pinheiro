import { fetchCoursesService } from '@/services/course/fetchAllCoursesService';
import { useState, useEffect } from 'react';

export const useFetchCourses = (
	skip: number,
	take: number,
	searchTerm: string
): {
	data: CourseInterface[];
	loading: boolean;
	error: boolean;
	total: number;
} => {
	const [data, setData] = useState<CourseInterface[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { courses, total } = await fetchCoursesService(skip, take, searchTerm);
				setData(courses);
				setTotal(total);
				setError(false);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [skip, take, searchTerm]);

	return { data, loading, error, total };
};
