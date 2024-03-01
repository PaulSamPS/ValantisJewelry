import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsIsLoadingState = (state: StateSchema) => state?.products?.isLoading;
