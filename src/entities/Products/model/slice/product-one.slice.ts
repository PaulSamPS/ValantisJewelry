import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { one } from '../services';
import { IProduct, ProductOneSchema } from '../types';

const initialState: ProductOneSchema = {
    product: [],
    error: undefined,
    isLoading: false,
};

export const productOneSlice = createSlice({
    name: 'product/one',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(one.pending, (state) => {
                state.product = [];
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(one.fulfilled, (state, action: PayloadAction<IProduct[]>) => {
                state.product = action.payload;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(one.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: productOneActions } = productOneSlice;
export const { reducer: productOneReducer } = productOneSlice;
