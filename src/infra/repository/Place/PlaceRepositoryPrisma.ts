import { prisma } from '../../database';
import { PlaceRepository } from '../../../application/repository';
import { PlaceModel } from '../../../application/models';

export class PlaceRepositoryPrisma implements PlaceRepository {
    async create(data: any): Promise<object> {
        return await prisma.place.create({
            data: {
                local_name: data.local_name,
                number_of_courts: data.number_of_courts, address: {
                    city_code: data.address.city_code,
                    city_name: data.address.city_name, state: data.address.state, country: data.address.country,
                    street: data.address.street, neighbourhood: data.address.neighbourhood
                }, contact: {
                    name: data.contact.name,
                    phone_number: data.contact.phone_number
                }, operation_time: {
                    open_hour: data.operation_time.open_hour,
                    open_minutes: data.operation_time.open_minutes, close_hour: data.operation_time.close_hour,
                    close_minutes: data.operation_time.close_minutes, days: data.operation_time.days
                }
            }
        });
    }
}