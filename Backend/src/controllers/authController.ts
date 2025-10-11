import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import jwt from 'jsonwebtoken';
import { JWT_COOKIE_NAME, JWT_SECRET, JWT_EXPIRES_MS } from '../config.js';

export async function signup(req: Request, res: Response) {
     try {
          const { email, password, name } = req.body as { email?: string; password?: string; name?: string };
          if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

          const found = await UserModel.findOne({ email: email.toLowerCase().trim() });
          if (found) return res.status(409).json({ error: 'User already exists' });

          const salt = await bcrypt.genSalt(10);
          const passwordHash = await bcrypt.hash(password, salt);

          const user = await UserModel.create({ email: email.toLowerCase().trim(), name, passwordHash });


          const userId = String((user as any)._id);
          const token = jwt.sign({ id: userId, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
          res.cookie(JWT_COOKIE_NAME, token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'lax',
               maxAge: JWT_EXPIRES_MS,
          });
          return res.json({ data: { user: { id: userId, email: user.email, name: user.name } } });
     } catch (err) {
          console.error('signup error', err);
          return res.status(500).json({ error: 'Registration failed' });
     }
}

export async function signin(req: Request, res: Response) {
     try {
          const { email, password } = req.body as { email?: string; password?: string };
          if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

          const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
          if (!user) return res.status(401).json({ error: 'Invalid credentials' });

          const ok = await bcrypt.compare(password, user.passwordHash);
          if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

          const userId = String((user as any)._id);
          const token = jwt.sign({ id: userId, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
          res.cookie(JWT_COOKIE_NAME, token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'lax',
               maxAge: JWT_EXPIRES_MS,
          });

          return res.json({ data: { user: { id: userId, email: user.email, name: user.name } } });
     } catch (err) {
          console.error('signin error', err);
          return res.status(500).json({ error: 'Login failed' });
     }
}

export async function me(req: Request, res: Response) {
     try {
          const token =
               (req.cookies && req.cookies[JWT_COOKIE_NAME]) ||
               (typeof req.headers.authorization === 'string' && req.headers.authorization.startsWith('Bearer ')
                    ? req.headers.authorization.slice(7)
                    : undefined);

          // ? no token — return 200 + user:null
          if (!token) {
               return res.status(200).json({ data: { user: null } });
          }

          let payload: any;
          try {
               payload = jwt.verify(token, JWT_SECRET as string);
          } catch (err) {
               // ? invalid/expired token — also return 200 + user:null
               return res.status(200).json({ data: { user: null } });
          }

          const userId = payload?.id;
          if (!userId) return res.status(200).json({ data: { user: null } });

          const user = await UserModel.findById(userId).select('-passwordHash').lean().exec();
          if (!user) return res.status(200).json({ data: { user: null } });

          return res.json({ data: { user } });
     } catch (err) {
          console.error('[auth.me] unexpected error:', err);
          return res.status(500).json({ error: 'Server error' });
     }
}

export function signout(req: Request, res: Response) {
     res.clearCookie(JWT_COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
     return res.json({ data: { ok: true } });
}