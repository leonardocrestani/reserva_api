import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../infra/repository';
import { CreateCourtService, CreatePlaceService, FindCourtService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Find court', () => {

    let createCourt: CreateCourtService;
    let createPlace: CreatePlaceService;
    let getCourt: FindCourtService;
    let courtRepository: CourtRepositoryMemory;
    let placeRepository: PlaceRepositoryMemory;

    beforeEach(async () => {
        courtRepository = new CourtRepositoryMemory();
        placeRepository = new PlaceRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        createCourt = new CreateCourtService(courtRepository, placeRepository, scheduleRepository);
        createPlace = new CreatePlaceService(placeRepository, courtRepository, scheduleRepository);
        getCourt = new FindCourtService(courtRepository);
    });

    test('Should find court', async () => {
        await createPlace.create(body);
        const data = {
            place_name: "sports",
            court_name: "Quadra 3"
        };
        await createCourt.create(data);
        const court = await getCourt.findById('sports');
        expect(court.place_name).toBe('sports');
        expect(court.court_name).toBe('Quadra 3');
    });

    test('Should get error when try to find inexistent court', async () => {
        await createPlace.create(body);
        try {
            await getCourt.findById('sports');
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });

});