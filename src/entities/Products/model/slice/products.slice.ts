import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all, byBrand, byName, byPrice } from '../services';
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
            .addCase(all.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(all.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(all.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(byBrand.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(byBrand.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(byBrand.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(byPrice.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(byPrice.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(byPrice.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(byName.pending, (state) => {
                state.products = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(byName.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.products = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(byName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productActions } = profileSlice;
export const { reducer: productsReducer } = profileSlice;
