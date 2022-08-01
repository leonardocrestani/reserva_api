import { Joi, Segments } from 'celebrate';
const customJoi = Joi.extend(require('joi-phone-number'));
import { weekendDays } from '../../../common/enums/weekenedDaysEnum';

const scheduleValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            court_name: Joi.string().trim().required(),
            place_court_name: Joi.string().trim().required(),
            hour: Joi.number().required(),
            day: Joi.string().valid(...Object.values(weekendDays)).required()
        })
    },
    QUERY: {
        [Segments.QUERY]: Joi.object().keys({
            place_name: Joi.string().trim().required(),
            court_name: Joi.string().trim().required(),
            hour: Joi.number().required()
        })
    },
    UPDATE: {
        [Segments.BODY]: customJoi.object().keys({
            responsible_person_email: Joi.string().trim().required()
        }),
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().trim().required()
        })
    },
    DELETE: {
        [Segments.PARAMS]: customJoi.object().keys({
            id: Joi.string().trim().required()
        })
    }
}

export { scheduleValidator };