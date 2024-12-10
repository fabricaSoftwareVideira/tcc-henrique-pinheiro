import { LoginResponseData } from './loginService';

export const updateTokens = async (response: LoginResponseData) => {
	try {
		const accessTokenExpiration = response.accessTokenExpiration;

		localStorage.setItem(
			'accessTokenExpiresAt',
			new Date(accessTokenExpiration).toString()
		);
	} catch (error) {
		throw error;
	}
};
