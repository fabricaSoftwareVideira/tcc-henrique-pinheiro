import { IEventRepository } from '../../repository/interfaces/IEventRepository';
import { EventDomain } from '../../domain/EventDomain';
import { Event } from '@prisma/client';
import { AppError } from '../../utils/errors/AppError';
import { EventCourseDomain } from '../../domain/EventCourseDomain';

export class CreateEventService {
	private eventRepository: IEventRepository;

	constructor(repository: IEventRepository) {
		this.eventRepository = repository;
	}

	async execute(event: EventDomain, courses: EventCourseDomain[]): Promise<Event> {
		let createdEvent;
		try {
			if (event.getEventEndDate() < new Date()) {
				throw new AppError('Data Final do Evento menor do que Data Atual', 400);
			}
			if (courses.length < 1) {
				throw new AppError('Nenhum Curso Informado', 400);
			}

			if (!event.getEventLocation()) {
				createdEvent = await this.eventRepository.createEvent(event, courses);
			} else {
				createdEvent = await this.eventRepository.createEventWithLocation(event, courses);
			}

			if (!createdEvent) {
				throw new AppError('Erro ao Cadastrar Evento', 500);
			}
			return createdEvent;
		} catch (error) {
			throw error;
		}
	}
}
