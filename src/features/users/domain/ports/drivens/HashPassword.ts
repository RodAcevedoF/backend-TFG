export interface HashPasswordPort {
	hash(password: string): Promise<string>;
	compare(password: string, hash: string): Promise<boolean>;
}
