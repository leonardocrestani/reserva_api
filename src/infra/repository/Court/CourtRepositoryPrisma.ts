import { prisma } from '../../database';
import { CourtRepository } from "../../../application/repository";

export class CourtRepositoryPrisma implements CourtRepository {
    async create(data: any): Promise<object> {
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

    async find(place_id: string, court_name: string): Promise<any | null> {
        return await prisma.court.findFirst({ where: { AND: [{ court_name: court_name }, { place_id: place_id }] }, include: { schedules: true } })
    }
}