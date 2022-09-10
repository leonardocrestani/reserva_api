export interface DeleteUser {
    remove(email: string): Promise<void>;
}
