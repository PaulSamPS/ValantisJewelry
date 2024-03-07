import React from 'react';
import { BlockSecondaryBg } from '@/shared/ui/BlockSecondaryBg';
import { IProduct } from '../../model/types';
import { ProductCard } from '../ProductCard';
import { Text } from '@/shared/ui/Text';

interface ProductListProps {
    products: IProduct[];
    error: string;
}
export const ProductList = ({ error, products }: ProductListProps) => (
    <BlockSecondaryBg>
        {products.length > 0 && products.map((product) => <ProductCard product={product} key={product.id} />)}
        {products.length <= 0 && !error && (
            <Text weight='medium' style={{ textAlign: 'center' }}>
                Ничего не найдено
            </Text>
        )}
    </BlockSecondaryBg>
);
