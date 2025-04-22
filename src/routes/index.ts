import { Router } from 'express';
import userRoutes from './console/userRoutes';
import authRoutes from './console/authRoutes';

const router = Router();

// Mount all routes with /api prefix
router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export default router;