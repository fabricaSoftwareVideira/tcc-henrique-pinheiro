import { API_ROUTES } from '../../config/apiConfig';

export const createEvent = async (values: EventInterface) => {
	try {
		const response = await fetch(API_ROUTES.CREATE_EVENT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
			credentials: 'include',
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.msg || 'Erro ao criar evento.');
		}

		return data;
	} catch (error) {
		throw error;
	}
};
