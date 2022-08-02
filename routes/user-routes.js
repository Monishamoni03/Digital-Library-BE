import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();
const user = new userController()

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);

export default router;