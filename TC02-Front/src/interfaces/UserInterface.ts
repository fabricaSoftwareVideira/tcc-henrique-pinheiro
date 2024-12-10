import { RoleInterface } from './RoleInterface';

export interface UserInterface {
	userId: number;
	userName: string;
	userEmail: string;
	systemStatus: string;
	createdAt: string;
	updatedAt: string;
	userPassword: string;
	role: RoleInterface;
}
