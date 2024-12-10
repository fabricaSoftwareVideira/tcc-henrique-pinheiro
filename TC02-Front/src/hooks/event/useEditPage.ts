import { useState } from 'react';
import { editEvent } from '../../services/event/editEventService';

interface EditEventResult {
	success: boolean;
	data?: any;
	message?: string;
	error?: string;
}

export const useEditEvent = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleEditEvent = async (
		eventId: number,
		eventData: any
	): Promise<EditEventResult> => {
		setError(null);
		try {
			const result = await editEvent(eventId, eventData);
			setData(result);
			setMessage('Evento editado com sucesso!');
			return {
				success: true,
				data: result,
				message: 'Evento editado com sucesso!',
			};
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
				return {
					success: false,
					error: err.message,
				};
			} else {
				const unknownError = 'Erro desconhecido';
				setError(unknownError);
				return {
					success: false,
					error: unknownError,
				};
			}
		}
	};

	return { handleEditEvent, error, data, message };
};
