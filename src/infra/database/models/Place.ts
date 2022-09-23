import mongoose, { Schema } from 'mongoose'
import { PlaceModel } from '../../../application/models'

const PlaceSchema = new mongoose.Schema<PlaceModel>({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  number_of_courts: { type: Number, required: true },
  address: {
    type: {
      city_code: { type: String, required: true },
      city_name: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      street: { type: String, required: true },
      neighborhood: { type: String, required: true }
    },
    required: true
  },
  contact: { type: Object, required: true },
  operation_time: { type: Object, required: true },
  courts: [{ type: Schema.Types.ObjectId, ref: 'Court', default: [], required: false }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

export default mongoose.model<PlaceModel>('Place', PlaceSchema)
