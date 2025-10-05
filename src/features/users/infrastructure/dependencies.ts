import { UserRepositoryInMemory } from './drivens/UserRepository-InMemory';
import { BcryptPasswordHasher } from './drivens/BcrypPasswordHasher';
import { UuidV4Generator } from './drivens/UuidV4Generator';
import { RegisterUseCase } from '@/features/users/app/usecases/RegisterUseCase';
import { UserServiceAdapter } from './drivers/UserServiceAdapter';
import { UserController } from './drivers/http/controllers/user.controller';

import type { IUserRepository } from '@/features/users/domain/ports/drivens/IUserRepository';
import type { HashPasswordPort } from '@/features/users/domain/ports/drivens/HashPassword';
import type { UuidGeneratorPort } from '@/features/users/domain/ports/drivens/GenerateUuid';

export type UserDependencies = {
	userRepository: IUserRepository;
	passwordHasher: HashPasswordPort;
	uuidGenerator: UuidGeneratorPort;
	registerUseCase: RegisterUseCase;
	userService: UserServiceAdapter;
	userController: UserController;
};

export function makeUserDependencies(
	overrides?: Partial<{
		userRepository: IUserRepository;
		passwordHasher: HashPasswordPort;
		uuidGenerator: UuidGeneratorPort;
	}>,
): UserDependencies {
	// create drivens (use overrides when provided)
	const userRepository: IUserRepository =
		overrides?.userRepository ?? new UserRepositoryInMemory();
	const passwordHasher: HashPasswordPort =
		overrides?.passwordHasher ?? new BcryptPasswordHasher();
	const uuidGenerator: UuidGeneratorPort =
		overrides?.uuidGenerator ?? new UuidV4Generator();

	// application
	const registerUseCase = new RegisterUseCase(
		userRepository,
		uuidGenerator,
		passwordHasher,
	);

	// drivers
	const userService = new UserServiceAdapter(registerUseCase);
	const userController = new UserController(userService);

	return {
		userRepository,
		passwordHasher,
		uuidGenerator,
		registerUseCase,
		userService,
		userController,
	};
}

// Default singleton for convenience/backward compatibility
export const defaultUserDependencies = makeUserDependencies();
export const userController = defaultUserDependencies.userController;
