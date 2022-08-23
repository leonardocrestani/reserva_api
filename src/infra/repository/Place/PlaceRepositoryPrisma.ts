import PlaceSchema from '../../database/models/Place';
import { PlaceRepository } from '../../../application/repository';
import { PlaceModel } from '../../../application/models';

export class PlaceRepositoryPrisma implements PlaceRepository {
    async create(data: any): Promise<PlaceModel> {
        return await PlaceSchema.create(
            {
                place_name: data.place_name,
                cnpj: data.cnpj,
                number_of_courts: data.number_of_courts, address: {
                    city_code: data.address.city_code,
                    city_name: data.address.city_name, state: data.address.state, country: data.address.country,
                    street: data.address.street, neighborhood: data.address.neighborhood
                }, contact: {
                    name: data.contact.name,
                    phone_number: data.contact.phone_number
                }, operation_time: {
                    open_hour: data.operation_time.open_hour,
                    close_hour: data.operation_time.close_hour,
                    days_open: data.operation_time.days_open
                },
                courts: data.courts
            }
        );
    }

    async findAll(limit: number, offset: number): Promise<PlaceModel[]> {
        return await PlaceSchema.find().select('-created_at -updated_at').limit(limit).skip(offset);
    }

    async findByName(place_name: string): Promise<PlaceModel> {
        return await PlaceSchema.findOne({ place_name }).populate("courts");
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        return await PlaceSchema.findOne({ cnpj });
    }

    async update(place_name: string, data: any): Promise<PlaceModel> {
        return await PlaceSchema.findOneAndUpdate({ place_name }, data);
    }

    async updateNumberOfCourts(place_name: string): Promise<PlaceModel> {
        return await PlaceSchema.findOneAndUpdate({ place_name }, {$inc : {'number_of_courts' : 1}});
    }

    async delete(place_name: string): Promise<void> {
        await PlaceSchema.findOneAndDelete({ place_name });
    }
}