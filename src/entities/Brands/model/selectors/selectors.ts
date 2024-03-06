import { StateSchema } from '@/app/providers/StoreProvider';

export const brands = (state: StateSchema) => state?.brands?.brands;
export const isLoading = (state: StateSchema) => state?.brands?.isLoading;
export const error = (state: StateSchema) => state?.brands?.error;
