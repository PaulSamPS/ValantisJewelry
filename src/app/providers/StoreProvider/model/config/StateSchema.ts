import { UnknownAction, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ProductOneSchema, ProductsSchema } from '@/entities/Products';
import { PaginatesSchema } from '@/features/Paginate';
import { BrandsSchema } from '@/entities/Brands/model/types';

export interface StateSchema {
    products: ProductsSchema;
    paginate: PaginatesSchema;
    brands: BrandsSchema;
    productOne?: ProductOneSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: UnknownAction) => StateSchema;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    apiAuth: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
