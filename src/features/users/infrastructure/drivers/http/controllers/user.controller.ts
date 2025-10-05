import type { NextFunction, Request, Response } from 'express';
import { RegisterUseCase } from '@/features/users/application/usecases/RegisterUseCase';

export class UserController {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			await this.registerUseCase.execute(req.body);
			res.status(201).json({ message: 'User registered successfully' });
		} catch (error) {
			next(error);
		}
	}
}
