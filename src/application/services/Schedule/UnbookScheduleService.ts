import { ScheduleRepository } from '../../repository/ScheduleRepository';
import { FindUserService, } from "../";
import { UserRepository } from '../../repository';
import { BadRequest, Conflict, NotFound, UnprocessableEntity } from '../../errors';
import { UpdateUserService } from '../User/UpdateUserService';
import mongoose from 'mongoose';
import { UnbookSchedule } from '../../../core/use-cases';

export class UnbookScheduleService implements UnbookSchedule {
    constructor(
        private readonly scheduleRepository: ScheduleRepository,
        private readonly userRepository: UserRepository
    ) { }

    async update(id: string, userId?: string): Promise<void> {
        const data: any = {};
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new UnprocessableEntity('Formato de ID invalido');
        }
        const schedule = await this.scheduleRepository.findById(id);
        const getUserService = new FindUserService(this.userRepository);
        const user = await getUserService.findById(userId);
        if(schedule.responsible_person_email !== user.email) {
            throw new BadRequest("Usuario desmarcando horario incorreto");
        }
        if (!schedule) {
            throw new NotFound("Horario nao encontrado");
        }
        if (schedule.is_rent === false) {
            throw new BadRequest("Nao e possivel desmarcar horario nao reservado");
        }
        data.is_rent = false;
        data.responsible_person_id = null;
        data.responsible_person_full_name = null;
        data.responsible_person_email = null;
        const operation: any = await this.scheduleRepository.update(id, data);
        if(!operation) {
            throw new UnprocessableEntity("Nao foi possivel desmarcar horario");
        }
        user.schedules.map((canceledSchedule, index) => {
            if(canceledSchedule.id === schedule.id) {
                user.schedules.splice(index, 1);
            }
        });
        const updateUserService = new UpdateUserService(this.userRepository);
        await updateUserService.update(user.email, {schedules: user.schedules});
    }
}