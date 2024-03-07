import { Navigate } from 'react-router-dom';
import { Main } from '@/pages/Main';
import { Product } from '@/pages/Product';

export enum AppRoutes {
    MAIN = 'main',
    PRODUCT = 'product',

    NOT_FOUND = 'not_found',
}

export const RouterPath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.PRODUCT]: '/product/:id',

    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, any> = {
    [AppRoutes.MAIN]: {
        path: RouterPath.main,
        element: <Main />,
    },
    [AppRoutes.PRODUCT]: {
        path: RouterPath.product,
        element: <Product />,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RouterPath.not_found,
        element: <Navigate to='/' replace />,
    },
};
