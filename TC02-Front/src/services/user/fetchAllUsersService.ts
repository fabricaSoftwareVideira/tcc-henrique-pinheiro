import { API_ROUTES } from '../../config/apiConfig';

export const fetchUsersService = async (
	skip: number,
	take: number,
	searchTerm: string
) => {
	try {
		const response = await fetch(
			`${API_ROUTES.FETCH_ALL_USERS}?skip=${skip}&take=${take}&searchTerm=${searchTerm}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
			}
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.msg);
		}
		return { users: data.users, total: data.total };
	} catch (error) {
		throw error;
	}
};
