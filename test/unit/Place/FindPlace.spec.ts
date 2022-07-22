import { PlaceRepositoryMemory } from '../../../src/infra/repository';
import { GetPlaceService, CreatePlaceService } from '../../../src/application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Find place', () => {

    let getPlace: GetPlaceService
    let createPlace: CreatePlaceService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository);
        getPlace = new GetPlaceService(placeRepository);
    });

    test('Should get place by name', async () => {
        const data = body;
        await createPlace.create(data);
        const place = await getPlace.findByName('sports')
        expect(place.place_name).toBe('sports');
        expect(place.cnpj).toBe('77.285.431/0001-76');
        expect(place).toHaveProperty('address');
        expect(place).toHaveProperty('contact');
        expect(place).toHaveProperty('operation_time');
        expect(place).toHaveProperty('courts');
    });

    test('Should get place by CNPJ', async () => {
        const data = body;
        await createPlace.create(data);
        const place = await getPlace.findByCnpj('77.285.431/0001-76')
        expect(place.place_name).toBe('sports');
        expect(place.cnpj).toBe('77.285.431/0001-76');
        expect(place).toHaveProperty('address');
        expect(place).toHaveProperty('contact');
        expect(place).toHaveProperty('operation_time');
        expect(place).toHaveProperty('courts');
    });

    test('Should get error when pass incorrect place name', async () => {
        const data = body;
        await createPlace.create(data);
        try {
            await getPlace.findByName('incorrect name');
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });

    test('Should get error when pass incorrect CNPJ', async () => {
        const data = body;
        await createPlace.create(data);
        try {
            await getPlace.findByCnpj('7843858934');
        }
        catch (error) {
            expect(error.message).toBe('Local nao encontrado');
        }
    });
});