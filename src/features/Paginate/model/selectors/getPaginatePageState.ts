import { StateSchema } from '@/app/providers/StoreProvider';

export const getPaginatePageState = (state: StateSchema) => state?.paginate?.currentPage;
