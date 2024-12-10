import { API_ROUTES } from '../../config/apiConfig';

export const fetchStatusOptions = async () => {
	try {
		const response = await fetch(API_ROUTES.FETCH_STATUS_OPTIONS, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.msg || 'Erro ao buscar as opções de status.');
		}

		return data;
	} catch (error) {
		throw error;
	}
};
