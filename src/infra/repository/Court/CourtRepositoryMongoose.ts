import CourtSchema from '../../database/models/Court'
import { CourtRepository } from '../../../application/repository'
import { CourtModel } from '../../../application/models'

export class CourtRepositoryMongoose implements CourtRepository {
  async create (data: CourtModel): Promise<CourtModel> {
    return await CourtSchema.create(data)
  }

  async findById (id: string): Promise<CourtModel> {
    return await CourtSchema.findById(id).populate('schedules')
  }

  async updatePlaceName (id: string, place_name: string): Promise<CourtModel> {
    return await CourtSchema.findOneAndUpdate({ _id: id }, { place_name }, { new: true })
  }

  async update (id: string, data: object): Promise<CourtModel> {
    return await CourtSchema.findOneAndUpdate({ _id: id }, data, { new: true })
  }

  async delete (id: string): Promise<void> {
    await CourtSchema.findOneAndDelete({ _id: id })
  }
}
