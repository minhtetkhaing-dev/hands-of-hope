import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

app.use('/api', apiRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Express TypeScript API!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});