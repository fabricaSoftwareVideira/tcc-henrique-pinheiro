import React from 'react';
import { LoginForm } from '@/components/forms/LoginForm';

export const LoginPage: React.FC = () => {
	return (
		<div className='flex items-center justify-center h-screen'>
			<div className='w-full max-w-md mx-auto p-8 rounded shadow-lg bg-card text-card-foreground'>
				<h2 className='my-5 text-center'>Login</h2>
				<LoginForm />
			</div>
		</div>
	);
};
