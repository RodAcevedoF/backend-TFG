import type { IUserRepository } from '@/features/users/domain/ports/drivens/IUserRepository';
import { User } from '@/features/users/domain/User';
import { UserEmail } from '@/features/users/domain/email-objects';
import type { UpdatedUserDTO } from '@/features/users/domain/UserDto';

export class UserRepositoryInMemory implements IUserRepository {
	private users: User[] = [
		{
			id: '1',
			name: 'John Doe',
			email: new UserEmail('john@doe.com'),
			password: 'hashed_password',
		},
	];

	async save(user: User): Promise<void> {
		this.users.push(user);
	}

	async findById(id: string): Promise<User | null> {
		return this.users.find((u) => u.id === id) ?? null;
	}

	async findByEmail(email: string): Promise<User | null> {
		return this.users.find((u) => u.email.value === email) ?? null;
	}

	async delete(id: string): Promise<void> {
		this.users = this.users.filter((u) => u.id !== id);
	}

	async update(user: UpdatedUserDTO): Promise<void> {
		const idx = this.users.findIndex((u) => u.id === user.id);
		if (idx === -1) return;
		const current = this.users[idx]!;
		const name = user.name ?? current.name;
		const password = user.password ?? current.password;
		const email = user.email ? new UserEmail(user.email) : current.email;

		this.users[idx] = new User(current.id, name, email, password);
	}
}
