import React from 'react';
import { LoginButton } from '../components/login/LoginButton';

export const LoginPage: React.FC = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-gray-100'>
			<div className='bg-white p-8 rounded-lg shadow-lg flex flex-col items-center'>
				<h1 className='text-2xl font-semibold text-gray-800 mb-6'>Login</h1>
				<LoginButton />
			</div>
		</div>
	);
};
