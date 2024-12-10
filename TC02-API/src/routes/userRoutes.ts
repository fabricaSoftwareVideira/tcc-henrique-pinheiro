import { Router } from 'express';
import { CreateUserController } from '../controllers/user/CreateUserController';
import { CreateUserService } from '../services/user/CreateUserService';
import { UserRepository } from '../repository/implementation/UserRepository';
import { Prisma, PrismaClient } from '@prisma/client';
import { RoleRepository } from '../repository/implementation/RoleRepository';
import { LoginUserService } from '../services/user/LoginUserService';
import { LoginUserController } from '../controllers/user/LoginUserController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { roleMiddleware } from '../middlewares/roleMiddleware';
import { userRoles } from '../config/roles/user/userRoles';
import { FetchAllUsersService } from '../services/user/FetchAllUsersService';
import { FetchAllUsersController } from '../controllers/user/FetchAllUsersController';

export const userRouter = Router();

const prismaClient = new PrismaClient();

const userRepository = new UserRepository(new PrismaClient());

const roleRepository = new RoleRepository(prismaClient);

const createUserService = new CreateUserService(userRepository, roleRepository);
const createUserController = new CreateUserController(createUserService);

const loginUserService = new LoginUserService(userRepository);
const loginUserController = new LoginUserController(loginUserService);

const fetchUsersService = new FetchAllUsersService(userRepository);
const fetchUserController = new FetchAllUsersController(fetchUsersService);

userRouter.post(
	'/createUser',
	authMiddleware,
	roleMiddleware(userRoles.CREATE_USER_ROLES),
	createUserController.createUser
);

userRouter.post('/loginUser', loginUserController.loginUser);

userRouter.get(
	'/fetchAllUsers',
	authMiddleware,
	roleMiddleware(userRoles.FETCH_ALL_USERS_ROLES),
	fetchUserController.fetchAllUsers
);
