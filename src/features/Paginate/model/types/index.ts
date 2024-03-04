export interface IPaginate {
    currentPage: number;
    arr: number[];
    isLoading: boolean;
}

export interface PaginatesSchema {
    currentPage: number;
    currentOffset: number;
    totalPages: number[];
    error: string | undefined;
    isLoading: boolean;
}
