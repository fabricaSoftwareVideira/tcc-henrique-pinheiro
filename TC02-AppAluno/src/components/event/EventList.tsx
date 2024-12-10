import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Event } from '@/interfaces/EventInterface';
import { useFetchAllEvents } from '@/hooks/useFetchAllEvents';
import { Button } from '../ui/button';

const EventList: React.FC = () => {
	const { loading, error, data, handleFetchAllEvents } = useFetchAllEvents();
	const navigate = useNavigate();

	useEffect(() => {
		handleFetchAllEvents();
	}, []);

	if (loading) {
		return <div>Carregando eventos...</div>;
	}

	if (error) {
		return <div>Erro ao carregar eventos: {error}</div>;
	}

	const currentDate = new Date();

	return (
		<div>
			<h3 className='text-2xl sm:text-3xl font-bold text-center mb-8'>Eventos Atuais</h3>
			{data && data.events.length > 0 ? (
				<ul>
					{data.events
						.filter(
							(event: Event) =>
								currentDate >= new Date(event.eventStartDate) &&
								currentDate <= new Date(event.eventEndDate)
						)
						.map((event: Event) => (
							<li
								key={event.eventId}
								className='mb-4 p-4 bg-gray-100 rounded shadow-md flex items-center justify-between'>
								<div>
									<h4 className='text-xl font-bold mb-2'>{event.eventTitle}</h4>
									<p>
										<strong>Início:</strong>{' '}
										{new Date(event.eventStartDate).toLocaleDateString()}
									</p>
									<p>
										<strong>Fim:</strong>{' '}
										{new Date(event.eventEndDate).toLocaleDateString()}
									</p>
								</div>
								<Button
									onClick={() => navigate(`/evento/${event.eventId}`)}
									variant='default'
									className='flex items-center bg-green-600 text-white hover:bg-gray-800 rounded-md px-4 py-2'>
									Ver Atividades
								</Button>
							</li>
						))}
				</ul>
			) : (
				<div>Nenhum evento disponível no momento.</div>
			)}
		</div>
	);
};

export default EventList;
