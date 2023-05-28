// Внутренний тип данных который использует родительский компонент (CartComponent) и дочерний компонент (CartItemComponent) карточки корзины.
// Этот тип данных не выходит за пределы CartComponent. В сервис корзины уходит деконструированые даные.
export interface IQuantityChangeData {
	id: string;
	quantity: number;
}
