import mongoose, { Schema } from 'mongoose'
import { ScheduleModel } from '../../../application/models'

const ScheduleSchema = new mongoose.Schema<ScheduleModel>({
  place_name: { type: String, required: true },
  court_name: { type: String, required: true },
  court_id: { type: String, ref: 'Court' },
  hour: { type: Number, required: true },
  day: { type: String, required: true },
  is_rent: { type: Boolean, default: false, required: false },
  responsible_person_email: { type: String, default: null, required: false },
  responsible_person_id: { type: String, default: null, ref: 'User', required: false },
  responsible_person_full_name: { type: String, default: null, required: false }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

export default mongoose.model<ScheduleModel>('Schedule', ScheduleSchema)
