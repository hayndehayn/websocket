import jwt, {} from 'jsonwebtoken';
const JWT_SECRET = (process.env.JWT_SECRET ?? 'change_this_in_prod');
const COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? 'token';
export function requireAuth(req, res, next) {
    try {
        const cookieToken = req.cookies?.[COOKIE_NAME];
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
//# sourceMappingURL=auth.js.map