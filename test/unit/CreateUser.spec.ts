import { UserRepositoryMemory } from '../../src/infra/repository';
import { CreateUserService } from '../../src/application/services';
import { UserRepositoryPrisma } from '../../src/infra/repository';
import { prisma } from '../../src/infra/database/index';

describe('Register user', () => {

    beforeAll(async () => {
        await prisma.user.deleteMany({});
    });

    afterAll(async () => {
        await prisma.user.deleteMany({});
    });

    test('Should register new user', async () => {
        const userRepositoryPrisma = new UserRepositoryPrisma();
        const createUser = new CreateUserService(userRepositoryPrisma);
        const user = await createUser.execute("Leonardo", "Crestani", "1233456789",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        expect(user.email).toBe("leonardo@test.com");
        expect(user.password).toBe("123456*");
    });

});