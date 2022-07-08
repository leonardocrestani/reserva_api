import { Request, Response, NextFunction } from 'express';

export class ExpressAdapter {
    static create(fn: any) {
        return async function (req: Request, res: Response, next: NextFunction) {
            try {
                const result = await fn(req.query, req.params, req.body, next);
                res.status(result.statusCode).json(result.data);
            }
            catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}