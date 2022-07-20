import { UserRepositoryMemory } from '../../../src/infra/repository';
import { CreateUserService } from '../../../src/application/services';
import { GetUserService } from '../../../src/application/services';

describe('Get user', () => {

    let createUser: CreateUserService;
    let getUser: GetUserService;

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
        getUser = new GetUserService(userRepositoryMemory);
    });

    test('Should get user', async () => {
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
        const user = await getUser.find("leonardo@test.com", "123894**#B*");
        expect(user.email).toBe("leonardo@test.com");
        expect(user.password).toBe("123894**#B*");
    });

    test('Should get error when email are incorrect', async () => {
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
            await getUser.find("leonardo@erro.com", "123456*");
        }
        catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });

    test('Should get error when password are incorrect', async () => {
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
            await getUser.find("leonardo@test.com", "123*%$");
        }
        catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });

});