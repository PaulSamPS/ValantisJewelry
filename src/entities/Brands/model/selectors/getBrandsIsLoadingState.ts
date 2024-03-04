import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandsIsLoadingState = (state: StateSchema) => state?.brands?.isLoading;
