export interface UpdateSchedule {
    updatePlaceName: (id: string, place_name: string) => Promise<void>;

    updateCourtName: (id: string, court_name: string) => Promise<void>;
}