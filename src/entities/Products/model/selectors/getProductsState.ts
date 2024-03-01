import { StateSchema } from '@/app/providers/StoreProvider';

export const getProductsState = (state: StateSchema) => state?.products?.products;
