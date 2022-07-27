import { UserRepositoryMemory } from '../../../infra/repository';
import { CreateUserService, DeleteUserService, FindUserService } from '../../../application/services';

describe('Delete user', () => {

    let createUser: CreateUserService;
    let deleteUser: DeleteUserService;
    let findUser: FindUserService

    beforeEach(async () => {
        const userRepositoryMemory = new UserRepositoryMemory();
        createUser = new CreateUserService(userRepositoryMemory);
        deleteUser = new DeleteUserService(userRepositoryMemory);
        findUser = new FindUserService(userRepositoryMemory);
    });

    test('Should delete user', async () => {
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
            await deleteUser.remove("leonardo@test.com");
            await findUser.findOne("leonardo@test.com");
        }
        catch (error: any) {
            expect(error.message).toBe("Usuario nao encontrado");
        }
    });

    test('Should get error when try to delete user with invalid email', async () => {
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
            await deleteUser.remove("leonardo@test.com");
        }
        catch (error: any) {
            expect(error.message).toBe("Nao foi possivel encontrar usuario");
        }
    });

});