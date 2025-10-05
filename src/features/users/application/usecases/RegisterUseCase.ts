import type { IUserRepository } from '@/features/users/domain/ports/drivens/IUserRepository';
import type { UuidGeneratorPort } from '@/features/users/domain/ports/drivens/GenerateUuid';
import type { HashPasswordPort } from '@/features/users/domain/ports/drivens/HashPassword';
import { UserEmail } from '@/features/users/domain/email-objects';
import { User } from '@/features/users/domain/User';
import type { UserDTO } from '@/features/users/domain/UserDto';

export class RegisterUseCase {
	constructor(
		private readonly userRepository: IUserRepository,
		private readonly uuidGenerator: UuidGeneratorPort,
		private readonly hashPassword: HashPasswordPort,
	) {}

	async execute(userData: UserDTO): Promise<void> {
		const existingUser = await this.userRepository.findByEmail(userData.email);
		if (existingUser) {
			throw new Error('User with this email already exists');
		}

		const emailObject = new UserEmail(userData.email);
		const id = this.uuidGenerator.generate();
		const hashedPassword = await this.hashPassword.hash(userData.password);

		const user = new User(id, userData.name, emailObject, hashedPassword);

		await this.userRepository.save(user);
	}
}
