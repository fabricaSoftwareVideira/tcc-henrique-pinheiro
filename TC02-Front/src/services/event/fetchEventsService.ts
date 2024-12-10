import { API_ROUTES } from '../../config/apiConfig';

export const fetchEventsService = async (
	skip: number,
	take: number,
	searchTerm: string
) => {
	try {
		const response = await fetch(
			`${API_ROUTES.FETCH_ALL_EVENTS}?skip=${skip}&take=${take}&searchTerm=${searchTerm}`,
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

		return { events: data.events, total: data.total };
	} catch (error) {
		throw error;
	}
};
