import React from 'react';
import { Header } from '../utils/Header';
import useGovBrAuth from '../hooks/useGovBrAuthToken';

const HomePage: React.FC = () => {
	useGovBrAuth();
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<p>Autenticando, por favor aguarde...</p>
			</div>
		</div>
	);
};

export default HomePage;
