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

    async update(place_name: string, court_name: string, data: any): Promise<void> {
        
    }

    async updatePlaceName(place_name: string): Promise<void> {
        const getPlaceService = new FindPlaceService(this.placeRepository);
        const place = await getPlaceService.findByName(place_name);
        const updateScheduleService = new UpdateScheduleService(this.scheduleRepository);
        for(const court of place.courts) {
            await this.courtRepository.updatePlaceName(court.court_name, {place_court_name: place_name});
            for(const schedule of court.schedules) {
                await updateScheduleService.updatePlaceName(schedule.hour, {place_court_name: place_name});
            }
        }
    }
}