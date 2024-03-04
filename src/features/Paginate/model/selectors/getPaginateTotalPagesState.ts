import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaginateTotalPagesState = (state: StateSchema) => state?.paginate?.totalPages;
