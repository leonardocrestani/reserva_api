
export interface FindAllPlaces {
    findAll: (limit: number, offset: number) => Promise<object>;
}
