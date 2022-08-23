import CourtSchema from '../../database/models/Court';
import PlaceSchema from '../../database/models/Place'
import { CourtRepository } from "../../../application/repository";
import { CourtModel } from '../../../application/models';

export class CourtRepositoryPrisma implements CourtRepository {
    async create(data: any): Promise<CourtModel> {
        return await CourtSchema.create(
            {
                place_id: data.place_id, place_court_name: data.place_court_name, court_name: data.court_name,
                schedules: data.schedules
            }
        );
    }

    async pushCourts(place_id: string, court: any): Promise<void> {
        const place = await PlaceSchema.findById(place_id);
        place.courts.push(court);
        await place.save();
    }

    async findById(id: string): Promise<CourtModel> {
        return await CourtSchema.findById(id);
    }

    async updatePlaceName(id: string, place_name: string): Promise<CourtModel> {
        return await CourtSchema.findOneAndUpdate({ id }, { place_court_name: place_name });
    }

    async update(id: string, data: any): Promise<CourtModel> {
        return await CourtSchema.findOneAndUpdate({ id }, data);
    }

    async delete(id: string): Promise<void> {
        await CourtSchema.findOneAndDelete({ id });
    }
}