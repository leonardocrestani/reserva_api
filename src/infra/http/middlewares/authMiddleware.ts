import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Unauhtorized } from '../../../application/errors/Unauthorized';

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Unauhtorized('No token provided');
    }
    const [bearer, token] = authHeader.split(' ');
    jwt.verify(token, `${process.env.SECRET_KEY}`, (error: any) => {
        if (error) {
            throw new Unauhtorized('Invalid token');
        }
        return next();
    });
}