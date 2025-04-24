import express from 'express';
import dotenv from 'dotenv';
import apiRoutes from './routes/index';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Helping Hands API!' });
});

// Start server in dev mode
// if (process.env.NODE_ENV !== 'production') {
//   app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
//   });
// }

export const handler = serverless(app);
export default app;