import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, filterProductsByBrand, filterProductsByName, filterProductsByPrice } from '../services';
import { IProduct, ProductsSchema } from '../types';

const initialState: ProductsSchema = {
    products: [],
    error: undefined,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(filterProductsByBrand.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(filterProductsByBrand.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(filterProductsByBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(filterProductsByPrice.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(filterProductsByPrice.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(filterProductsByPrice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(filterProductsByName.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(filterProductsByName.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(filterProductsByName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productActions } = profileSlice;
export const { reducer: productsReducer } = profileSlice;
