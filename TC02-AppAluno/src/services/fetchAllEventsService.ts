import { apiRoutes } from '../config/apiRoutes';

export interface FetchAllEventsResponse {
	total: number;
	events: any[];
	msg: string;
}

export const fetchAllEvents = async (
	skip: number = 0,
	take: number = 10,
	searchTerm: string = ''
): Promise<FetchAllEventsResponse> => {
	try {
		const response = await fetch(
			`${apiRoutes.fetchAllEvents.replace(
				/\/$/,
				''
			)}?skip=${skip}&take=${take}&searchTerm=${encodeURIComponent(searchTerm)}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.msg || 'Erro ao buscar eventos. Tente novamente.');
		}

		const data: FetchAllEventsResponse = await response.json();
		return data;
	} catch (error: any) {
		throw new Error(error.message || 'Erro ao buscar eventos. Tente novamente.');
	}
};
