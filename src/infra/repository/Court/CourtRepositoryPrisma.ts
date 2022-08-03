import { prisma } from '../../database';
import { CourtRepository } from "../../../application/repository";
import { CourtModel } from '../../../application/models';

export class CourtRepositoryPrisma implements CourtRepository {
    async create(data: any): Promise<CourtModel> {
        return await prisma.court.create({
            data: {
                place_id: data.place_id, place_name: data.place_name, court_name: data.court_name,
                schedules: {
                    create: []
                }
            },
            include: { schedules: true }
        });
    }

    async findById(id: string): Promise<CourtModel> {
        return await prisma.court.findFirst({ where: { id }, include: { schedules: true } });
    }

    async updatePlaceName(id: string, place_name: string): Promise<CourtModel> {
        return await prisma.court.update({
            where: { id },
            data: { place_name: place_name },
            include: { schedules: true }
        })
    }

    async update(id: string, data: any): Promise<CourtModel> {
        return await prisma.court.update({
            where: { id },
            data,
            include: { schedules: true }
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.court.delete({
            where: { id },
            include: { schedules: true }
        });
    }
}