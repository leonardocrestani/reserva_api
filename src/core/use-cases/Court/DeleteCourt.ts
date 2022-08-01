export interface DeleteCourt {
    delete: (place_name: string, court_name: string) => Promise<void>;
}