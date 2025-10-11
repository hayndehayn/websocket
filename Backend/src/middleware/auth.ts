import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
import { JWT_COOKIE_NAME, JWT_SECRET } from '../config.js';

export function requireAuth(req: Request, res: Response, next: NextFunction) {
     try {
          const cookieToken = (req as any).cookies?.[JWT_COOKIE_NAME];
          const authHeader = (req.headers.authorization || '').split(' ')[1];
          const token = cookieToken || authHeader;
          if (!token) return res.status(401).json({ error: 'Unauthorized' });

          const payload = jwt.verify(token, JWT_SECRET as string) as any;
          (req as any).user = payload;
          next();
     } catch (err) {
          return res.status(401).json({ error: 'Invalid token' });
     }
}

export async function optionalAuth(req: Request, res: Response, next: NextFunction) {
     try {
          const token =
               (req.cookies && (req.cookies as any)[JWT_COOKIE_NAME]) ||
               (typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer ')
                    ? req.headers.authorization.slice(7)
                    : undefined);

          if (!token) return next();

          let payload: any;
          try {
               payload = jwt.verify(token, JWT_SECRET as string);
          } catch {
               return next();
          }

          const userId = payload?.id;
          if (!userId) return next();

          const user = await UserModel.findById(userId).select('-passwordHash').lean().exec();
          if (user) {
               (req as any).user = user;
          }
          return next();
     } catch (err) {
          console.error('[optionalAuth] error', err);
          return next();
     }
}