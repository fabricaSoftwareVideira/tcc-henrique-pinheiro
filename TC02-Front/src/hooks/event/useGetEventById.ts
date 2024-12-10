import { useEffect, useState } from 'react';
import { getEventByIdService } from '../../services/event/getEventByIdService';
import { useNavigate } from 'react-router-dom';

export const useGetEventById = (eventId: number) => {
	const [event, setEvent] = useState<any | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEvent = async () => {
			try {
				const data = await getEventByIdService(eventId);
				setEvent(data);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			} finally {
				setIsLoading(false);
			}
		};

		if (eventId) {
			fetchEvent();
		}
	}, [eventId, navigate]);

	return { event, isLoading, error };
};
