import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaginateIsLoadingState = (state: StateSchema) => state?.paginate?.isLoading;
