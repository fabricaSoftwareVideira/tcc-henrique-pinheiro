import { z } from 'zod';

export const userFormSchema = z.object({
	userEmail: z.string().email({
		message: 'Email Inválido',
	}),
	userPassword: z.string().min(8, {
		message: 'Senha muito curta',
	}),
	userName: z.string(),
	roleId: z.number(),
	roleTitle: z.string().min(2),
});
