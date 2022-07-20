import { UserRepositoryMemory } from '../../../src/infra/repository';
import { CreateUserService, AuthenticateUserService } from '../../../src/application/services';

describe('Authenticate user', () => {

    let authenticaUser: AuthenticateUserService;
    let createUser: CreateUserService;

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
        authenticaUser = new AuthenticateUserService(userRepositoryMemory);
    });

    test('Should authenticate user', async () => {
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
        const auth = await authenticaUser.authenticate('leonardo@test.com', '123894**#B*');
        expect(auth.user).toBe('leonardo@test.com');
        expect(auth).toHaveProperty('access_token');
    });

    test('Should get an error when pass incorrect email', async () => {
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
            await authenticaUser.authenticate('leonardo@incorrect.com', '123894**#B*');
        }
        catch(error) {
            expect(error.message).toBe('Email ou senha invalidos')
        }
    });

    test('Should get an error when pass incorrect password', async () => {
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
            await authenticaUser.authenticate('leonardo@test.com', 'ifdj3487@');
        }
        catch(error) {
            expect(error.message).toBe('Email ou senha invalidos')
        }
    });

});