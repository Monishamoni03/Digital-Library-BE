import { Router } from 'express';
import userController from '../controllers/user-controller';
import isAuthenticated from '../middleware/auth-middleware';

const router = Router();
const user = new userController();

router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.get('/profile/:id', isAuthenticated, user.viewProfile);
router.put('/:id', isAuthenticated, user.updateProfile);
router.delete('/:id', isAuthenticated, user.deleteProfile);
router.get('/', isAuthenticated, user.getAllUser);

export default router;