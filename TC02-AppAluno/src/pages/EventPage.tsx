import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetEventById } from '../hooks/useGetEventById';
import { Header } from '../utils/Header';
import { EventActivity } from '@/interfaces/EventActivityInterface';
import { useCreateAttendance } from '../hooks/useCreateAttendance';
import { Button } from '@/components/ui/button';

export const EventPage: React.FC = () => {
	const { eventId: eventIdParam } = useParams<{ eventId: string }>();

	const eventId = eventIdParam ? Number(eventIdParam) : null;

	if (!eventId || isNaN(eventId)) {
		console.error('ID do evento inválido.');
		return <div>ID do evento inválido.</div>;
	}

	const { event, loading, error } = useGetEventById(eventId);
	const { handleCreateAttendance } = useCreateAttendance();

	const currentDate = new Date();

	const studentData = {
		studentCpf: localStorage.getItem('studentCpf') || '',
	};

	const [userLocation, setUserLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);

	const [attendanceLoading, setAttendanceLoading] = useState<{ [key: number]: boolean }>(
		{}
	);
	const [attendanceError, setAttendanceError] = useState<{ [key: number]: boolean }>({});
	const [attendanceSuccess, setAttendanceSuccess] = useState<{ [key: number]: boolean }>(
		{}
	);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setUserLocation({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					console.error('Erro ao obter localização do usuário:', error);
				}
			);
		} else {
			console.error('Geolocalização não é suportada pelo navegador.');
		}
	}, []);

	const handleAttendanceClick = async (activityId: number) => {
		if (userLocation) {
			setAttendanceLoading((prev) => ({ ...prev, [activityId]: true }));
			setAttendanceError((prev) => ({ ...prev, [activityId]: false }));
			setAttendanceSuccess((prev) => ({ ...prev, [activityId]: false }));

			try {
				await handleCreateAttendance({
					...studentData,
					eventActivityId: activityId,
					eventId,
					latitude: userLocation.latitude,
					longitude: userLocation.longitude,
				});
				setAttendanceSuccess((prev) => ({ ...prev, [activityId]: true }));
			} catch (error) {
				setAttendanceError((prev) => ({ ...prev, [activityId]: true }));
			} finally {
				setAttendanceLoading((prev) => ({ ...prev, [activityId]: false }));
			}
		} else {
			console.error('Localização do usuário não disponível.');
		}
	};

	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex flex-col items-center justify-center flex-grow p-4 sm:p-8'>
				<div className='w-full max-w-screen-lg mx-auto p-4'>
					{loading ? (
						<div>Carregando evento...</div>
					) : error ? (
						<div>Erro ao carregar evento: {error}</div>
					) : event ? (
						<div>
							<h1 className='text-3xl font-bold mb-6 text-center'>{event.eventTitle}</h1>
							<p>
								<strong>Início:</strong>{' '}
								{new Date(event.eventStartDate).toLocaleDateString()}
							</p>
							<p>
								<strong>Fim:</strong> {new Date(event.eventEndDate).toLocaleDateString()}
							</p>
							<h2 className='text-2xl mt-4 font-semibold'>Atividades</h2>
							{event.eventActivity && event.eventActivity.length > 0 ? (
								<ul>
									{event.eventActivity
										.filter(
											(activity: EventActivity) =>
												currentDate >= new Date(activity.eventActivityStartDate) &&
												currentDate <= new Date(activity.eventActivityEndDate)
										)
										.map((activity: EventActivity) => (
											<li
												key={activity.eventActivityId}
												className='mb-4 p-4 bg-gray-100 rounded shadow-md'>
												<div className='flex justify-between items-start'>
													<div>
														<h3 className='text-xl font-semibold'>
															{activity.eventActivityTitle}
														</h3>
														<p>{activity.eventActivityDescription}</p>
														<p>
															<strong>Início:</strong>{' '}
															{new Date(activity.eventActivityStartDate).toLocaleString()}
														</p>
														<p>
															<strong>Fim:</strong>{' '}
															{new Date(activity.eventActivityEndDate).toLocaleString()}
														</p>
													</div>
													<div className='flex flex-col items-end ml-4'>
														<Button
															onClick={() =>
																handleAttendanceClick(activity.eventActivityId)
															}
															disabled={attendanceLoading[activity.eventActivityId]}
															variant={'default'}>
															{attendanceLoading[activity.eventActivityId]
																? 'Validando...'
																: 'Validar Presença'}
														</Button>
														<div className='h-6 mt-2'>
															{attendanceError[activity.eventActivityId] && (
																<p className='text-red-500'>Erro ao validar presença.</p>
															)}
															{attendanceSuccess[activity.eventActivityId] && (
																<p className='text-green-500'>
																	Presença validada com sucesso!
																</p>
															)}
														</div>
													</div>
												</div>
											</li>
										))}
								</ul>
							) : (
								<p>Nenhuma atividade disponível.</p>
							)}
						</div>
					) : (
						<p>Evento não encontrado.</p>
					)}
				</div>
			</div>
		</div>
	);
};
