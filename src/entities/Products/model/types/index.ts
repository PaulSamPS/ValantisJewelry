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
