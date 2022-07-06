import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            surname: Joi.string().trim().required(),
            cpf: Joi.string().required(),
            country: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: Joi.string().required(),
        });
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if (error) throw error
        return next();
    }
    catch (error: any) {
        return res.status(400).json(
            error.details.map((detail: any) => ({
                message: detail.message,
                path: detail.path
            }))
        )
    }
}