import { UserEmail } from './email-objects';

export class User {
	public id: string;
	public name: string;
	public email: UserEmail;
	public password: string;

	constructor(id: string, name: string, email: UserEmail, password: string) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
	}
}
