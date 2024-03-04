import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaginateOffsetState = (state: StateSchema) => state?.paginate?.currentOffset;
