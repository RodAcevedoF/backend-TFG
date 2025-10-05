import type { User } from '@/features/users/domain/User';
import type { UpdatedUserDTO } from '@/features/users/domain/UserDto';

export interface IUserRepository {
	save(user: User): Promise<void>;
	findById(id: string): Promise<User | null>;
	findByEmail(email: string): Promise<User | null>;
	update(user: UpdatedUserDTO): Promise<void>;
	delete(id: string): Promise<void>;
}
