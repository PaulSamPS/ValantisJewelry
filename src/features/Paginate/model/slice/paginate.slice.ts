import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginatesSchema } from '../types';
import { fetchTotalCountProducts } from '../services/fetchTotalCountProducts';

const initialState: PaginatesSchema = {
    currentPage: 1,
    currentOffset: 0,
    totalPages: [],
    error: undefined,
    isLoading: false,
};

export const paginateSlice = createSlice({
    name: 'paginate',
    initialState,
    reducers: {
        setQueryPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setCurrentOffset(state, action: PayloadAction<number>) {
            state.currentOffset = action.payload;
        },
        setTotalPages(state, action: PayloadAction<number>) {
            const newTotal: number[] = [];
            for (let i = 1; i < action.payload + 1; i++) {
                newTotal.push(i);
            }

            state.totalPages = newTotal;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTotalCountProducts.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchTotalCountProducts.fulfilled, (state, action: PayloadAction<number>) => {
                const newTotal: number[] = [];
                for (let i = 1; i < action.payload + 1; i++) {
                    newTotal.push(i);
                }

                state.totalPages = newTotal;
                state.error = undefined;
                state.isLoading = false;
            })
            .addCase(fetchTotalCountProducts.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: paginateActions } = paginateSlice;
export const { reducer: paginateReducer } = paginateSlice;
