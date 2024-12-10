import { API_ROUTES } from '@/config/apiConfig';

export const getEventByIdService = async (eventId: number) => {
	try {
		const response = await fetch(`${API_ROUTES.GET_EVENT_BY_ID}/${eventId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error('Falha ao buscar evento');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Erro ao buscar evento: ${error.message}`);
		}
	}
};
