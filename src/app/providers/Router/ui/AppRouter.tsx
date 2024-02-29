import React, { memo, Suspense, useMemo } from 'react';
import { Route, RouteProps, Routes } from 'react-router-dom';
import { routeConfig } from '../model/routerConfig';
import { Spinner } from '@/shared/ui/Spinner';

export const AppRouter = memo(() => {
    const routes: RouteProps[] = useMemo(() => Object.values(routeConfig), []);

    return (
        <Suspense fallback={<Spinner />}>
            <Routes>
                {routes.map(({ element, path }) => (
                    <Route key={path} path={path} element={<div className='wrapper'>{element}</div>} />
                ))}
            </Routes>
        </Suspense>
    );
});
