import { prisma } from '../../database';
import { CourtRepository } from "../../../application/repository";
import { CourtModel } from '../../../application/models';

export class CourtRepositoryPrisma implements CourtRepository {
    async create(data: any): Promise<CourtModel> {
        return await prisma.court.create({
            data: {
                place_id: data.place_id, court_place_name: data.court_place_name, court_name: data.court_name,
                schedules: {
                    create: []
                }
            },
            include: { schedules: true }
        });
    }

    async find(court_place_name: string, court_name: string): Promise<CourtModel> {
        return await prisma.court.findFirst({ where: { AND: [{ court_name: court_name }, { court_place_name: court_place_name }] }, include: { schedules: true } })
    }
}