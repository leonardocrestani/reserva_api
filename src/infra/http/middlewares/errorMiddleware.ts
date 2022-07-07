import { isCelebrateError } from 'celebrate';
import { Request, Response, NextFunction } from 'express';

export default (error: any, req: Request, res: Response, next: NextFunction) => {
    console.log(error.details.body)
    if(isCelebrateError(error)){
        return res.status(400).json({message: error.message});
    }
    else {
        return res.json({message: error.message});
    }
}