import { GetSchedule } from '../../../core/use-cases/Schedule/GetSchedule';
import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { GetCourtService } from '../Court/GetCourtService';
import { CourtRepositoryPrisma } from '../../../infra/repository/Court/CourtRepositoryPrisma';
import { NotFound } from '../../errors';

export class GetScheduleService implements GetSchedule {
    constructor(private readonly scheduleRepository: ScheduleRepository) { }

    async find(place_name: string, court_name: string, hour: number, minutes: number): Promise<object> {
        const courtRepository = new CourtRepositoryPrisma();
        const getCourtService = new GetCourtService(courtRepository);
        const court = await getCourtService.find(place_name, court_name);
        const courtId = court.id;
        const schedule = await this.scheduleRepository.find(courtId, hour, minutes);
        if (!schedule) {
            throw new NotFound("Horario nao encontrado");
        }
        return schedule;
    }
}