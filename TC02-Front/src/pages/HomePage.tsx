import { Header } from '@/utils/Header';
import React from 'react';
import { HomePageButtons } from '@/utils/HomePageButtons';

export const HomePage: React.FC = () => {
	return (
		<>
			<div className='relative h-screen '>
				<Header />
				<div className='flex flex-col items-center justify-center h-full'>
					<div className='mb-12'>
						<h2>Gerenciador de Eventos</h2>
					</div>
					<HomePageButtons />
				</div>
			</div>
		</>
	);
};
