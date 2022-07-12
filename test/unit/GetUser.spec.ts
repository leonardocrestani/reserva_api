import { UserRepositoryMemory } from '../../src/infra/repository';
import { CreateUserService } from '../../src/application/services';
import { GetUserService } from '../../src/application/services';

describe('Get user', () => {

    let createUser: CreateUserService;
    let getUser: GetUserService;

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
        getUser = new GetUserService(userRepositoryMemory);
    });

    test('Should get user', async () => {
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "63001608072",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123456*",
            phone_number: "+5554999435"
        }
        await createUser.execute(data);
        const user = await getUser.execute("leonardo@test.com", "123456*");
        expect(user.email).toBe("leonardo@test.com");
        expect(user.password).toBe("123456*");
    });

    test('Should get error when email are incorrect', async () => {
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "63001608072",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123456*",
            phone_number: "+5554999435"
        }
        await createUser.execute(data);
        try {
            await getUser.execute("leonardo@erro.com", "123456*");
        }
        catch (error: any) {
            expect(error.message).toBe("Nao foi possivel encontrar usuario");
        }
    });

    test('Should get error when password are incorrect', async () => {
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "63001608072",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123456*",
            phone_number: "+5554999435"
        }
        await createUser.execute(data);
        try {
            await getUser.execute("leonardo@test.com", "123*%$");
        }
        catch (error: any) {
            expect(error.message).toBe("Nao foi possivel encontrar usuario");
        }
    });

});