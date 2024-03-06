import { StateSchema } from '@/app/providers/StoreProvider';

export const totalPages = (state: StateSchema) => state?.paginate?.totalPages;
export const currentPage = (state: StateSchema) => state?.paginate?.currentPage;
export const isLoading = (state: StateSchema) => state?.paginate?.isLoading;
export const currentOffset = (state: StateSchema) => state?.paginate?.currentOffset;
export const error = (state: StateSchema) => state?.paginate?.error;
