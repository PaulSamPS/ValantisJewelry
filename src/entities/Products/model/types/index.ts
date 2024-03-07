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

export interface IOneReq {
    productId: string;
}
export interface ProductsSchema {
    products: IProduct[];
    error: string | undefined;
    isLoading: boolean;
}

export interface ProductOneSchema {
    product: IProduct[];
    error: string | undefined;
    isLoading: boolean;
}
