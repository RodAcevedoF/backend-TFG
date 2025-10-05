import type { NextFunction, Request, Response } from 'express';
import type { IUserService } from '@/features/users/domain/ports/drivers/IUser.service';

export class UserController {
	constructor(private readonly userService: IUserService) {}

	async register(
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		try {
			await this.userService.register(req.body);
			res.status(201).json({ message: 'User registered successfully' });
		} catch (error) {
			next(error);
		}
	}
}
