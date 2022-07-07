import { Joi, Segments } from 'celebrate';
const customJoi = Joi.extend(require('joi-phone-number'));

const userValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            cpf: Joi.string().required(),
            country: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
        })
    },
    QUERY: {
        [Segments.QUERY]: Joi.object().keys({
            email: Joi.string().required().max(70),
            password: Joi.string().required().max(25)
        }),
    },
}

export { userValidator };