import { prisma } from '../../database';
import { ScheduleRepository } from '../../../application/repository/ScheduleRepository';
import { ScheduleModel } from '../../../application/models';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
    async create(data: any): Promise<ScheduleModel> {
        return await prisma.schedules.create({ data: data });
    }

    async find(court_id: string, hour: number, minutes: number): Promise<ScheduleModel> {
        return await prisma.schedules.findFirst({ where: { AND: [{ court_id }, { hour }] } });
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
}