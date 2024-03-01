import React from 'react';
import { IProduct } from '../../model/types';
import { ProductCard } from '../ProductCard';
import styles from './ProductList.module.scss';

interface IProductList {
    products: IProduct[];
}
export const ProductList = ({ products }: IProductList) => (
    <div className={styles.wrapper}>
        {products?.map((product) => <ProductCard product={product} key={product.id} />)}
    </div>
);
