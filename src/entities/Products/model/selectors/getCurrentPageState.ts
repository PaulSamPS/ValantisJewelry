import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentPageState = (state: StateSchema) => state?.paginate?.currentPage;
