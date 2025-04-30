import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';
import serverless from 'serverless-http';
import { errorHandler } from './middlewares/errorHandaler.middleware';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

app.use(errorHandler);

export const handler = serverless(app);
export default app;