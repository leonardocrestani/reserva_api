export interface DeleteCourt {
    delete: (id: string) => Promise<void>;
}