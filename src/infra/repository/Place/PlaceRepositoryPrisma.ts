import { prisma } from '../../database';
import { PlaceRepository } from '../../../application/repository';
import { PlaceModel } from '../../../application/models';

export class PlaceRepositoryPrisma implements PlaceRepository {
    async create(data: any): Promise<PlaceModel> {
        return await prisma.place.create({
            data: {
                name: data.name,
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
                        // ver como fazer para criar a propriedade horarios array vazio para poder tirar schedules de opcional da entidade de court
                        ...data.courts,
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
                name: true,
                cnpj: true,
                number_of_courts: true,
                address: true,
                contact: true,
                operation_time: true,
                courts: {
                    select: {
                        place_name: true,
                        court_name: true,
                        schedules: true,
                        created_at: false,
                        updated_at: false,
                    }
                }
            }
        });
    }

    async findByName(name: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { name }, include: { courts: { include: { schedules: true } } } });
    };

    async findByCnpj(cnpj: string): Promise<PlaceModel> {
        return await prisma.place.findUnique({ where: { cnpj }, include: { courts: { include: { schedules: true } } } });
    }

    async update(name: string, data: any): Promise<PlaceModel> {
        return await prisma.place.update({ where: { name }, data: data, include: { courts: true } });
    }

    async updateNumberOfCourts(name: string): Promise<PlaceModel> {
        return await prisma.place.update({ where: { name }, data: { number_of_courts: { increment: 1 } }, include: { courts: true } });
    }

    async delete(name: string): Promise<void> {
        await prisma.place.delete({ where: { name }, include: { courts: true } });
    }
}