import { Place } from '../../entities'

export interface DeletePlace {
    delete(cnpj: string): Promise<void>
}
