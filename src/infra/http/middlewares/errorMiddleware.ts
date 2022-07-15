import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    if (isCelebrateError(error)) {
        return res.status(400).json({
            message: error.details.entries().next().value[1].details[0].message,
            path: error.details.entries().next().value[1].details[0].path
        });
    }
    else {
        return res.status(500).json({ message: error.message });
    }
}