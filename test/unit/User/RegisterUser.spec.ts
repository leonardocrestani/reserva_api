import { UserRepositoryMemory } from '../../../src/infra/repository';
import { CreateUserService } from '../../../src/application/services';

describe('Register user', () => {

    let createUser: CreateUserService;

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
    });

    test('Should register new user', async () => {
        let schedules: Array<any> = []
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "02238874046",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123894**#B*",
            phone_number: "+5554999854874",
            schedules: schedules
        }
        const user = await createUser.create(data);
        expect(user.user.email).toBe("leonardo@test.com");
        expect(user.user.password).toBe("123894**#B*");
        expect(user).toHaveProperty('access_token');
    });

    test('Should get error when trying to register user with invalid CPF', async () => {
        try {
            let schedules: Array<any> = []
            const data = {
                first_name: "Leonardo",
                last_name: "Crestani",
                cpf: "02238874046",
                genre: "Male",
                country: "Brasil",
                email: "leonardo@test.com",
                password: "123894**#B*",
                phone_number: "+5554999854874",
                schedules: schedules
            }
            await createUser.create(data);
        }
        catch (error: any) {
            expect(error.message).toBe("CPF invalido");
        }
    });

    test('Should get error when trying to register a user already registered', async () => {
        let schedules: Array<any> = []
        const data = {
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "02238874046",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123894**#B*",
            phone_number: "+5554999854874",
            schedules: schedules
        }
        await createUser.create(data);
        try {
            let schedules: Array<any> = []
            const data = {
                first_name: "Leonardo",
                last_name: "Crestani",
                cpf: "02238874046",
                genre: "Male",
                country: "Brasil",
                email: "leonardo@test.com",
                password: "123894**#B*",
                phone_number: "+5554999854874",
                schedules: schedules
            }
            await createUser.create(data);
        }
        catch (error: any) {
            expect(error.message).toBe("Usuario ja cadastrado");
        }
    });
    
});