import { FindPlaceService } from "..";
import { UpdateCourt } from "../../../core/use-cases";
import { CourtRepository, PlaceRepository, ScheduleRepository } from "../../repository";
import { Conflict } from "../../errors";
import { UpdateScheduleService } from "../Schedule/UpdateScheduleService";

export class UpdateCourtService implements UpdateCourt {
    constructor(
        private readonly courtRepository: CourtRepository,
        private readonly placeRepository: PlaceRepository,
        private readonly scheduleRepository: ScheduleRepository
    ) { };

    async update(id: string, data: any): Promise<void> {
        const court = await this.courtRepository.findById(id)
        if (court.court_name === data.court_name) {
            throw new Conflict("Quadra ja existente");
        }
        const updatedCourt = await this.courtRepository.update(court.id, data);
        const updateScheduleService = new UpdateScheduleService(this.scheduleRepository);
        for (const schedule of updatedCourt.schedules) {
            await updateScheduleService.updateCourtName(schedule.hour, updatedCourt.court_name);
        }
    }

    async updatePlaceName(place_name: string): Promise<void> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_name);
        const updateScheduleService = new UpdateScheduleService(this.scheduleRepository);
        for (const court of place.courts) {
            await this.courtRepository.updatePlaceName(court.id, place_name);
            for (const schedule of court.schedules) {
                await updateScheduleService.updatePlaceName(schedule.hour, place_name);
            }
        }
    }
}