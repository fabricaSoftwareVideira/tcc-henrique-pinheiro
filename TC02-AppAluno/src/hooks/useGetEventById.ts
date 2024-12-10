import { useState, useEffect } from 'react';
import { getEventById } from '../services/getEventByIdService';
import { Event } from '@/interfaces/EventInterface';

export const useGetEventById = (eventId: number) => {
	const [event, setEvent] = useState<Event | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchEvent = async () => {
			setLoading(true);
			try {
				const eventData = await getEventById(eventId);
				setEvent(eventData.event);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				}
			} finally {
				setLoading(false);
			}
		};

		if (eventId) {
			fetchEvent();
		}
	}, [eventId]);

	return { event, loading, error };
};
