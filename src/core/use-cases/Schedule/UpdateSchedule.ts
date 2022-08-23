import { Court } from "../../entities";

export interface UpdateSchedule {
    updatePlaceName: (court: Court) => Promise<void>;

    updateCourtName: (court: Court) => Promise<void>;
}