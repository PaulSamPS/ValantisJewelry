import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Title } from '@/shared/ui/Title';
import { useAppDispatch } from '@/shared/hooks';
import { fetchProducts, productOneSelectors } from '@/entities/Products';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/DynamicModuleLoader';
import { productOneReducer } from '@/entities/Products/model/slice/product-one.slice';
import { Spinner } from '@/shared/ui/Spinner';
import styles from './Product.module.scss';
import { BlockSecondaryBg } from '@/shared/ui/BlockSecondaryBg';
import { Text } from '@/shared/ui/Text';
import { priceRub } from '@/shared/lib/priceRub';
import { AppLink } from '@/shared/ui/AppLink';
import { AppRoutes } from '@/app/providers/Router/model/routerConfig';
import { ArrowUpIcon } from '@/shared/assets/icons';

const PRODUCT_ONE_REDUCER: ReducerList = {
    productOne: productOneReducer,
};
const Product = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productOneSelectors.product);
    const isLoading = useSelector(productOneSelectors.isLoading);

    useEffect(() => {
        dispatch(fetchProducts.one({ productId: id! }));
    }, [dispatch, id]);

    return (
        <DynamicModuleLoader reducers={PRODUCT_ONE_REDUCER}>
            {isLoading ? (
                <Spinner className={styles.spinner} />
            ) : (
                <BlockSecondaryBg className={styles.product}>
                    <Title weight='regular' size='h1'>
                        {product && product[0].product}
                    </Title>
                    <Text weight='medium'>{product && product[0].id}</Text>
                    <Text weight='medium'>{product && product[0].brand}</Text>
                    <Text weight='medium'>{product && priceRub(product[0].price)}</Text>
                    <AppLink to={`${__BASE_URL__}${AppRoutes.MAIN}`}>
                        <ArrowUpIcon className={styles.icon} />
                        Назад
                    </AppLink>
                </BlockSecondaryBg>
            )}
        </DynamicModuleLoader>
    );
};

export default Product;
