import { Court } from "../../entities";

export interface UpdateSchedule {
    updatePlaceAndCourtName: (court: Court) => Promise<void>;
}