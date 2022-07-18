import { Joi, Segments } from 'celebrate';
const customJoi = Joi.extend(require('joi-phone-number'));

const courtValidator = {
    BODY: {
        [Segments.BODY]: customJoi.object().keys({
            court_place_name: Joi.string().trim().required(),
            court_name: Joi.string().trim().required()
        })
    },
    QUERY: {
        [Segments.QUERY]: Joi.object().keys({
            court_place: Joi.string().trim().required(),
            court_name: Joi.string().trim().required()
        }),
    },
}

export { courtValidator };