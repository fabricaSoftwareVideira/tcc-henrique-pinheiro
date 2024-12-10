import { API_ROUTES } from '@/config/apiConfig';
export const editEvent = async (eventId: number, eventData: any) => {
	try {
		eventData.eventId = eventId;
		const response = await fetch(`${API_ROUTES.EDIT_EVENT}/${eventId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(eventData),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const result = await response.json();
		return result;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Erro ao editar evento, Resposta: ${error.message}`);
		}
	}
};
