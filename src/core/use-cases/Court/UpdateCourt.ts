export interface UpdateCourt {
    updatePlaceName: (place_name: string) => Promise<void>;

    update: (id: string, data: any) => Promise<void>;
}