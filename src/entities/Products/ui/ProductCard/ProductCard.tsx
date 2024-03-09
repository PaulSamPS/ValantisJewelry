import React from 'react';
import { IProduct } from '@/entities/Products';
import { Text } from '@/shared/ui/Text';
import { priceRub } from '@/shared/lib/priceRub';
import styles from './ProductCard.module.scss';
import { AppLink } from '@/shared/ui/AppLink';
import { Paragraph } from '@/shared/ui/Paragraph';
import { AppRoutes } from '@/app/providers/Router';

interface IProductCard {
    product: IProduct;
}
export const ProductCard = ({ product }: IProductCard) => (
    <AppLink to={`${AppRoutes.PRODUCT}/${product.id}`} className={styles.card}>
        <Text weight='medium' className={styles.id}>
            {product.id}
        </Text>
        <Text weight='medium' className={styles.brand}>
            {product.brand}
        </Text>
        <Paragraph weight='w3' className={styles.name}>
            {product.product}
        </Paragraph>
        <Text weight='medium' className={styles.price}>
            {priceRub(product.price)}
        </Text>
    </AppLink>
);
