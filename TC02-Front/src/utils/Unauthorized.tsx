import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { DefaultWarning } from './DefaultWarning';

export const Unauthorized: React.FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate('/home');
		}, 3000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div>
			<Header />
			<DefaultWarning message='Sem autorização para acessar este recurso. Redirecionando...' />
		</div>
	);
};
