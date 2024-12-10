import { useState } from 'react';
import { createUser } from '../../services/user/createUserService';

export const useCreateUser = () => {
	const [error, setError] = useState<string | null>(null);
	const [data, setData] = useState<any>(null);
	const [message, setMessage] = useState<string | null>(null);

	const handleCreateUser = async (
		userName: string,
		userEmail: string,
		userPassword: string,
		userRoleId: number,
		userRoleTitle: string
	) => {
		setError(null);
		try {
			const result = await createUser(
				userName,
				userEmail,
				userPassword,
				userRoleId,
				userRoleTitle
			);
			setData(result);
			setMessage('Usuário Criado com sucesso!');
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Erro desconhecido');
			}
		}
	};

	return { handleCreateUser, error, data, message };
};
