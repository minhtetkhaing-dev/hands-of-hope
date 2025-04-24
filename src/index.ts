import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

// Error-handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;