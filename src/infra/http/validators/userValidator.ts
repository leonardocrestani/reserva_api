import { Joi, Segments } from 'celebrate';

const userValidator = {
    BODY: {
        [Segments.BODY]: Joi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            cpf: Joi.string().required(),
            country: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: Joi.string().required(),
        })
    }
}

export { userValidator };