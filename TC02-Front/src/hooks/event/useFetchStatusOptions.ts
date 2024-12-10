import { useState, useEffect } from 'react';
import { fetchStatusOptions } from '../../services/event/fetchStatusOptionsService';

export const useFetchStatusOptions = () => {
	const [data, setData] = useState<{ value: string; label: string }[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await fetchStatusOptions();

				const formattedData = result.status.map((status: string) => ({
					value: status,
					label: status
						.replace('_', ' ')
						.toLowerCase()
						.replace(/\b\w/g, (char) => char.toUpperCase()),
				}));

				setData(formattedData);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
				} else {
					setError('Erro desconhecido ao buscar as opções de status.');
					setData([]);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return { data, loading, error };
};
