import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Title } from '@/shared/ui/Title';
import { useAppDispatch } from '@/shared/hooks';
import { fetchProducts, productOneReducer, productOneSelectors } from '@/entities/Products';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/DynamicModuleLoader';
import { Spinner } from '@/shared/ui/Spinner';
import styles from './Product.module.scss';
import { BlockSecondaryBg } from '@/shared/ui/BlockSecondaryBg';
import { Text } from '@/shared/ui/Text';
import { priceRub } from '@/shared/lib/priceRub';
import { AppLink } from '@/shared/ui/AppLink';
import { AppRoutes } from '@/app/providers/Router';
import { ArrowUpIcon } from '@/shared/assets/icons';
import { Button } from '@/shared/ui/Button';

const PRODUCT_ONE_REDUCER: ReducerList = {
    productOne: productOneReducer,
};
const Product = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const product = useSelector(productOneSelectors.product);
    const isLoading = useSelector(productOneSelectors.isLoading);
    const navigate = useNavigate();

    const onGoBack = () => {
        navigate(-1);
    };

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
                    <Button appearance='clear' size='m' onClick={onGoBack}>
                        <ArrowUpIcon className={styles.icon} />
                        Назад
                    </Button>
                </BlockSecondaryBg>
            )}
        </DynamicModuleLoader>
    );
};

export default Product;
