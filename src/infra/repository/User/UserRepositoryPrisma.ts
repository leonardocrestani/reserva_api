import { prisma } from '../../database';
import { UserRepository } from '../../../application/repository';
import { UserModel } from '../../../application/models';

export class UserRepositoryPrisma implements UserRepository {
    async create(data: any): Promise<UserModel> {
        return await prisma.user.create({
            data: {
                first_name: data.first_name, last_name: data.last_name, cpf: data.cpf,
                genre: data.genre, country: data.country, email: data.email, password: data.password, phone_number: data.phone_number
            },
            include: { schedules: true }
        });
    }

    async findByEmail(email: string): Promise<any> {
        // verificar como criar um retorno que aceite sem password
        return await prisma.user.findUnique({
            where: { email }, select: {
                first_name: true, last_name: true, cpf: true,
                genre: true, country: true, email: true, password: false, phone_number: true, schedules: true
            }
        });
    }

    async remove(email: string): Promise<UserModel> {
        return await prisma.user.delete({ where: { email }, include: { schedules: true } });
    }
}