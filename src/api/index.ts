import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from '../routes/index';
import serverless from 'serverless-http';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

export const handler = serverless(app);