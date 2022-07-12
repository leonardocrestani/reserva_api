import { Joi, Segments } from 'celebrate';
import { states, weekendDays } from '../../../common/enums';
const customJoi = Joi.extend(require('joi-phone-number'));

const placeValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            local_name: Joi.string().trim().required(),
            number_of_courts: Joi.number().required(),
            address: customJoi.object().keys({
                city_code: Joi.number().required(),
                city_name: Joi.string().trim().required(),
                state: Joi.string().valid(...Object.values(states)).required(),
                country: Joi.string().trim().required(),
                street: Joi.string().trim().required(),
                neighbourhood: Joi.string().trim().required()
            }),
            contact: customJoi.object().keys({
                name: Joi.string().trim().required(),
                phone_number: customJoi.string().phoneNumber({ defaultCountry: 'BR', strict: true }).required(),
            }),
            operation_time: customJoi.object().keys({
                open_hour: Joi.number().required(),
                open_minutes: Joi.number().required(),
                close_hour: Joi.number().required(),
                close_minutes: Joi.number().required(),
                days: Joi.array().valid(...Object.values(weekendDays))
            })
        })
    }
}

export { placeValidator };