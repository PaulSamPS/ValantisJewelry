import React from 'react';
import { IProduct } from '../../model/types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';
import { FetchError } from '../../../../widgets/FetchError';
import { Text } from '@/shared/ui/Text';

interface ProductListProps {
    products: IProduct[];
    error: string;
}
export const ProductList = ({ error, products }: ProductListProps) => (
    <div className={styles.wrapper}>
        {error && <FetchError error={error} />}
        {products.length > 0 && products.map((product) => <ProductCard product={product} key={product.id} />)}
        {products.length <= 0 && !error && (
            <Text weight='medium' className={styles['not-found']}>
                Ничего не найдено
            </Text>
        )}
    </div>
);
