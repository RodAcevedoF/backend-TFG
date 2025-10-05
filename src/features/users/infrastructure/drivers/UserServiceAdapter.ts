import type { IUserService } from '@/features/users/domain/ports/drivers/IUser.service';
import type { UserDTO } from '@/features/users/domain/UserDto';
import { RegisterUseCase } from '@/features/users/app/usecases/RegisterUseCase';

export class UserServiceAdapter implements IUserService {
	constructor(private readonly registerUseCase: RegisterUseCase) {}

	async register(user: UserDTO): Promise<void> {
		return this.registerUseCase.execute(user);
	}
}
