import express, { type Request, type Response } from 'express';
import registerRoutes from '@/core/infrastructure/drivers/http/routes';
import registerMiddlewares from '@/core/infrastructure/drivers/http/middlewares';
import loadCheckers from '@/core/infrastructure/drivers/http/checkers';

export function createApp() {
	const app = express();

	// register middlewares and routes (centralized)
	registerMiddlewares(app);
	registerRoutes(app);

	// legacy health endpoints (kept for compatibility)
	app.get('/health', (_req: Request, res: Response) => res.json({ ok: true }));
	app.get('/ping', (_req: Request, res: Response) => res.send('pong'));

	// centralized checkers
	loadCheckers(app);

	return app;
}

export default createApp;
