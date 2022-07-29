import { prisma } from '../../database';
import { CourtRepository } from "../../../application/repository";
import { CourtModel } from '../../../application/models';

export class CourtRepositoryPrisma implements CourtRepository {
    async create(data: any): Promise<CourtModel> {
        return await prisma.court.create({
            data: {
                place_id: data.place_id, place_court_name: data.place_court_name, court_name: data.court_name,
                schedules: {
                    create: []
                }
            },
            include: { schedules: true }
        });
    }

    async find(place_court_name: string, court_name: string): Promise<CourtModel> {
        return await prisma.court.findFirst({ where: { AND: [{ court_name: court_name }, { place_court_name: place_court_name }] }, include: { schedules: true } })
    }

    async updatePlaceName(court_name: string, data: any): Promise<CourtModel> {
        return await prisma.court.update({
            where: {court_name},
            data,
            include: {schedules: true}
        })
    }

    async update(place_name: string, court_name: string, data: any): Promise<CourtModel> {
        return await prisma.court.update({
            where: { place_court_name_court_name: {place_court_name: place_name, court_name: court_name}},
            data,
            include: {schedules: true}
        })
    }
}