import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../infra/repository';
import { CreateCourtService, CreatePlaceService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Register court', () => {

    let createCourt: CreateCourtService;
    let createPlace: CreatePlaceService;
    let courtRepository: CourtRepositoryMemory;
    let placeRepository: PlaceRepositoryMemory;

    beforeEach(async () => {
        courtRepository = new CourtRepositoryMemory();
        placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        createCourt = new CreateCourtService(courtRepository, placeRepository, scheduleRepository);
        createPlace = new CreatePlaceService(placeRepository, courtRepository, scheduleRepository);
    });

    test('Should register new court', async () => {
        await createPlace.create(body);
        const data = {
            place_name: "sports",
            court_name: "Quadra 3"
        };
        const court = await createCourt.create(data);
        expect(court.place_name).toBe('sports');
        expect(court.court_name).toBe('Quadra 3');
    });

    test('Should get error when try to register court already registered', async () => {
        await createPlace.create(body);
        const data = {
            place_name: "sports",
            court_name: "Quadra 1"
        };
        try {
            await createCourt.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Quadra ja existente');
        }
    });

});