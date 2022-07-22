import { ScheduleModel } from '../../models';
import { FindSchedule } from '../../../core/use-cases/Schedule/FindSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { NotFound } from '../../errors';
import { CourtRepository, PlaceRepository } from '../../repository';
import { FindPlaceService } from '../Place/FindPlaceService';

export class FindScheduleService implements FindSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
    ) { }

    async find(place_court_name: string, court_name: string, hour: number): Promise<ScheduleModel> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_court_name);
        const exist = place.courts.some((court: any) => {
            return court.court_name === court_name;
        });
        if (!exist) {
            throw new NotFound("Quadra nao encontrada");
        }
        place.courts.find((court) => {
            if (court.court_name === court_name) {
                const court_id = court.id;
            }
        });
        const schedule = await this.scheduleRepository.find(place_court_name, court_name, hour);
        if (!schedule) {
            throw new NotFound("Horario nao encontrado");
        }
        return schedule;
    }
}