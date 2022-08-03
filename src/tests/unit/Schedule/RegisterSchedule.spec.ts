import { PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../infra/repository';
import { CreatePlaceService, CreateScheduleService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Register schedule', () => {

    let createPlace: CreatePlaceService;
    let createSchedule: CreateScheduleService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        createSchedule = new CreateScheduleService(scheduleRepository, placeRepository);
        createPlace = new CreatePlaceService(placeRepository);
        await createPlace.create(body);
    });

    test('Should register new schedule for a court', async () => {
        const data = {
            place_name: "sports",
            court_name: "Quadra 1",
            hour: 10,
            is_rent: false,
            day: "Wed"
        }
        const schedule = await createSchedule.create(data);
        expect(schedule.court_name).toBe('Quadra 1');
        expect(schedule.hour).toBe(10);
        expect(schedule.is_rent).toBeFalsy();
    });

    test('Should get error when try to register a schedule when hour of the place is closed', async () => {
        const data = {
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 5,
            is_rent: false,
            day: "Wed"
        }
        try {
            await createSchedule.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Local fechado não é possivel cadastrar horario');
        }
    });

    test('Should get error when try to register a schedule when day of the place is closed', async () => {
        const data = {
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 14,
            is_rent: false,
            day: "Mon"
        }
        try {
            await createSchedule.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Local fechado não é possivel cadastrar horario');
        }
    });

    test('Should get error when try to register a schedule with inexistent place', async () => {
        const data = {
            place_name: "inexistent",
            court_name: "Quadra 1",
            hour: 14,
            is_rent: false,
            day: "Wed"
        }
        try {
            await createSchedule.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });

    test('Should get error when try to register a schedule with inexistent court', async () => {
        const data = {
            place_name: "sports",
            court_name: "Quadra 5",
            hour: 14,
            is_rent: false,
            day: "Wed"
        }
        try {
            await createSchedule.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });

});