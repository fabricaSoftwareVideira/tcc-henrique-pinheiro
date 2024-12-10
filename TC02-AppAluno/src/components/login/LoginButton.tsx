import React from 'react';
import useGovBrAuth from '../../hooks/useGovBrAuth';

export const LoginButton: React.FC = () => {
	const { redirectToGovBr } = useGovBrAuth();

	return (
		<button
			onClick={redirectToGovBr}
			className='bg-gray-100 border border-blue-200 py-2 px-6 rounded-full shadow-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-800 flex flex-row items-center space-x-2'>
			<span className='text-blue-800 font-medium text-lg'>Entrar com</span>
			<img src='/govbr-colorido-b.png' alt='gov.br' className='h-6 w-auto' />
		</button>
	);
};
