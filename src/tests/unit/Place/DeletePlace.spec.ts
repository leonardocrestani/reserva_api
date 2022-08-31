import { CourtRepositoryMemory, PlaceRepositoryMemory, ScheduleRepositoryMemory } from '../../../infra/repository';
import { CreatePlaceService, DeletePlaceService, FindPlaceService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Delete place', () => {

    let createPlace: CreatePlaceService;
    let findPlace: FindPlaceService;
    let deletePlace: DeletePlaceService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        const courtRepository = new CourtRepositoryMemory();
        const scheduleRepository = new ScheduleRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository, courtRepository, scheduleRepository);
        findPlace = new FindPlaceService(placeRepository);
        deletePlace = new DeletePlaceService(placeRepository, courtRepository, scheduleRepository);
    });

    test('Should delete place', async () => {
        const data = body;
        await createPlace.create(data);
        await deletePlace.delete(data.cnpj);
        const places = await findPlace.findAll(10, 0);
        expect(places.length).toBe(0);
    });

    test('Should get error when try to delete inexistent place', async () => {
        const data = body;
        await createPlace.create(data);
        try {
            await deletePlace.delete('43298472935');
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });
});