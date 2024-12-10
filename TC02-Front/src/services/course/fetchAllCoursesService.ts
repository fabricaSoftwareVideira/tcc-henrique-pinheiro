import { API_ROUTES } from '../../config/apiConfig';

export const fetchCoursesService = async (
	skip: number,
	take: number,
	searchTerm: string
) => {
	try {
		const response = await fetch(
			`${API_ROUTES.FETCH_ALL_COURSES}?skip=${skip}&take=${take}&searchTerm=${searchTerm}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		);
		if (!response.ok) {
			throw new Error('Erro na requisição');
		}
		const data = await response.json();

		return { courses: data.courses, total: data.total };
	} catch (error) {
		throw error;
	}
};
