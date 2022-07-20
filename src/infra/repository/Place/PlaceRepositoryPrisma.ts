import { prisma } from '../../database';
import { PlaceRepository } from '../../../application/repository';
import { PlaceModel } from '../../../application/models';

export class PlaceRepositoryPrisma implements PlaceRepository {
    async create(data: any): Promise<PlaceModel> {
        return await prisma.place.create({
            data: {
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
                courts: {
                    create: [
                        ...data.courts
                    ]
                }
            },
            include: { courts: true }
        });
    }

    async find(param: any): Promise<PlaceModel> {
        return await prisma.place.findFirst({ where: param, include: { courts: true } })
    }

    async findByName(place_name: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { place_name }, include: { courts: { include: { schedules: true } } } });
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { cnpj }, include: { courts: true } });
    }
}