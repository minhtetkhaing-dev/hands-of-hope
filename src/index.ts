import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';
import { PrismaClient } from '@prisma/client';

dotenv.config();

// Initialize Prisma Client
const prisma = new PrismaClient();

const app = express();

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.use('/api', apiRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Only start the server in development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

export default app;