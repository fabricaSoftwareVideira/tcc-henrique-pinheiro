// import { isValidRequest } from '../../utils/validations/isValidRequest';
// import { createCourseTypes } from '../../@types/course/createCourseTypes';
// import { CreateCourseService } from '../../services/course/CreateCourseService';
// import { CourseDomain } from '../../domain/CourseDomain';
// import { Logger } from '../../loggers/Logger';
// import { courseLogPath } from '../../config/logPaths';
// import { AppError } from '../../utils/errors/AppError';

// export class CreateCourseController {
// 	private createCourseService: CreateCourseService;
// 	private logger: Logger;

// 	constructor(createCourseService) {
// 		this.createCourseService = createCourseService;
// 		this.logger = new Logger('CreateCourseController', courseLogPath);
// 		this.createCourse = this.createCourse.bind(this);
// 	}

// 	async createCourse(req, res) {
// 		try {
// 			const error = isValidRequest(req.body, createCourseTypes);
// 			if (typeof error === 'string') {
// 				this.logger.warn(error, req.requestEmail);
// 				return res.status(400).json({
// 					course: undefined,
// 					msg: error,
// 				});
// 			}

// 			const course = new CourseDomain({
// 				courseName: req.body.courseName,
// 				courseCoordinatorEmail: req.body.courseCoordinatorEmail,
// 			});

// 			const createdCourse = await this.createCourseService.execute(course);
// 			if (createdCourse) {
// 				this.logger.info(`Curso criado Id:${createdCourse.courseId}`, req.requestEmail);
// 				return res.status(201).json({
// 					course: createdCourse,
// 					msg: 'Curso criado com sucesso',
// 				});
// 			}
// 		} catch (error) {
// 			if (error instanceof AppError) {
// 				this.logger.error(error.message, req.requestEmail);
// 				return res.status(error.statusCode).json({
// 					course: undefined,
// 					msg: error.message,
// 				});
// 			}
// 			this.logger.error(
// 				`Erro ao criar curso, ID: ${req.body.courseId}`,
// 				req.requestEmail,
// 				error
// 			);
// 			return res.status(500).json({
// 				course: undefined,
// 				msg: 'Erro ao criar curso',
// 			});
// 		}
// 	}
// }
