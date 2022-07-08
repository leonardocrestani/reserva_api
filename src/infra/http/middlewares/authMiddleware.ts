import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error('No token provided');
    }
    const [bearer, token] = authHeader.split(' ');
    jwt.verify(token, `${process.env.SECRET_KEY}`, (error: any) => {
        if (error) {
            throw new Error('Invalid token');
        }
        return next();
    });
}