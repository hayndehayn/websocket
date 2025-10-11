import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../config.js';
export function requireAuth(req, res, next) {
    try {
        const cookieToken = req.cookies?.[JWT_COOKIE_NAME];
        const authHeader = (req.headers.authorization || '').split(' ')[1];
        const token = cookieToken || authHeader;
        if (!token)
            return res.status(401).json({ error: 'Unauthorized' });
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
export async function optionalAuth(req, res, next) {
    try {
        const token = (req.cookies && req.cookies[JWT_COOKIE_NAME]) ||
            (typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer ')
                ? req.headers.authorization.slice(7)
                : undefined);
        if (!token)
            return next();
        let payload;
        try {
            payload = jwt.verify(token, JWT_SECRET);
        }
        catch {
            return next();
        }
        const userId = payload?.id;
        if (!userId)
            return next();
        const user = await UserModel.findById(userId).select('-passwordHash').lean().exec();
        if (user) {
            // attach user to request for controllers: (req as any).user
            req.user = user;
        }
        return next();
    }
    catch (err) {
        // don't block on middleware errors for optional auth
        console.error('[optionalAuth] error', err);
        return next();
    }
}
//# sourceMappingURL=auth.js.map