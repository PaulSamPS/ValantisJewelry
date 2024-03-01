import { IProduct } from '../types';

export const removeDuplicate = (data: IProduct[]): IProduct[] =>
    data.reduce((arr: IProduct[], el) => (arr.find((i) => el.id === i.id) || arr.push(el), arr), []);
