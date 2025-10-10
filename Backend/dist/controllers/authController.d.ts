import type { Request, Response } from 'express';
export declare function signup(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function signin(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function me(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function signout(req: Request, res: Response): Response<any, Record<string, any>>;
//# sourceMappingURL=authController.d.ts.map