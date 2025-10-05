import createApp from './src/server';

const PORT = process.env.PORT ?? 3000;

const app = createApp();

app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server listening on http://localhost:${PORT}`);
});
