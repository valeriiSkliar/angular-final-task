import { IProduct } from './iproduct';

export interface ICartItems {
	[productId: string]: { product: IProduct; quantity: number };
}
