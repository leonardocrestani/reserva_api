import CourtSchema from '../../database/models/Court';
import PlaceSchema from '../../database/models/Place'
import { CourtRepository } from "../../../application/repository";
import { CourtModel } from '../../../application/models';

export class CourtRepositoryMongoose implements CourtRepository {
    async create(data: any): Promise<CourtModel> {
        return await CourtSchema.create(data);
    }

    async pushCourts(place_id: string, court: any): Promise<void> {
        const place = await PlaceSchema.findById(place_id);
        place.courts.push(court);
        await place.save();
    }

    async findById(id: string): Promise<CourtModel> {
        return await CourtSchema.findById(id).populate("schedules");
    }

    async updatePlaceName(id: string, place_name: string): Promise<CourtModel> {
        return await CourtSchema.findOneAndUpdate({ _id: id }, { place_name: place_name }, {new: true});
    }

    async update(id: string, data: any): Promise<CourtModel> {
        return await CourtSchema.findOneAndUpdate({ _id: id }, data, {new: true});
    }

    async delete(id: string): Promise<void> {
        await CourtSchema.findOneAndDelete({ _id: id });
    }
}