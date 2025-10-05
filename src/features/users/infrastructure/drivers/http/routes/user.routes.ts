import { Router } from 'express';
import { userController as defaultUserController } from '@/features/users/infrastructure/dependencies';
export function createUserRouter(userController: {
	register: (req: any, res: any, next: any) => Promise<void>;
}) {
	const router = Router();
	router.post('/register', userController.register.bind(userController));
	return router;
}

// default router using singleton (convenience)
const defaultRouter = createUserRouter(defaultUserController);
export default defaultRouter;
