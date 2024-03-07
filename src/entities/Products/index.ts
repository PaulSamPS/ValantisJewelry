export { productsReducer, productActions } from './model/slice/products.slice';
export { productOneReducer, productOneActions } from './model/slice/product-one.slice';
export { IProduct } from './model/types';
export * as fetchProducts from './model/services';
export * from './ui/ProductList/ProductList';
export * from './model/types';
export * as productSelectors from './model/selectors/selectors';
export * as productOneSelectors from './model/selectors/selectors-one';
