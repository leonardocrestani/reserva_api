import mongoose, { Schema } from 'mongoose'
import { PlaceModel } from '../../../application/models'

const PlaceSchema = new mongoose.Schema<PlaceModel>({
  name: { type: String, required: true },
  cnpj: { type: String, required: true },
  number_of_courts: { type: Number, required: true },
  address: { type: Object, required: true },
  contact: { type: Object, required: true },
  operation_time: { type: Object, required: true },
  courts: [{ type: Schema.Types.ObjectId, ref: 'Court', default: [], required: false }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

export default mongoose.model<PlaceModel>('Place', PlaceSchema)
