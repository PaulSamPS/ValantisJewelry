import { Reducer } from '@reduxjs/toolkit';
import { AllHTMLAttributes } from 'react';
import { StateSchemaKey } from '@/app/providers/StoreProvider/model/config/StateSchema';

export type ReducerList = {
    [name in StateSchemaKey]?: Reducer;
};

export interface DynamicModuleLoaderProps extends AllHTMLAttributes<HTMLDivElement> {
    reducers: ReducerList;
}
