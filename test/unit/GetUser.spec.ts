import { UserRepositoryMemory } from '../../src/infra/repository';
import { CreateUserService } from '../../src/application/services';
import { GetUserService } from '../../src/application/services';

describe('Get user', () => {

    test('Should get user', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        const newUser = await createUser.execute("Leonardo", "Crestani", "1233456789",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        const getUser = new GetUserService(userRepositoryMemory);
        const user = await getUser.execute("leonardo@test.com", "123456*");
        expect(user.email).toBe("leonardo@test.com");
        expect(user.password).toBe("123456*");
    });

    test('Should get error when email are incorrect', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        await createUser.execute("Leonardo", "Crestani", "1233456789",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        const getUser = new GetUserService(userRepositoryMemory);
        try {
            await getUser.execute("leonardo@erro.com", "123456*");
        }
        catch (error: any) {
            expect(error.message).toBe("Nao foi possivel encontrar usuario");
        }
    });

    test('Should get error when password are incorrect', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        await createUser.execute("Leonardo", "Crestani", "1233456789",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        const getUser = new GetUserService(userRepositoryMemory);
        try {
            await getUser.execute("leonardo@test.com", "123*%$");
        }
        catch (error: any) {
            expect(error.message).toBe("Nao foi possivel encontrar usuario");
        }
    });

});