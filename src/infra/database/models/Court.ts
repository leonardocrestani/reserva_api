import mongoose, { Schema } from 'mongoose'
import { CourtModel } from '../../../application/models'

const CourtSchema = new mongoose.Schema<CourtModel>({
  place_name: { type: String, required: true },
  court_name: { type: String, required: true },
  schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule', default: [], required: false }],
  place_id: { type: String, ref: 'Place' }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

export default mongoose.model<CourtModel>('Court', CourtSchema)
