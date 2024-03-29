import ScheduleSchema from '../../database/models/Schedule'
import { ScheduleRepository } from '../../../application/repository/ScheduleRepository'
import { ScheduleModel } from '../../../application/models'

export class ScheduleRepositoryMongoose implements ScheduleRepository {
  async create (data: ScheduleModel): Promise<ScheduleModel> {
    return await ScheduleSchema.create(data)
  }

  async findById (id: string): Promise<ScheduleModel> {
    return await ScheduleSchema.findById(id)
  }

  async findAllByCourt (place_name: string, court_name: string): Promise<ScheduleModel[]> {
    return await ScheduleSchema.find({ place_name, court_name })
  }

  async updatePlaceName (id: string, place_name: string): Promise<ScheduleModel> {
    return await ScheduleSchema.findOneAndUpdate({ _id: id }, { place_name })
  }

  async updateCourtName (id: string, court_name: string): Promise<ScheduleModel> {
    return await ScheduleSchema.findOneAndUpdate({ _id: id }, { court_name })
  }

  async update (id: string, data: ScheduleModel): Promise<ScheduleModel> {
    return await ScheduleSchema.findOneAndUpdate({ id }, {
      responsible_person_email: data.responsible_person_email,
      responsible_person_id: data.responsible_person_id,
      responsible_person_full_name: data.responsible_person_full_name,
      is_rent: data.is_rent
    }, { new: true }
    )
  }

  async delete (id: string): Promise<number> {
    return await ScheduleSchema.findOneAndDelete({ _id: id })
  }
}
