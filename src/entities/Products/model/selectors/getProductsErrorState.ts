import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsErrorState = (state: StateSchema) => state?.products?.error;
