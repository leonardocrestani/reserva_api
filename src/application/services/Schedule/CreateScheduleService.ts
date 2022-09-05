import { ScheduleModel, PlaceModel } from '../../models';
import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { FindPlaceService } from "../Place/FindPlaceService";
import { BadRequest, Conflict, NotFound } from '../../errors';
import { CourtRepository, PlaceRepository } from '../../repository';
import { FindCourtService } from '../Court/FindCourtService';
import { UpdateCourtService } from '../Court/UpdateCourtService';

export class CreateScheduleService implements CreateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly placeRepository: PlaceRepository,
        private readonly courtRepository: CourtRepository
    ) { }

    async create(data: ScheduleModel): Promise<ScheduleModel> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(data.place_name);
        if (!PlaceModel.isOpen(data.day, data.hour, place.operation_time.days_open, place.operation_time.close_hour, place.operation_time.open_hour)) {
            throw new BadRequest("Local fechado não é possivel cadastrar horario");
        }
        const exist = place.courts.some((court: any) => {
            return court.court_name === data.court_name;
        });
        if (!exist) {
            throw new NotFound("Quadra nao encontrada");
        }
        const court = place.courts.find((court) => {
            if (court.court_name === data.court_name) {
                data.court_id = court.id;
                return court;
            }
        });
        const schedules = await this.scheduleRepository.findAllByCourt(data.place_name, data.court_name);
        schedules.find((schedule) => {
            if (schedule.hour === data.hour) {
                throw new Conflict("Horario ja cadastrado");
            }
        });
        const newSchedule: any = await this.scheduleRepository.create(data);
        const updateCourtService = new UpdateCourtService(this.courtRepository, this.placeRepository, this.scheduleRepository);
        court.schedules.push(newSchedule.id);
        await updateCourtService.update(court.id, {schedules: court.schedules});
        return newSchedule;
    }
}