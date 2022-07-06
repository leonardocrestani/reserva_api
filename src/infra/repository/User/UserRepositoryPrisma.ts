import { prisma } from '../../database';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(name: string, surname: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<any> {
        return prisma.user.create({ data: { name, surname, cpf, country, email, password, phone_number } });
    }

    async findUser(email: string, password: string): Promise<any> {
        return prisma.user.findUnique({ where: { email } });
    }
}