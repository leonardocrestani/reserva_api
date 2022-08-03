import { prisma } from '../../database';
import { ScheduleRepository } from '../../../application/repository/ScheduleRepository';
import { ScheduleModel } from '../../../application/models';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
    async create(data: any): Promise<ScheduleModel> {
        return await prisma.schedules.create({ data: data });
    }

    async findById(id: string): Promise<ScheduleModel> {
        return await prisma.schedules.findFirst({ where: { id } });
    }

    async findAllByCourt(place_name: string, court_name: string): Promise<ScheduleModel[]> {
        return await prisma.schedules.findMany({ where: { AND: [{ place_name: place_name }, { court_name }] } });
    }

    async updatePlaceName(id: string, place_name: string): Promise<ScheduleModel> {
        return await prisma.schedules.update({
            where: { id },
            data: { place_name: place_name }
        })
    }

    async updateCourtName(id: string, court_name: string): Promise<ScheduleModel> {
        return await prisma.schedules.update({
            where: { id },
            data: { court_name }
        })
    }

    async update(id: string, data: any): Promise<void> {
        await prisma.schedules.update({
            where: { id }, data: {
                responsible_person_email: data.responsible_person_email,
                responsible_person_id: data.responsible_person_id,
                responsible_person_full_name: data.responsible_person_full_name,
                is_rent: data.is_rent
            }
        });
    }

    async delete(id: string): Promise<void> {
        await prisma.schedules.delete({
            where: { id }
        });
    }
}