import { UserRepositoryMemory } from '../../src/infra/repository';
import { CreateUserService } from '../../src/application/services';

describe('Register user', () => {

    test('Should register new user', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "02238874046",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@testepdcss.com",
            password: "123894**#B",
            phone_number: "+5554999854874"
        }
        const user = await createUser.execute(data);
        expect(user.user.email).toBe("leonardo@test.com");
        expect(user.user.password).toBe("123456*");
    });

    test('Should get error when trying to register user with invalid CPF', async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        const createUser = new CreateUserService(userRepositoryMemory);
        try {
            const data = { 
                first_name: "Leonardo",
                last_name: "Crestani",
                cpf: "0243565",
                genre: "Male",
                country: "Brasil",
                email: "leonardo@testepdcss.com",
                password: "123894**#B",
                phone_number: "+5554999854874"
            }
            await createUser.execute(data);
        }
        catch (error: any) {
            expect(error.message).toBe("CPF invalido");
        }
    })

});