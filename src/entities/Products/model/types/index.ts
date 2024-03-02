export interface IResponseArr {
    result: string[];
}
export interface IProduct {
    brand: null;
    id: string;
    price: number;
    product: string;
}

export interface IProductResponse {
    result: IProduct[];
}

export interface IProductReq {
    offset: number;
}
export interface ProductsSchema {
    products: IProduct[];
    error: string | undefined;
    isLoading: boolean;
}

export interface PaginatesSchema {
    currentPage: number;
    currentOffset: number;
    totalPages: number[];
    error: string | undefined;
    isLoading: boolean;
}
