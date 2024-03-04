import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandsSchema } from '../types';
import { fetchBrands } from '../services/fetchBrands';

const initialState: BrandsSchema = {
    brands: [],
    error: undefined,
    isLoading: false,
};

export const brandsSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBrands.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchBrands.fulfilled, (state, action: PayloadAction<string[]>) => {
                state.brands = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: brandsActions } = brandsSlice;
export const { reducer: brandsReducer } = brandsSlice;
