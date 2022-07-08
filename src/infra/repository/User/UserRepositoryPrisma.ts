import { prisma } from '../../database';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(first_name: string, last_name: string, cpf: string, country: string, email: string, password: string,
        phone_number: string): Promise<any> {
        return await prisma.user.create({ data: { first_name, last_name, cpf, country, email, password, phone_number } });
    }

    async findUser(email: string, password: string): Promise<any> {
        return await prisma.user.findFirst({ where: { AND: [{ email }, { password }] } });
    }

    async findUserByEmail(email: string): Promise<UserModel | null> {
        return await prisma.user.findUnique({ where: { email } });
    }
}