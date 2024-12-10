import { API_ROUTES } from '../../config/apiConfig';

export const issueReport = async (eventId: number) => {
	try {
		const response = await fetch(API_ROUTES.ISSUE_REPORT, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				eventId,
			}),
			credentials: 'include',
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Erro ao gerar relatório, Resposta: ${error}`);
	}
};
