import { prisma } from '../../database';
import { ScheduleRepository } from '../../../application/repository/ScheduleRepository';

export class ScheduleRepositoryPrisma implements ScheduleRepository {
    async create(data: any): Promise<object> {
        return await prisma.schedules.create({ data: data });
    }
}