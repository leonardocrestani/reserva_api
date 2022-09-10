export interface UpdatePlace {
    update: (cnpj: string, data: any) => Promise<void>;
}
