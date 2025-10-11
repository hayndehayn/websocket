import type { Request, Response, NextFunction } from 'express';
export declare function requireAuth(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
export declare function optionalAuth(req: Request, res: Response, next: NextFunction): Promise<void>;
//# sourceMappingURL=auth.d.ts.map