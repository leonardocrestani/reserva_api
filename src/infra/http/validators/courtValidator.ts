import { Joi, Segments } from 'celebrate';
const customJoi = Joi.extend(require('joi-phone-number'));


const courtValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            place_name: Joi.string().trim().required(),
            court_name: Joi.string().trim().required()
        })
    },
    QUERY: {
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().trim().required()
        }),
    },
    UPDATE: {
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.string().trim().required()
        }),
        [Segments.BODY]: customJoi.object().keys({
            court_name: Joi.string().trim().optional()
        })
    },
    DELETE: {
        [Segments.QUERY]: Joi.object().keys({
            id: Joi.string().trim().required()
        })
    }
}

export { courtValidator };