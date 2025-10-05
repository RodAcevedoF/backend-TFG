import bcrypt from 'bcryptjs';
import type { HashPasswordPort } from '@/features/users/domain/ports/drivens/HashPassword';

export class BcryptPasswordHasher implements HashPasswordPort {
	async hash(password: string): Promise<string> {
		return bcrypt.hash(password, 10);
	}

	async compare(password: string, hash: string): Promise<boolean> {
		return bcrypt.compare(password, hash);
	}
}
