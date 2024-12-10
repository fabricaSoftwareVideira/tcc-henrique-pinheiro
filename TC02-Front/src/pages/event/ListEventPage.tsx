import React from 'react';
import { EventTable } from '../../components/tables/events/EventTable';
import { Header } from '@/utils/Header';

const ListEventsPage: React.FC = () => {
	return (
		<div className='flex flex-col items-center justify-start min-h-screen'>
			<Header />
			<h2 className='mt-24 text-center'>Eventos</h2>
			<EventTable />
		</div>
	);
};

export default ListEventsPage;
