export interface UpdateCourt {
    updatePlaceName: (place_name: string) => Promise<void>;

    update: (place_name: string, court_name: string, data: any) => Promise<void>;
}