import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import apiRoutes from '../routes/index';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());

app.use('/api', apiRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

export default app;