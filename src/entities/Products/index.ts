export { productsReducer, productActions } from './model/slice/products.slice';
export { IProduct } from './model/types';
export { fetchProducts } from './model/services/fetchProducts';
export * from './model/selectors/getProductsState';
export * from './model/selectors/getProductsIsLoadingState';
export * from './model/selectors/getProductsErrorState';
export * from './ui/ProductList';
