import { Joi, Segments } from 'celebrate';
import { countries, genre } from '../../../common/enums';
const customJoi = Joi.extend(require('joi-phone-number'));

const userValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            cpf: Joi.string().trim().required(),
            genre: Joi.string().valid(...Object.values(genre)).required(),
            country: Joi.string().valid(...Object.values(countries)).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
        })
    },
    QUERY: {
        [Segments.PARAMS]: Joi.object().keys({
            email: Joi.string().email().max(70).required()
        }),
    },
    UPDATE: {
        [Segments.PARAMS]: Joi.object().keys({
            email: Joi.string().email().max(70).required()
        }),
        [Segments.BODY]: customJoi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            cpf: Joi.string().trim().required(),
            genre: Joi.string().valid(...Object.values(genre)).required(),
            country: Joi.string().valid(...Object.values(countries)).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
        })
    },
    DELETE: {
        [Segments.PARAMS]: Joi.object().keys({
            email: Joi.string().email().max(70).required()
        }),
    }
}

export { userValidator };