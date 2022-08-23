import mongoose, { Schema } from "mongoose";
import { ScheduleModel } from "../../../application/models";


const ScheduleSchema = new mongoose.Schema<ScheduleModel> ({
    place_name: {type: String, required: true},
    court_name: {type: String, required: true},
    court_id: {type: Schema.Types.ObjectId, ref: 'Court'},
    hour: {type: Number, required: true},
    day : {type: String, required: true},
    is_rent: {type: Boolean, required: true},
    responsible_person_email: {type: String, default: null, required: true},
    responsible_person_id: {type: Schema.Types.ObjectId, default: null, ref: 'User'},
    responsible_person_full_name: {type: String, default: null, required: true}
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, versionKey: false } );

export default mongoose.model<ScheduleModel>('Schedule', ScheduleSchema);