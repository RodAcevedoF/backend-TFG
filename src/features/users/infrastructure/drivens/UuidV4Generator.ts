import { v4 as uuidv4 } from 'uuid';
import type { UuidGeneratorPort } from '@/features/users/domain/ports/drivens/GenerateUuid';

export class UuidV4Generator implements UuidGeneratorPort {
	generate(): string {
		return uuidv4();
	}
}
