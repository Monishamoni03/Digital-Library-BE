import { Router } from 'express';
import userController from '../controllers/user-controller';
import userAuthentication from '../middleware/auth-middleware';

const router = Router();
const user = new userController();

router.get('/', user.getAllUser);
router.post('/register', user.registerUser);
router.post('/login', user.loginUser);
router.get('/profile/:userId', userAuthentication, user.viewProfile);
router.put('/update/:userId', userAuthentication, user.updateProfile);
router.delete('/delete/:userId', userAuthentication, user.deleteProfile);

export default router;