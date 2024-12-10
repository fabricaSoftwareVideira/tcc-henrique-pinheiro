import { apiRoutes } from '@/config/apiRoutes';

export const getEventById = async (eventId: number) => {
	try {
		const response = await fetch(`${apiRoutes.getEventByIdStudent}/${eventId}`, {
			method: 'GET',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.msg || 'Erro ao buscar o evento');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Erro ao buscar o evento por ID:', error);
		if (error instanceof Error) {
			throw new Error(error.message || 'Erro ao buscar o evento');
		}
	}
};
