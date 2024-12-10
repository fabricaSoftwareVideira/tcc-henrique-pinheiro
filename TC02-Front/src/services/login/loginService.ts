import { API_ROUTES } from '../../config/apiConfig';
import { updateTokens } from './updateTokens';
import { UserInterface } from '@/interfaces/UserInterface';

export interface LoginResponseData {
	user: UserInterface;
	accessTokenExpiration: string;
}

export const login = async (
	userEmail: string,
	userPassword: string
): Promise<LoginResponseData> => {
	try {
		const response = await fetch(API_ROUTES.ADMIN_LOGIN, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userEmail, userPassword }),
			credentials: 'include',
		});

		if (!response.ok) {
			if (response.status === 401) {
				throw new Error('Credenciais inválidas');
			}
			throw new Error('Erro ao fazer login');
		}

		const data: LoginResponseData = await response.json();
		await updateTokens(data);
		return data;
	} catch (error) {
		throw error;
	}
};
