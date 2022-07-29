export interface UpdateSchedule {
    updatePlaceName: (hour: number, place_name: string) => Promise<void>;

    updateCourtName: (hour: number, court_name: string) => Promise<void>;
}