import { Router } from 'express';
import { signup, signin, me, signout } from '../controllers/authController.js';
import { requireAuth, optionalAuth } from '../middleware/auth.js';
const router = Router();
router.post('/signup', signup); // POST /api/auth/signup
router.post('/signin', signin); // POST /api/auth/signin
router.post('/signout', signout); // POST /api/auth/signout
router.get('/me', optionalAuth, me); // GET /api/auth/me
export default router;
//# sourceMappingURL=auth.routes.js.map