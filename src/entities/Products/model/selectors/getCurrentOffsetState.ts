import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentOffsetState = (state: StateSchema) => state?.paginate?.currentOffset;
