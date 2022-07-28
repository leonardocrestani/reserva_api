export interface UpdateSchedule {
    updatePlaceName: (hour: number, data: any) => Promise<void>;
}