import { StateSchema } from '@/app/providers/StoreProvider';

export const getTotalPagesState = (state: StateSchema) => state?.paginate?.totalPages;
