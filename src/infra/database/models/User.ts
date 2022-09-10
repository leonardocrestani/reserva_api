import mongoose, { Schema } from 'mongoose'
import { UserModel } from '../../../application/models'

const UserSchema = new mongoose.Schema<UserModel>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  cpf: { type: String, required: true },
  genre: { type: String, required: true },
  country: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true, select: true },
  phone_number: { type: String, required: true },
  schedules: [{ type: Schema.Types.ObjectId, ref: 'Schedule', default: [], required: false }]
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false })

export default mongoose.model<UserModel>('User', UserSchema)
