import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory, UserRepositoryMemory } from '../../../infra/repository';
import { BookScheduleService, CreatePlaceService, CreateScheduleService, CreateUserService, FindScheduleService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Book place', () => {

    let createPlace: CreatePlaceService;
    let createSchedule: CreateScheduleService;
    let bookSchedule: BookScheduleService;
    let getSchedule: FindScheduleService;
    let createUser: CreateUserService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        const courtRepository = new CourtRepositoryMemory();
        const userRepository = new UserRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository);
        createSchedule = new CreateScheduleService(scheduleRepository, placeRepository);
        bookSchedule = new BookScheduleService(scheduleRepository, placeRepository, userRepository);
        getSchedule = new FindScheduleService(scheduleRepository, courtRepository, placeRepository);
        createUser = new CreateUserService(userRepository);
        await createPlace.create(body);
        let schedules: Array<any> = [];
        await createUser.create({
            first_name: "Leonardo",
            last_name: "Crestani",
            cpf: "02238874046",
            genre: "Male",
            country: "Brasil",
            email: "leonardo@test.com",
            password: "123894**#B*",
            phone_number: "+5554999854874",
            schedules: schedules
        });
    });

    test('Should book schedule by hour', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const data = {
            responsible_person_email: "leonardo@test.com",
            is_rent: true
        }
        await bookSchedule.update('sports', 'Quadra 2', 10, data);
        const schedule = await getSchedule.find('sports', 'Quadra 2', 10);
        expect(schedule.is_rent).toBeTruthy();
        expect(schedule.responsible_person_email).toBe('leonardo@test.com');
    });

    test('Should get error when place is incorrect', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const data = {
            responsible_person_email: "leonardo@test.com",
            is_rent: true
        }
        try {
            await bookSchedule.update('place incorrect', 'Quadra 2', 10, data);
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });

    test('Should get error when court is incorrect', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const data = {
            responsible_person_email: "leonardo@test.com",
            is_rent: true
        }
        try {
            await bookSchedule.update('sports', 'Quadra 3', 10, data);
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });

    test('Should get error when user is inexistent', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const data = {
            responsible_person_email: "leonardo@inexistent.com",
            is_rent: true
        }
        try {
            await bookSchedule.update('sports', 'Quadra 2', 10, data);
        }
        catch (error) {
            expect(error.message).toBe('Usuario nao encontrado');
        }
    });

    test('Should get error when hour is incorrect', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const data = {
            responsible_person_email: "leonardo@test.com",
            is_rent: true
        }
        try {
            await bookSchedule.update('sports', 'Quadra 2', 15, data);
        }
        catch (error) {
            expect(error.message).toBe('Horario nao encontrado');
        }
    });
});