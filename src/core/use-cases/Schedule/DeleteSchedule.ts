export interface DeleteSchedule {
    delete: (id: string) => Promise<void>;
}
