import { UserRepositoryMemory } from '../../../infra/repository';
import { CreateUserService } from '../../../application/services';
import { FindUserService } from '../../../application/services';

describe('Find user', () => {

    let createUser: CreateUserService;
    let findUser: FindUserService;

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
        findUser = new FindUserService(userRepositoryMemory);
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
        const user = await findUser.findOne("leonardo@test.com");
        expect(user.email).toBe("leonardo@test.com");
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
            await findUser.findOne("leonardo@erro.com");
        }
        catch (error: any) {
            expect(error.message).toBe("Usuario nao encontrado");
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
            await findUser.findOne("leonardo@test.com");
        }
        catch (error: any) {
            expect(error.message).toBe("User not found");
        }
    });

});