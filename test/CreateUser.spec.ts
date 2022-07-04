import UserRepositoryMemory from '../src/infra/repository/UserRepositoryMemory';
import CreateUserService from '../src/application/services/CreateUser';

describe('Register user', () => {

    test('Should register new user', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        const user = await createUser.execute("Leonardo", "Crestani", "1233456789",
            "Brasil", "leonardo@test.com", "123456*", "+5554999435");
        expect(user.email).toBe("leonardo@test.com");
        expect(user.password).toBe("123456*");
    });

});