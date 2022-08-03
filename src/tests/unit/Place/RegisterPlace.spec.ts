import { PlaceRepositoryMemory } from '../../../infra/repository';
import { CreatePlaceService } from '../../../application/services';
import { body } from '../../fixtures/placeRegister.json';

describe('Register place', () => {

    let createPlace: CreatePlaceService;

    beforeEach(async () => {
        const placeRepository = new PlaceRepositoryMemory();
        createPlace = new CreatePlaceService(placeRepository);
    });

    test('Should register new place', async () => {
        const data = body;
        const place = await createPlace.create(data);
        expect(place.name).toBe('sports');
        expect(place.cnpj).toBe('77.285.431/0001-76');
        expect(place).toHaveProperty('address');
        expect(place).toHaveProperty('contact');
        expect(place).toHaveProperty('operation_time');
        expect(place).toHaveProperty('courts');
    });

    test('Should get error when trying to register a place already registered', async () => {
        const data = body
        await createPlace.create(data);
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Local ja cadastrado');
        }
    });

    test('Should get error when trying to register place with invalid CNPJ', async () => {
        const data = { ...body, cnpj: "3214325" };
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('CNPJ invalido');
        }
    });

    test('Should get error when trying to register place with open hour bigger than close hour', async () => {
        const data = {
            ...body,
            operation_time: {
                ...body.operation_time,
                close_hour: 19,
                open_hour: 21
            }
        };
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Horario de funcionamento invalido');
        }
    });

    test('Should get error when trying to register place with invalid open hour and close hour', async () => {
        const data = {
            ...body,
            operation_time: {
                ...body.operation_time,
                close_hour: 40,
                open_hour: -1
            }
        };
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Horario de funcionamento invalido');
        }
    });

    test.skip('Should get error when trying to register place with invalid CEP', async () => {
        const data = {
            ...body,
            address: {
                ...body.address,
                city_code: 984325
            }
        };
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('CEP invalido');
        }
    });

    test('Should get error when trying to register courts in a place with different place name', async () => {
        const data = {
            ...body,
            courts: [{
                ...body.courts[0],
                place_name: 'incorrect'
            }
            ]
        };
        try {
            await createPlace.create(data);
        }
        catch (error) {
            expect(error.message).toBe('Local da quadra invalido');
        }
    });
});