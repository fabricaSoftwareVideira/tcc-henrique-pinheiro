import { fetchEventsService } from '@/services/event/fetchEventsService';
import { useState, useEffect } from 'react';
import { Event } from '../../components/tables/events/EventTableColumns';

export const useFetchEvents = (
	skip: number,
	take: number,
	searchTerm: string
): {
	data: Event[];
	loading: boolean;
	error: boolean;
	total: number;
} => {
	const [data, setData] = useState<Event[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { events, total } = await fetchEventsService(skip, take, searchTerm);
				setData(events);
				setTotal(total);
				setError(false);
			} catch (error) {
				setError(true);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [skip, take, searchTerm]);

	return { data, loading, error, total };
};
