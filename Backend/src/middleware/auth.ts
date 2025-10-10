import type { Request, Response, NextFunction } from 'express';
import jwt, { type Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = (process.env.JWT_SECRET ?? 'change_this_in_prod') as Secret;
const COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? 'token';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
     try {
          const cookieToken = (req as any).cookies?.[COOKIE_NAME];
          const authHeader = (req.headers.authorization || '').split(' ')[1];
          const token = cookieToken || authHeader;
          if (!token) return res.status(401).json({ error: 'Unauthorized' });

          const payload = jwt.verify(token, JWT_SECRET) as any;
          (req as any).user = payload;
          next();
     } catch (err) {
          return res.status(401).json({ error: 'Invalid token' });
     }
}