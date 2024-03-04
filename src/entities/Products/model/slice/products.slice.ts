import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts';
import { IProduct, ProductsSchema } from '../types';
import { filterProductsByBrand } from '@/features/FilterByBrand/model/services/filterProductsByBrand';
import { filterProductsByPrice } from '@/features/FilterByPrice/model/services/filterProductsByPrice';
import { filterProductsByName } from '@/features/FilterByName/model/services/filterProductsByName';

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
