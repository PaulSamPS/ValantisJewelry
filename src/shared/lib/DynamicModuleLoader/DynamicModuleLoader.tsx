import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager } from '@/app/providers/StoreProvider';
import { DynamicModuleLoaderProps } from './types';
import { StateSchemaKey } from '@/app/providers/StoreProvider/model/config/StateSchema';

export const DynamicModuleLoader = ({ children, className, reducers, ...otherProps }: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducers).forEach(([name, reducer]) => {
            store.reducerManager.add(name as StateSchemaKey, reducer);
            dispatch({ type: `@INIT ${name} reducer` });
        });
        return () => {
            Object.entries(reducers).forEach(([name]) => {
                store.reducerManager.remove(name as StateSchemaKey);
                dispatch({ type: `@DESTROY ${name} reducer` });
            });
        };
        // eslint-disable-next-line
    }, []);

    if (className) {
        return (
            <div className={className} {...otherProps}>
                {children}
            </div>
        );
    }

    return children;
};
