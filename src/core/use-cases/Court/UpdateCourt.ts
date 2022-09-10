import { Place } from '../../entities'

export interface UpdateCourt {
    updatePlaceName: (place: Place) => Promise<void>;

    update: (id: string, data: any) => Promise<void>;
}
