import { PrismaClient } from '@prisma/client';
import { StudentLoginDomain } from '../../domain/StudentLoginDomain';
import { AppError } from '../../utils/errors/AppError';

export interface IStudentLoginRepository {
	findStudentByCpf(studentCpf: string): Promise<StudentLoginDomain | undefined>;
	createStudentLogin(studentLogin: StudentLoginDomain): Promise<StudentLoginDomain>;
	updateAccessToken(studentLogin: StudentLoginDomain): Promise<void>;
}

export class StudentLoginRepository implements IStudentLoginRepository {
	private prismaClient: PrismaClient;

	constructor(prismaClient: PrismaClient) {
		this.prismaClient = prismaClient;
	}

	async findStudentByCpf(studentCpf: string): Promise<StudentLoginDomain | undefined> {
		try {
			const student = await this.prismaClient.studentLogin.findFirst({
				where: { studentCpf },
			});
			if (student) {
				return new StudentLoginDomain({
					studentLoginId: student.studentLoginId,
					createdAt: student.createdAt,
					updatedAt: student.updatedAt,
					accessToken: student.accessToken,
					accessTokenExpiration: student.accessTokenExpiration,
					studentCpf: student.studentCpf,
				});
			}
			return undefined;
		} catch (error) {
			console.error('Erro ao buscar login do aluno:', error);
			throw new AppError('Erro ao buscar aluno', 500);
		}
	}

	async createStudentLogin(
		studentLogin: StudentLoginDomain
	): Promise<StudentLoginDomain> {
		try {
			const createdStudentLogin = await this.prismaClient.studentLogin.create({
				data: {
					studentCpf: studentLogin.getStudentCpf(),
					accessToken: studentLogin.getAccessToken(),
					accessTokenExpiration: studentLogin.getAccessTokenExpiration(),
				},
			});
			return new StudentLoginDomain({
				studentLoginId: createdStudentLogin.studentLoginId,
				createdAt: createdStudentLogin.createdAt,
				updatedAt: createdStudentLogin.updatedAt,
				accessToken: createdStudentLogin.accessToken,
				accessTokenExpiration: createdStudentLogin.accessTokenExpiration,
				studentCpf: createdStudentLogin.studentCpf,
			});
		} catch (error) {
			console.error('Erro ao criar login do aluno:', error);

			throw new AppError('Erro ao criar login do aluno', 500);
		}
	}

	async updateAccessToken(studentLogin: StudentLoginDomain): Promise<void> {
		try {
			await this.prismaClient.studentLogin.update({
				where: { studentLoginId: studentLogin.getStudentLoginId() },
				data: {
					accessToken: studentLogin.getAccessToken(),
					accessTokenExpiration: studentLogin.getAccessTokenExpiration(),
				},
			});
		} catch (error) {
			throw new AppError('Erro ao atualizar token do aluno', 500);
		}
	}
}
