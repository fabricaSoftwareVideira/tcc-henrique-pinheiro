import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { eventFormSchema } from '@/@types/event/eventFormSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../utils/Header';
import { EventForm } from '@/components/forms/EventForm';
import { useEditEvent } from '../../hooks/event/useEditPage';
import { useGetEventById } from '@/hooks/event/useGetEventById';
import { useFetchCourses } from '@/hooks/course/useFetchCourses';
import { useFetchStatusOptions } from '@/hooks/event/useFetchStatusOptions';
import { statusMapping } from '@/utils/EventStatusMapping';

interface EventCourse {
	eventId: number;
	courseId: number;
	courseName: string;
}

interface EventActivity {
	eventActivityId: number;
	eventActivityTitle: string;
	eventActivityDescription: string;
	eventActivityStartDate: string;
	eventActivityEndDate: string;
	eventId: number;
	createdAt: string;
	updatedAt: string;
}

export const EditEventPage: React.FC = () => {
	const { eventId } = useParams<{ eventId: string }>();
	const navigate = useNavigate();
	const { handleEditEvent, error, data, message } = useEditEvent();
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const formMethods = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
	});

	const { event, error: eventError } = useGetEventById(Number(eventId));
	const { data: courses } = useFetchCourses(0, 0, '');
	const { data: statusOptions } = useFetchStatusOptions();

	useEffect(() => {
		if (event?.event && courses && statusOptions) {
			const selectedCourses = event.event.eventCourse.map((ec: EventCourse) => ({
				courseId: ec.courseId,
				courseName: ec.courseName,
			}));
			const formattedActivities = event.event.eventActivity.map(
				(activity: EventActivity) => ({
					...activity,
					eventActivityStartDate: formatDateForInput(activity.eventActivityStartDate),
					eventActivityEndDate: formatDateForInput(activity.eventActivityEndDate),
				})
			);

			formMethods.setValue('eventTitle', event.event.eventTitle || '');
			formMethods.setValue(
				'eventStartDate',
				formatDateForInput(event.event.eventStartDate || '')
			);
			const eventLocation = event.event.eventLocation;
			formMethods.setValue('eventLatitude', eventLocation ? eventLocation.latitude : 0);
			formMethods.setValue('eventLongitude', eventLocation ? eventLocation.longitude : 0);
			formMethods.setValue('eventRadius', eventLocation ? eventLocation.radius : 0);
			formMethods.setValue(
				'eventEndDate',
				formatDateForInput(event.event.eventEndDate || '')
			);

			const mappedStatus = statusMapping[event.event.eventStatus];

			const matchingStatusOption = statusOptions.find(
				(option) => option.label === mappedStatus
			);

			if (matchingStatusOption) {
				formMethods.setValue('eventStatus', matchingStatusOption.value);
			} else {
			}

			formMethods.setValue('selectedCourses', selectedCourses);
			formMethods.setValue('eventActivities', formattedActivities);

			setIsLoading(false);
		} else if (eventError) {
			setIsLoading(false);
		}
	}, [event, eventError, formMethods, navigate, courses, statusOptions]);

	const onSubmit = async (values: z.infer<typeof eventFormSchema>) => {
		if (eventId) {
			const result = await handleEditEvent(Number(eventId), values);

			if (!result?.error) {
				formMethods.reset();
				navigate('/eventos');
			} else {
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<div className='flex items-center justify-center min-h-screen mt-24 mb-12'>
				<div className='w-full max-w-7xl p-8 rounded shadow-lg bg-card text-card-foreground mx-8'>
					<h2 className='my-5 text-center'>Editar Evento</h2>
					<EventForm
						formMethods={formMethods}
						onSubmit={onSubmit}
						error={error}
						data={data}
						message={message}
						statusOptions={statusOptions}
						courses={courses}
						selectedCourses={formMethods.getValues('selectedCourses')}
						isEditMode={true}
					/>
				</div>
			</div>
		</>
	);
};

const formatDateForInput = (dateString: string): string => {
	const date = new Date(dateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');

	return `${year}-${month}-${day}T${hours}:${minutes}`;
};
