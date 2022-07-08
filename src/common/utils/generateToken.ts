import dotenv from 'dotenv';
dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
import jwt from 'jsonwebtoken';

export default async (user: any) => {
    const token = jwt.sign({ id: user.id }, `${process.env.SECRET_KEY}`, { expiresIn: '60m' });
    return token;
}