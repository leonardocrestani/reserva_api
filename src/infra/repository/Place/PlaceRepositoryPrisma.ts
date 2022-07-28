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

    async findAll(limit: number, offset: number): Promise<PlaceModel[]> {
        return await prisma.place.findMany({
            skip: offset,
            take: limit,
            select: {
                created_at: false,
                updated_at: false,
                place_name: true,
                cnpj: true,
                number_of_courts: true,
                address: true,
                contact: true,
                operation_time: true,
                courts: {
                    select: {
                        place_court_name: true,
                        court_name: true,
                        created_at: false,
                        updated_at: false,
                    }
                }
            }
        });
    }

    async findByName(place_name: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { place_name }, include: { courts: { include: { schedules: true } } } });
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { cnpj }, include: { courts: true } });
    }

    async update(cnpj: string, data: any): Promise<PlaceModel> {
        return await prisma.place.update({ where: {cnpj}, data: data, include: {courts: true} });
    }

    async updateNumberOfCourts(place_name: string): Promise<PlaceModel> {
        return await prisma.place.update({ where: { place_name }, data: { number_of_courts: { increment: 1 } }, include: { courts: true } });
    }

    async delete(cnpj: string): Promise<void> {
        await prisma.place.delete({ where: { cnpj: cnpj }, include: { courts: true } });
    }
}