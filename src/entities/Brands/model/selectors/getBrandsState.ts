import { StateSchema } from '@/app/providers/StoreProvider';

export const getBrandsState = (state: StateSchema) => state?.brands?.brands;
