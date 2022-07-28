import { prisma } from '../../database';
import { ScheduleRepository } from '../../../application/repository/ScheduleRepository';
import { ScheduleModel } from '../../../application/models';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
    async create(data: any): Promise<ScheduleModel> {
        return await prisma.schedules.create({ data: data });
    }

    async find(place_court_name: string, court_name: string, hour: number): Promise<ScheduleModel> {
        return await prisma.schedules.findFirst({ where: { AND: [{ place_court_name }, { court_name }, { hour }] } });
    }

    async findAllByCourt(place_court_name: string, court_name: string): Promise<ScheduleModel[]> {
        return await prisma.schedules.findMany({ where: { AND: [{ place_court_name }, { court_name }] } });
    }

    async updatePlaceName(hour: number, data: any): Promise<ScheduleModel> {
        return await prisma.schedules.update({
            where: { hour },
            data
        })
    }

    async update(hour: number, data: any): Promise<void> {
        await prisma.schedules.update({
            where: { hour }, data: {
                responsible_person_email: data.responsible_person_email,
                responsible_person_id: data.responsible_person_id,
                responsible_person_full_name: data.responsible_person_full_name,
                is_rent: data.is_rent
            }
        });
    }
}