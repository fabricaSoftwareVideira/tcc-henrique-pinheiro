import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { apiRoutes } from '@/config/apiRoutes';

const useGovBrAuth = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { setStudentCpf } = useAuth();
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	useEffect(() => {
		const authenticate = async () => {
			const queryParams = new URLSearchParams(location.search);
			const code = queryParams.get('code');

			if (code && !isAuthenticating) {
				setIsAuthenticating(true); // Iniciando o processo de autenticação
				try {
					const response = await fetch(`${apiRoutes.getGovbrToken}`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ code }),
					});

					if (response.ok) {
						const data = await response.json();
						if (data.studentCpf) {
							setStudentCpf(data.studentCpf);
							navigate('/', { replace: true });
						} else {
							console.error('studentCpf not found in response data.');
							navigate('/login', { replace: true });
						}
					} else {
						navigate('/login', { replace: true });
					}
				} catch (error) {
					console.error('Erro na requisição ao backend:', error);
					navigate('/login', { replace: true });
				} finally {
					setIsAuthenticating(false);
				}
			} else {
				console.log('No code found in URL.');
			}
		};

		authenticate();
	}, [location.search, setStudentCpf, navigate, isAuthenticating]);
};

export default useGovBrAuth;
