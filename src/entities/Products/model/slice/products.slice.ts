import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts } from '../services/fetchProducts';
import { IProduct, ProductsSchema } from '../types';

const initialState: ProductsSchema = {
    currentPage: 0,
    totalPages: 0,
    products: [],
    error: undefined,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setTotalPages(state, action: PayloadAction<number>) {
            state.totalPages = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
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
            });
    },
});

export const { actions: productActions } = profileSlice;
export const { reducer: productsReducer } = profileSlice;
