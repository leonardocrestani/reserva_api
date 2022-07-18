import { Joi, Segments } from 'celebrate';
const customJoi = Joi.extend(require('joi-phone-number'));

const scheduleValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            court_name: Joi.string().trim().required(),
            place_court_name: Joi.string().trim().required(),
            hour: Joi.number().required(),
            minutes: Joi.number().required()
        })
    },
    QUERY: {
        [Segments.QUERY]: Joi.object().keys({
            place_name: Joi.string().trim().required(),
            court_name: Joi.string().trim().required(),
            hour: Joi.number().required(),
            minutes: Joi.number().required()
        })
    },
    UPDATE: {
        [Segments.BODY]: customJoi.object().keys({
            responsible_person_email: Joi.string().trim().required(),
            is_rent: Joi.boolean().required()
        }),
        [Segments.QUERY]: Joi.object().keys({
            place_name: Joi.string().trim().required(),
            court_name: Joi.string().trim().required(),
            hour: Joi.number().required(),
            minutes: Joi.number().required()
        })
    }
}

export { scheduleValidator };