import { API_ROUTES } from '../../config/apiConfig';

export const getCourseById = async (courseId: number) => {
	try {
		const response = await fetch(`${API_ROUTES.GET_COURSE_BY_ID}/${courseId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error(`Erro ao buscar curso, Resposta HTTP: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Erro ao buscar curso: ${error}`);
	}
};
