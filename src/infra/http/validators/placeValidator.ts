import { Joi, Segments } from 'celebrate';
import { states, weekendDays } from '../../../common/enums';
const customJoi = Joi.extend(require('joi-phone-number'));

const placeValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            place_name: Joi.string().trim().required(),
            cnpj: Joi.string().trim().required(),
            address: customJoi.object().keys({
                city_code: Joi.number().required(),
                city_name: Joi.string().trim().required(),
                state: Joi.string().valid(...Object.values(states)).required(),
                country: Joi.string().trim().required(),
                street: Joi.string().trim().required(),
                neighborhood: Joi.string().trim().required()
            }),
            contact: customJoi.object().keys({
                name: Joi.string().trim().required(),
                phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
            }),
            operation_time: customJoi.object().keys({
                open_hour: Joi.number().required(),
                close_hour: Joi.number().required(),
                days_open: Joi.array().items(Joi.string().valid(...Object.values(weekendDays)))
            }),
            courts: Joi.array().items(Joi.object().keys({ place_court_name: Joi.string(), court_name: Joi.string() })).required()
        })
    },
    QUERY: {
        [Segments.QUERY]: customJoi.object().keys({
            place_name: Joi.string().required()
        })
    }
}

export { placeValidator };