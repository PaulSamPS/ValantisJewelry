import { StateSchema } from '@/app/providers/StoreProvider';

export const product = (state: StateSchema) => state.productOne?.product;
export const error = (state: StateSchema) => state.productOne?.error;
export const isLoading = (state: StateSchema) => state.productOne?.isLoading;
