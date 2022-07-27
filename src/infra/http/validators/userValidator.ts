import { Joi, Segments } from 'celebrate';
import { genre } from '../../../common/enums';
const customJoi = Joi.extend(require('joi-phone-number'));

const userValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            first_name: Joi.string().trim().required(),
            last_name: Joi.string().trim().required(),
            cpf: Joi.string().trim().required(),
            genre: Joi.string().valid(...Object.values(genre)).required(),
            country: Joi.string().trim().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
        })
    },
    QUERY: {
        [Segments.QUERY]: Joi.object().keys({
            email: Joi.string().email().max(70).required()
        }),
    },
    DELETE: {
        [Segments.QUERY]: Joi.object().keys({
            email: Joi.string().email().max(70).required()
        }),
    }
}

export { userValidator };