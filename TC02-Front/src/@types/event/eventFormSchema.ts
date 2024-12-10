import { z } from 'zod';

export const eventActivitySchema = z
	.object({
		eventActivityTitle: z.string().min(2),
		eventActivityStartDate: z
			.string()
			.min(1, { message: 'A data de início é obrigatória.' }),
		eventActivityEndDate: z.string().min(1, { message: 'A data de fim é obrigatória.' }),
		eventActivityDescription: z
			.string()
			.min(1, { message: 'A descrição é obrigatória.' }),
	})
	.refine(
		(data) => new Date(data.eventActivityEndDate) > new Date(data.eventActivityStartDate),
		{
			message: 'A data de fim deve ser maior que a data de início.',
			path: ['eventActivityEndDate'],
		}
	);

export const eventFormSchema = z
	.object({
		eventTitle: z
			.string()
			.min(2, { message: 'O título do evento deve ter pelo menos 2 caracteres.' }),
		eventStartDate: z.string(),
		eventEndDate: z.string(),
		selectedCourses: z
			.array(
				z.object({
					courseId: z
						.number()
						.nonnegative({ message: 'O ID do curso deve ser um número positivo.' }),
					courseName: z.string().min(1, { message: 'O nome do curso é obrigatório.' }),
				})
			)
			.min(1, { message: 'Deve haver pelo menos um curso permitido para o evento.' }),

		eventStatus: z.string().optional(),
		eventActivities: z.array(eventActivitySchema),
		eventLatitude: z.number().min(-90).max(90).optional(),
		eventLongitude: z.number().min(-180).max(180).optional(),
		eventRadius: z.number().min(0).optional(),
	})
	.refine((data) => new Date(data.eventEndDate) > new Date(data.eventStartDate), {
		message: 'A data de fim deve ser maior que a data de início.',
		path: ['eventEndDate'],
	});
