import type { UserDTO } from '@/features/users/domain/UserDto';

export interface IUserService {
	register(user: UserDTO): Promise<void>;
}
