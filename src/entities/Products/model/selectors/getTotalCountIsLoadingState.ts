import { StateSchema } from '@/app/providers/StoreProvider';

export const getTotalCountIsLoadingState = (state: StateSchema) => state?.paginate?.isLoading;
