// import { isValidRequest } from '../../utils/validations/isValidRequest';
// import { editCourseTypes } from '../../@types/course/editCourseTypes';
// import { EditCourseService } from '../../services/course/EditCourseService';
// import { CourseDomain } from '../../domain/CourseDomain';
// import { Logger } from '../../loggers/Logger';
// import { courseLogPath } from '../../config/logPaths';
// import { AppError } from '../../utils/errors/AppError';

// export class EditCourseController {
// 	private editCourseService: EditCourseService;
// 	private logger: Logger;

// 	constructor(editCourseService) {
// 		this.editCourseService = editCourseService;
// 		this.logger = new Logger('EditCourseController', courseLogPath);
// 		this.editCourse = this.editCourse.bind(this);
// 	}

// 	async editCourse(req, res) {
// 		try {
// 			const error = isValidRequest(req.body, editCourseTypes);
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
// 				courseId: req.body.courseId,
// 			});

// 			const editedCourse = await this.editCourseService.execute(course);
// 			if (editedCourse) {
// 				this.logger.info(`Curso editado, Id:${editedCourse.courseId}`, req.requestEmail);
// 				return res.status(200).json({
// 					course: editedCourse,
// 					msg: 'Curso editado com sucesso',
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
// 				`Erro ao editar curso, ID:${req.body.courseId}`,
// 				req.requestEmail,
// 				error
// 			);
// 			return res.status(500).json({
// 				course: undefined,
// 				msg: 'Erro ao editar curso',
// 			});
// 		}
// 	}
// }
