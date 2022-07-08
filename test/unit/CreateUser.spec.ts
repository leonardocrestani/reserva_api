import { UserRepositoryMemory } from '../../src/infra/repository';
import { CreateUserService } from '../../src/application/services';

describe('Register user', () => {

    test('Should register new user', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        const user = await createUser.execute("Leonardo", "Crestani", "63001608072",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        expect(user.user.email).toBe("leonardo@test.com");
        expect(user.user.password).toBe("123456*");
    });

    test('Should get error when trying to register user with invalid CPF', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        try {
            await createUser.execute("Leonardo", "Crestani", "47938275",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        }
        catch (error: any) {
            expect(error.message).toBe("CPF invalido");
        }
    })

});