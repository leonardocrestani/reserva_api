export interface AuthenticateUser {
    authenticate: (email: string, password: string) => Promise<object>
}
