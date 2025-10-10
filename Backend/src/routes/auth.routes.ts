import { Router } from 'express';
import { signup, signin, me, signout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.post('/signup', signup);     // POST /api/auth/signup
router.post('/signin', signin);     // POST /api/auth/signin
router.post('/signout', signout);   // POST /api/auth/signout
router.get('/me', requireAuth, me); // GET /api/auth/me

export default router;