import { CourtRepositoryMemory, PlaceRepositoryMemory } from '../../../src/infra/repository';
import { CreateCourtService, CreatePlaceService, FindCourtService } from '../../../src/application/services';
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
        createCourt = new CreateCourtService(courtRepository, placeRepository);
        createPlace = new CreatePlaceService(placeRepository);
        getCourt = new FindCourtService(courtRepository, placeRepository);
    });

    test('Should find court', async () => {
        await createPlace.create(body);
        const data = {
            court_place_name: "sports",
            court_name: "Quadra 3"
        };
        await createCourt.create(data);
        const court = await getCourt.find('sports', 'Quadra 3');
        expect(court.court_place_name).toBe('sports');
        expect(court.court_name).toBe('Quadra 3');
    });

    test('Should get error when try to find inexistent court', async () => {
        await createPlace.create(body);
        try {
            await getCourt.find('sports', 'Quadra 3');
        }
        catch (error) {
            expect(error.message).toBe('Quadra nao encontrada');
        }
    });

});