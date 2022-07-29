import { CourtModel, ScheduleModel } from "../../application/models";
// REVER PARA TIRAR O ANY E RECEBER AS PROPRIEDADES CORRETAS
export default class CourtAdapter {
    static create(
        placeCourtName: string,
        courtName: string,
        schedules?: Array<ScheduleModel>,
        placeId?: string,
        id?: string
    ) {
        return new CourtModel(placeCourtName, courtName, schedules, placeId, id);
    }
}