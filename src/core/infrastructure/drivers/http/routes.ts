import type { Express } from 'express';
import { createUserRouter } from '@/features/users/infrastructure/drivers/http/routes/user.routes';
import { makeUserDependencies } from '@/features/users/infrastructure/dependencies';

export function registerRoutes(app: Express) {
	const deps = makeUserDependencies();
	app.use('/users', createUserRouter(deps.userController));
}

export default registerRoutes;
