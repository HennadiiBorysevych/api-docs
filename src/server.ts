import express from 'express';
import { apiReference } from '@scalar/express-api-reference';
import { usersRouter } from './routes/users-router';
import { generateSpec } from './docs/registry';

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

app.use('/users', usersRouter);

app.get('/openapi.json', (_req, res) => {
  res.json(generateSpec());
});

app.use('/docs', apiReference({ url: '/openapi.json' }));

app.listen(PORT, () => {
  console.log(`Server:  http://localhost:${PORT}`);
  console.log(`Docs:    http://localhost:${PORT}/docs`);
  console.log(`Spec:    http://localhost:${PORT}/openapi.json`);
});
