import { useState } from 'react';
import {
	fetchAllEvents,
	FetchAllEventsResponse,
} from '../services/fetchAllEventsService';

export const useFetchAllEvents = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<FetchAllEventsResponse | null>(null);

	const handleFetchAllEvents = async (
		skip: number = 0,
		take: number = 10,
		searchTerm: string = ''
	) => {
		setLoading(true);
		setError(null);
		try {
			const response = await fetchAllEvents(skip, take, searchTerm);
			setData(response);
		} catch (err: any) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, error, data, handleFetchAllEvents };
};
