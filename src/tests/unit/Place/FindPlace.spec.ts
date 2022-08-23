import { PlaceRepositoryMemory } from '../../../infra/repository';
import { FindPlaceService, CreatePlaceService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Find place', () => {

    let getPlace: FindPlaceService
    let createPlace: CreatePlaceService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository);
        getPlace = new FindPlaceService(placeRepository);
    });

    test('Should get all places', async () => {
        const data = body;
        await createPlace.create(data);
        const data2 = {
            ...body,
            name: "place test",
            cnpj: "79.487.553/0001-70",
            courts:
                body.courts.map((court) => {
                    const name = court.court_name;
                    return { place_name: "place test", court_name: `${name}` }
                })
        }
        await createPlace.create(data2);
        const places = await getPlace.findAll(10, 0);
        expect(places.length).toBeGreaterThan(1);
    });

    test('Should get place by name', async () => {
        const data = body;
        await createPlace.create(data);
        const place = await getPlace.findByName('sports')
        expect(place.name).toBe('sports');
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
        expect(place.name).toBe('sports');
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