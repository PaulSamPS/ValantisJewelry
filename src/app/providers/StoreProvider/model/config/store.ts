import { configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema, ThunkExtraArg } from './StateSchema';
import { createReducerManager } from './reduxManager';
import { $apiAuth } from '@/shared/lib/axiosInterceptor';
import { productsReducer } from '@/entities/Products';
import { paginateReducer } from '@/features/Paginate';
import { brandsReducer } from '@/entities/Brands/model/slice/brands.slice';

export const createReduxStore = (initialState?: StateSchema, asyncReducers?: ReducersMapObject<StateSchema>) => {
    const rootReducers: ReducersMapObject<StateSchema> = {
        ...asyncReducers,
        products: productsReducer,
        paginate: paginateReducer,
        brands: brandsReducer,
    };

    const reducerManager = createReducerManager(rootReducers);

    const extraArg: ThunkExtraArg = {
        apiAuth: $apiAuth,
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<StateSchema>,
        preloadedState: initialState,
        devTools: __IS_DEV__,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    extraArgument: extraArg,
                },
            }),
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
};

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
