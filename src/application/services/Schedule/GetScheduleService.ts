import { ScheduleModel } from '../../models';
import { GetSchedule } from '../../../core/use-cases/Schedule/GetSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { GetCourtService } from '../Court/GetCourtService';
import { NotFound } from '../../errors';
import { CourtRepository, PlaceRepository } from '../../repository';
import { GetPlaceService } from '../Place/GetPlaceService';

export class GetScheduleService implements GetSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
    ) { }

    async find(place_court_name: string, court_name: string, hour: number): Promise<ScheduleModel> {
        const getPlaceService = new GetPlaceService(this.placeRepository);
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