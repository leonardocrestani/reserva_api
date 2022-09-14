import PlaceSchema from '../../database/models/Place'
import { PlaceRepository } from '../../../application/repository'
import { PlaceModel } from '../../../application/models'

export class PlaceRepositoryMongoose implements PlaceRepository {
  async create (data: any): Promise<PlaceModel> {
    return await PlaceSchema.create(data)
  }

  async findAll (limit: number, offset: number): Promise<PlaceModel[]> {
    return await PlaceSchema.find().select('-created_at -updated_at').limit(limit).skip(offset)
  }

  async findById (id: string): Promise<PlaceModel> {
    return await PlaceSchema.findById(id).populate('courts')
  }

  async findByName (name: string): Promise<PlaceModel> {
    return await PlaceSchema.findOne({ name }).populate({
      path: 'courts',
      populate: {
        path: 'schedules'
      }
    })
  };

  async findByCnpj (cnpj: string): Promise<PlaceModel> {
    return await PlaceSchema.findOne({ cnpj }).populate('courts')
  }

  async update (name: string, data: any): Promise<PlaceModel> {
    return await PlaceSchema.findOneAndUpdate({ name }, data, { new: true })
  }

  async updateNumberOfCourts (name: string): Promise<PlaceModel> {
    return await PlaceSchema.findOneAndUpdate({ name }, { $inc: { number_of_courts: 1 } })
  }

  async delete (name: string): Promise<number> {
    return await PlaceSchema.findOneAndDelete({ name })
  }
}
