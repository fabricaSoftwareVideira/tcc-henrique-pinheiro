import { API_ROUTES } from '../../config/apiConfig';

export const fetchRolesService = async () => {
	try {
		const response = await fetch(API_ROUTES.FETCH_ALL_ROLES, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
		});

		const res = await response.json();

		if (!response.ok || !res.msg) {
			throw new Error(res.msg);
		}

		return res.roles;
	} catch (error) {
		throw error;
	}
};
