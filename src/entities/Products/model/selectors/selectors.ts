import { StateSchema } from '@/app/providers/StoreProvider';

export const products = (state: StateSchema) => state?.products?.products;
export const error = (state: StateSchema) => state?.products?.error;
export const isLoading = (state: StateSchema) => state?.products?.isLoading;
