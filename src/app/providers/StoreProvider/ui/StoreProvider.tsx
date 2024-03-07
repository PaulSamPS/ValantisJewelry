import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { StateSchema } from '../model/config/StateSchema';
import { createReduxStore } from '../model/config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialSate?: DeepPartial<StateSchema>;
    asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export const StoreProvider = ({ children, initialSate, asyncReducers }: StoreProviderProps) => {
    const store = createReduxStore(initialSate as StateSchema, asyncReducers as ReducersMapObject<StateSchema>);

    return <Provider store={store}>{children}</Provider>;
};
