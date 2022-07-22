import { ScheduleModel, PlaceModel } from '../../models';
import { CreateSchedule } from "../../../core/use-cases/Schedule/CreateSchedule";
import { ScheduleRepository } from "../../repository/ScheduleRepository";
import { GetPlaceService } from "../Place/GetPlaceService";
import { BadRequest, NotFound } from '../../errors';
import { CourtRepository, PlaceRepository } from '../../repository';

export class CreateScheduleService implements CreateSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly placeRepository: PlaceRepository,
    ) { }

    async create(data: ScheduleModel): Promise<ScheduleModel> {
        const getPlaceService = new GetPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(data.place_court_name);
        if (!PlaceModel.isOpen(data.day, data.hour, place.operation_time.days_open, place.operation_time.close_hour, place.operation_time.open_hour)) {
            throw new BadRequest("Local fechado não é possivel cadastrar horario");
        }
        const exist = place.courts.some((court: any) => {
            return court.court_name === data.court_name;
        });
        if (!exist) {
            throw new NotFound("Quadra nao encontrada");
        }
        place.courts.find((court) => {
            if (court.court_name === data.court_name) {
                data.court_id = court.id;
            }
        })
        return await this.scheduleRepository.create(data);
    }
}