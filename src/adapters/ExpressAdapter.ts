import { Request, Response, NextFunction } from 'express';

export class ExpressAdapter {
    static create(fn: any) {
        return async function (req: Request, res: Response) {
            try {
                const result = await fn(req.query, req.body);
                res.status(200).json(result);
            }
            catch (error: any) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}