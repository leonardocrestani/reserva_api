import { Court } from '../../entities'

export interface FindCourt {
    findById: (id: string) => Promise<Court>;
}
