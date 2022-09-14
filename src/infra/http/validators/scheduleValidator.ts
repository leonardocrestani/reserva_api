import { Joi, Segments } from 'celebrate'
import { weekendDays } from '../../../common/enums/weekenedDaysEnum'
const customJoi = Joi.extend(require('joi-phone-number'))

const scheduleValidator = {
  BODY: {
    [Segments.BODY]: customJoi.object().keys({
      court_name: Joi.string().trim().required(),
      place_name: Joi.string().trim().required(),
      hour: Joi.number().required(),
      day: Joi.string().valid(...Object.values(weekendDays)).required()
    })
  },
  QUERY: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().trim().required()
    })
  },
  BOOK: {
    [Segments.BODY]: customJoi.object().keys({
      responsible_person_email: Joi.string().trim().required()
    }),
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.string().trim().required()
    })
  },
  UNBOOK: {
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

export { scheduleValidator }
