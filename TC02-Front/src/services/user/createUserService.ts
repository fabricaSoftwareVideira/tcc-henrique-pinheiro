import { API_ROUTES } from '../../config/apiConfig';

export const createUser = async (
	userName: string,
	userEmail: string,
	userPassword: string,
	roleId: number,
	roleTitle: string
) => {
	try {
		const response = await fetch(API_ROUTES.CREATE_USER, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userName,
				userEmail,
				userPassword,
				roleId,
				roleTitle,
			}),
			credentials: 'include',
		});
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.msg);
		}

		return data;
	} catch (error) {
		throw error;
	}
};
