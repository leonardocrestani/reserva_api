import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../infra/repository';
import { CreateCourtService, CreatePlaceService, CreateScheduleService, FindScheduleService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Find place', () => {

    let createPlace: CreatePlaceService;
    let createSchedule: CreateScheduleService;
    let getSchedule: FindScheduleService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        const courtRepository = new CourtRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository, courtRepository, scheduleRepository);
        createSchedule = new CreateScheduleService(scheduleRepository, placeRepository, courtRepository);
        getSchedule = new FindScheduleService(scheduleRepository);
        await createPlace.create(body);
    });

    test('Should get schedule by hour', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        const schedule = await getSchedule.findById('sports');
        expect(schedule.court_name).toBe('Quadra 2');
        expect(schedule.hour).toBe(10);
        expect(schedule.is_rent).toBeFalsy();
    });

    test('Should get error when hour is incorrect', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        try {
            await getSchedule.findById('sports');
        }
        catch (error) {
            expect(error.message).toBe('Horario nao encontrado');
        }
    });

    test('Should get error when place is incorrect', async () => {
        await createSchedule.create({
            place_name: "sports",
            court_name: "Quadra 2",
            hour: 10,
            is_rent: false,
            day: "Wed"
        });
        try {
            await getSchedule.findById('incorrect place');
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
        try {
            await getSchedule.findById('sports');
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });
});