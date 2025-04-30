import { Router } from 'express';
import { UserController } from '../../controllers/userController';
import { authenticate } from '../../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

// router.use(authenticate);

router.post('/', userController.createUser.bind(userController));
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.put('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));
router.post('/logout', userController.logout.bind(userController));

export default router;