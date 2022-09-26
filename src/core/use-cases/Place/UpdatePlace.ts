export interface UpdatePlace {
    update: (cnpj: string, data: object) => Promise<void>;
}
