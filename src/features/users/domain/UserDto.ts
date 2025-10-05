export interface UserDTO {
	name: string;
	email: string;
	password: string;
}

export interface UpdatedUserDTO {
	id: string;
	name?: string;
	email?: string;
	password?: string;
}
