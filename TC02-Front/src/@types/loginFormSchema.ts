import { z } from 'zod';

export const loginFormSchema = z.object({
	email: z.string().email({
		message: 'Email Inválido',
	}),
	password: z.string().min(8, {
		message: 'Senha muito curta',
	}),
});
