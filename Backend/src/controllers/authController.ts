import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt, { type Secret } from 'jsonwebtoken';
import UserModel from '../models/User.js';

const JWT_SECRET: Secret = (process.env.JWT_SECRET ?? 'change_this_in_prod') as Secret;
const COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? 'token';
const COOKIE_MAX_AGE = Number(process.env.JWT_EXPIRES_MS ?? 7 * 24 * 60 * 60 * 1000); // 7d

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
          res.cookie(COOKIE_NAME, token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'lax',
               maxAge: COOKIE_MAX_AGE,
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
          res.cookie(COOKIE_NAME, token, {
               httpOnly: true,
               secure: process.env.NODE_ENV === 'production',
               sameSite: 'lax',
               maxAge: COOKIE_MAX_AGE,
          });

          return res.json({ data: { user: { id: userId, email: user.email, name: user.name } } });
     } catch (err) {
          console.error('signin error', err);
          return res.status(500).json({ error: 'Login failed' });
     }
}

export async function me(req: Request, res: Response) {
     const u = (req as any).user;
     if (!u) return res.status(401).json({ error: 'Unauthorized' });
     return res.json({ data: { user: { id: u.id, email: u.email } } });
}

export function signout(req: Request, res: Response) {
     res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production' });
     return res.json({ data: { ok: true } });
}