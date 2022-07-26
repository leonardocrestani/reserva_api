import { prisma } from '../../database';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(data: any): Promise<UserModel> {
        return await prisma.user.create({
            data: {
                first_name: data.first_name, last_name: data.last_name, cpf: data.cpf,
                genre: data.genre, country: data.country, email: data.email, password: data.password, phone_number: data.phone_number
            }, include: { schedules: true }
        });
    }

    async findUser(email: string, password: string): Promise<UserModel> {
        return await prisma.user.findFirst({ where: { AND: [{ email }, { password }] }, include: { schedules: true } });
    }

    async findUserByEmail(email: string): Promise<UserModel> {
        return await prisma.user.findUnique({ where: { email }, include: { schedules: true } });
    }

    async remove(email: string): Promise<UserModel> {
        return await prisma.user.delete({ where: { email }, include: { schedules: true } });
    }
}