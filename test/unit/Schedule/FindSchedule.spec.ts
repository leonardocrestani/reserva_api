import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../src/infra/repository';
import { CreateCourtService, CreatePlaceService, CreateScheduleService, FindScheduleService } from '../../../src/application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Find place', () => {

    let createPlace: CreatePlaceService;
    let createSchedule: CreateScheduleService;
    let getSchedule: FindScheduleService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        const courtRepository = new CourtRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository);
        createSchedule = new CreateScheduleService(scheduleRepository, placeRepository);
        getSchedule = new FindScheduleService(scheduleRepository, courtRepository, placeRepository);
        await createPlace.create(body);
    });

    test('Should get schedule by hour', async () => {
        await createSchedule.create({
            place_court_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const schedule = await getSchedule.find('sports', 'Quadra 2', 10);
        expect(schedule.court_name).toBe('Quadra 2');
        expect(schedule.hour).toBe(10);
        expect(schedule.is_rent).toBeFalsy();
    });

    test('Should get error when hour is incorrect', async () => {
        await createSchedule.create({
            place_court_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        try {
            await getSchedule.find('sports', 'Quadra 2', 12);
        }
        catch (error) {
            expect(error.message).toBe('Horario nao encontrado');
        }
    });

    test('Should get error when place is incorrect', async () => {
        await createSchedule.create({
            place_court_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        try {
            await getSchedule.find('incorrect place', 'Quadra 2', 10);
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });

    test('Should get error when court is incorrect', async () => {
        await createSchedule.create({
            place_court_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        try {
            await getSchedule.find('sports', 'Quadra 4', 10);
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });
});